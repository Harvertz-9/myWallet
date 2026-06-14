<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-6 pb-28">
        <!-- Header Profile Greeting -->
        <div class="flex items-center justify-between pt-4 px-1">
          <div>
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              {{ todayString }}
            </span>
            <h1 class="text-2xl font-black text-gray-900 dark:text-white">
              {{ greeting }}, {{ profileStore.name }}!
            </h1>
          </div>
          <!-- Avatar Clickable -> Navigates to Profile -->
          <router-link
            to="/tabs/profile"
            class="w-11 h-11 rounded-2xl bg-primary/10 text-primary dark:bg-primary/5 dark:text-primary-tint flex items-center justify-center text-lg font-bold border border-primary/20 shadow-sm hover:scale-105 transition-transform"
          >
            {{ profileStore.name.charAt(0).toUpperCase() }}
          </router-link>
        </div>

        <!-- Balance Card -->
        <BalanceCard :balance="transactionStore.balance" />

        <!-- Income & Expense Summary Grid -->
        <div class="grid grid-cols-2 gap-3">
          <IncomeCard :income="transactionStore.totalIncome" />
          <ExpenseCard :expense="transactionStore.totalExpense" />
        </div>

        <!-- Loading Skeleton -->
        <div v-if="transactionStore.loading">
          <LoadingSkeleton type="list" :count="4" />
        </div>

        <!-- Empty State -->
        <div v-else-if="transactionStore.transactions.length === 0" class="pt-2">
          <EmptyState
            title="Belum Ada Transaksi"
            description="Tap tombol + di bawah untuk menambahkan transaksi pertama Anda."
          />
        </div>

        <!-- Transaction List with Pagination -->
        <div v-else class="space-y-4">
          <RecentTransactions
            :transactions="paginatedTransactions"
            @select="openEditModal"
          />

          <!-- Pagination -->
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-items="transactionStore.transactions.length"
            @page-change="onPageChange"
          />
        </div>
      </div>

      <!-- Add FAB -->
      <FloatingActionButton @click="isAddModalOpen = true" />

      <!-- Add Transaction Modal -->
      <AddTransactionModal
        :is-open="isAddModalOpen"
        @close="isAddModalOpen = false"
        @save="handleAddTransaction"
      />

      <!-- Edit Transaction Modal -->
      <EditTransactionModal
        :is-open="isEditModalOpen"
        :transaction="selectedTransaction"
        @close="closeEditModal"
        @update="handleUpdateTransaction"
      />

      <!-- Toast Feedbacks -->
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
import BalanceCard from "../components/dashboard/BalanceCard.vue";
import IncomeCard from "../components/dashboard/IncomeCard.vue";
import ExpenseCard from "../components/dashboard/ExpenseCard.vue";
import RecentTransactions from "../components/dashboard/RecentTransactions.vue";
import FloatingActionButton from "../components/shared/FloatingActionButton.vue";
import AddTransactionModal from "../components/forms/AddTransactionModal.vue";
import EditTransactionModal from "../components/forms/EditTransactionModal.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import LoadingSkeleton from "../components/shared/LoadingSkeleton.vue";
import EmptyState from "../components/shared/EmptyState.vue";
import Pagination from "../components/shared/Pagination.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { useProfileStore } from "../stores/profileStore";
import { Transaction } from "../types/transaction";
import { formatDate } from "../utils/dateFormatter";

const transactionStore = useTransactionStore();
const profileStore = useProfileStore();

// Modal States
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedTransaction = ref<Transaction | null>(null);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

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

// Life Cycles
onMounted(() => {
  transactionStore.loadTransactions();
  profileStore.loadProfile();
});

// Sorted transactions (newest first)
const sortedTransactions = computed(() => {
  return [...transactionStore.transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedTransactions.value.length / itemsPerPage))
);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return sortedTransactions.value.slice(start, start + itemsPerPage);
});

const onPageChange = (page: number) => {
  currentPage.value = page;
};

// Dynamic Greeting based on current hour
const greeting = computed(() => {
  const hr = new Date().getHours();
  if (hr < 11) return "Selamat Pagi";
  if (hr < 15) return "Selamat Siang";
  if (hr < 19) return "Selamat Sore";
  return "Selamat Malam";
});

// Format Date e.g. Minggu, 14 Juni 2026
const todayString = computed(() => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dayName = days[new Date().getDay()];
  const dateFormatted = formatDate(new Date().toLocaleDateString("en-CA"));
  return `${dayName}, ${dateFormatted}`;
});

// Actions
const handleAddTransaction = (newTx: Transaction) => {
  try {
    transactionStore.addTransaction(newTx);
    isAddModalOpen.value = false;
    currentPage.value = 1;
    triggerToast("Transaksi berhasil ditambahkan.");
  } catch (error) {
    triggerToast("Gagal menyimpan transaksi", "danger");
  }
};

const openEditModal = (tx: Transaction) => {
  selectedTransaction.value = tx;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  selectedTransaction.value = null;
  isEditModalOpen.value = false;
};

const handleUpdateTransaction = (updatedTx: Transaction) => {
  try {
    transactionStore.updateTransaction(updatedTx);
    closeEditModal();
    triggerToast("Transaksi berhasil diperbarui.");
  } catch (error) {
    triggerToast("Gagal memperbarui transaksi", "danger");
  }
};
</script>

<style scoped>
.page-container {
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
</style>
