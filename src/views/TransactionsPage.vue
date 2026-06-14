<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-4 pb-20">
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
        <SearchBar v-model="searchQuery" @update:modelValue="resetPage" />

        <!-- Time Filter Dropdown -->
        <TimeFilterDropdown v-model="timeFilter" label="Filter Periode" @update:modelValue="resetPage" />

        <!-- Filter Chips -->
        <FilterChip v-model="activeFilter" @update:modelValue="resetPage" />

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

        <div v-else class="space-y-4 pt-1">
          <TransactionList
            :transactions="paginatedTransactions"
            @edit="openEditModal"
            @delete="promptDelete"
          />

          <!-- Pagination -->
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-items="filteredTransactions.length"
            @page-change="onPageChange"
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
import { ref, computed, onMounted, watch } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import SearchBar from "../components/transaction/SearchBar.vue";
import FilterChip from "../components/transaction/FilterChip.vue";
import TransactionList from "../components/transaction/TransactionList.vue";
import LoadingSkeleton from "../components/shared/LoadingSkeleton.vue";
import EmptyState from "../components/shared/EmptyState.vue";
import ConfirmationModal from "../components/shared/ConfirmationModal.vue";
import EditTransactionModal from "../components/forms/EditTransactionModal.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import Pagination from "../components/shared/Pagination.vue";
import TimeFilterDropdown, { TimeFilterValue } from "../components/shared/TimeFilterDropdown.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { Transaction } from "../types/transaction";

const transactionStore = useTransactionStore();

// Filter States
const searchQuery = ref("");
const activeFilter = ref<"all" | "income" | "expense">("all");
const timeFilter = ref<TimeFilterValue>("all");

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

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

// Helper: filter by time period
const filterByTimePeriod = (transactions: Transaction[], period: TimeFilterValue): Transaction[] => {
  if (period === "all") return transactions;
  const now = new Date();
  const startOf = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  let fromDate: Date;
  switch (period) {
    case "this_month":
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "last_3_months":
      fromDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      break;
    case "last_6_months":
      fromDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      break;
    case "this_year":
      fromDate = new Date(now.getFullYear(), 0, 1);
      break;
    case "last_year": {
      fromDate = new Date(now.getFullYear() - 1, 0, 1);
      const toDate = new Date(now.getFullYear() - 1, 11, 31);
      return transactions.filter((tx) => {
        const d = startOf(new Date(tx.date));
        return d >= fromDate && d <= toDate;
      });
    }
    default:
      return transactions;
  }
  return transactions.filter((tx) => startOf(new Date(tx.date)) >= fromDate);
};

// Reactively Filter Transactions
const filteredTransactions = computed(() => {
  let list = [...transactionStore.transactions];

  // Sort newest first
  list.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // 1. Filter by time period
  list = filterByTimePeriod(list, timeFilter.value);

  // 2. Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    list = list.filter(
      (tx) =>
        tx.title.toLowerCase().includes(query) ||
        tx.category.toLowerCase().includes(query) ||
        (tx.note && tx.note.toLowerCase().includes(query))
    );
  }

  // 3. Filter by type
  if (activeFilter.value !== "all") {
    list = list.filter((tx) => tx.type === activeFilter.value);
  }

  return list;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredTransactions.value.length / itemsPerPage))
);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredTransactions.value.slice(start, start + itemsPerPage);
});

const resetPage = () => {
  currentPage.value = 1;
};

const onPageChange = (page: number) => {
  currentPage.value = page;
};

// Reset page when filters change
watch([searchQuery, activeFilter, timeFilter], () => {
  currentPage.value = 1;
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
      // Reset to page 1 if current page is now empty
      if (paginatedTransactions.value.length === 0 && currentPage.value > 1) {
        currentPage.value = currentPage.value - 1;
      }
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

<style scoped>
.page-container {
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
</style>
