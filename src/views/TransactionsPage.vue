<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="space-y-5 pb-20">
        <!-- Page Header -->
        <div class="pt-4 px-1">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Kelola Keuangan
          </span>
          <h1 class="text-2xl font-black text-gray-900 dark:text-white">
            Riwayat Transaksi
          </h1>
        </div>

        <!-- Search Bar -->
        <SearchBar v-model="searchQuery" />

        <!-- Filter Chips -->
        <FilterChip v-model="activeFilter" />

        <!-- Loading Skeleton / Empty State / List -->
        <div v-if="transactionStore.loading" class="pt-4">
          <LoadingSkeleton type="list" :count="4" />
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="pt-6">
          <EmptyState
            title="Tidak ada transaksi"
            description="Tidak ada transaksi yang cocok dengan pencarian atau filter Anda."
          />
        </div>

        <div v-else class="pt-2">
          <TransactionList
            :transactions="filteredTransactions"
            @edit="openEditModal"
            @delete="promptDelete"
          />
        </div>
      </div>

      <!-- Edit Modal -->
      <EditTransactionModal
        :is-open="isEditModalOpen"
        :transaction="selectedTransaction"
        @close="closeEditModal"
        @update="handleUpdate"
      />

      <!-- Delete Confirmation Modal -->
      <ConfirmationModal
        :is-open="isDeleteConfirmOpen"
        title="Hapus Transaksi?"
        message="Catatan transaksi ini akan dihapus secara permanen dari penyimpanan lokal Anda."
        @confirm="confirmDelete"
        @cancel="cancelDelete"
      />

      <!-- Toast Messages -->
      <ToastMessage
        :is-open="toast.show"
        :message="toast.message"
        :color="toast.color"
        @dismiss="toast.show = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import SearchBar from "../components/transaction/SearchBar.vue";
import FilterChip from "../components/transaction/FilterChip.vue";
import TransactionList from "../components/transaction/TransactionList.vue";
import LoadingSkeleton from "../components/shared/LoadingSkeleton.vue";
import EmptyState from "../components/shared/EmptyState.vue";
import ConfirmationModal from "../components/shared/ConfirmationModal.vue";
import EditTransactionModal from "../components/forms/EditTransactionModal.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { Transaction } from "../types/transaction";

const transactionStore = useTransactionStore();

// Filter States
const searchQuery = ref("");
const activeFilter = ref<"all" | "income" | "expense">("all");

// Edit modal states
const isEditModalOpen = ref(false);
const selectedTransaction = ref<Transaction | null>(null);

// Delete modal states
const isDeleteConfirmOpen = ref(false);
const transactionIdToDelete = ref<string | null>(null);

// Toast States
const toast = ref({
  show: false,
  message: "",
  color: "success" as "success" | "danger",
});

const triggerToast = (message: string, color: "success" | "danger" = "success") => {
  toast.value.message = message;
  toast.value.color = color;
  toast.value.show = true;
};

// Lifecycle
onMounted(() => {
  transactionStore.loadTransactions();
});

// Reactively Filter Transactions
const filteredTransactions = computed(() => {
  let list = transactionStore.transactions;

  // 1. Filter by search query (Title search)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    list = list.filter((tx) => tx.title.toLowerCase().includes(query));
  }

  // 2. Filter by type (income/expense)
  if (activeFilter.value !== "all") {
    list = list.filter((tx) => tx.type === activeFilter.value);
  }

  return list;
});

// Edit handlers
const openEditModal = (tx: Transaction) => {
  selectedTransaction.value = tx;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  selectedTransaction.value = null;
  isEditModalOpen.value = false;
};

const handleUpdate = (updatedTx: Transaction) => {
  try {
    transactionStore.updateTransaction(updatedTx);
    closeEditModal();
    triggerToast("Transaksi berhasil diperbarui.");
  } catch (error) {
    triggerToast("Gagal memperbarui transaksi", "danger");
  }
};

// Delete handlers
const promptDelete = (id: string) => {
  transactionIdToDelete.value = id;
  isDeleteConfirmOpen.value = true;
};

const confirmDelete = () => {
  if (transactionIdToDelete.value) {
    try {
      transactionStore.deleteTransaction(transactionIdToDelete.value);
      triggerToast("Transaksi berhasil dihapus.");
    } catch (error) {
      triggerToast("Gagal menghapus transaksi", "danger");
    } finally {
      transactionIdToDelete.value = null;
      isDeleteConfirmOpen.value = false;
    }
  }
};

const cancelDelete = () => {
  transactionIdToDelete.value = null;
  isDeleteConfirmOpen.value = false;
};
</script>
