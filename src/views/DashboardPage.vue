<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-6 pb-36">
        <!-- Header Profile Greeting (Redesigned) -->
        <div class="flex items-center justify-between pt-5 pb-2 px-1 animate-[fadeIn_0.5s_ease-out]">
          <div>
            <span class="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1">
              {{ todayString }}
            </span>
            <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              {{ greeting }}, <span class="bg-linear-to-r from-primary to-emerald-400 bg-clip-text text-transparent font-extrabold">{{ profileStore.name }}</span>!
            </h1>
          </div>
          <!-- Avatar Clickable -> Navigates to Profile -->
          <router-link
            to="/tabs/profile"
            class="relative w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-tint flex items-center justify-center text-xl shadow-sm hover:scale-105 transition-transform shrink-0 border border-primary/20 overflow-hidden group cursor-pointer"
          >
            <!-- Hover effect overlay -->
            <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <img v-if="profileStore.photo && profileStore.photo.startsWith('data:image')" :src="profileStore.photo" class="w-full h-full object-cover" />
            <span v-else-if="profileStore.photo">{{ profileStore.photo }}</span>
            <span v-else class="font-extrabold">{{ profileStore.name ? profileStore.name.charAt(0).toUpperCase() : 'P' }}</span>
          </router-link>
        </div>

        <!-- Balance Card -->
        <BalanceCard :balance="transactionStore.balance" />

        <!-- Income & Expense Summary Grid -->
        <div class="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
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
            :title="t('dashboard.empty_title')"
            :description="t('dashboard.empty_desc')"
          />
        </div>

        <!-- Transaction List with Pagination -->
        <div v-else class="space-y-4">
          <RecentTransactions
            :transactions="paginatedTransactions"
            @select="openEditModal"
            @edit="openEditModal"
            @delete="promptDelete"
          />

          <!-- Pagination -->
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-items="todayYesterdayTransactions.length"
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

      <!-- Delete Confirmation Modal -->
      <ConfirmationModal
        :is-open="isDeleteConfirmOpen"
        :title="'Hapus Transaksi'"
        :message="'Yakin ingin menghapus transaksi ini?'"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
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
import ConfirmationModal from "../components/shared/ConfirmationModal.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import LoadingSkeleton from "../components/shared/LoadingSkeleton.vue";
import EmptyState from "../components/shared/EmptyState.vue";
import Pagination from "../components/shared/Pagination.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { useProfileStore } from "../stores/profileStore";
import { Transaction } from "../types/transaction";
import { formatDate } from "../utils/dateFormatter";
import { useI18n } from "../utils/i18n";

const transactionStore = useTransactionStore();
const profileStore = useProfileStore();
const { t } = useI18n();

// Modal States
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedTransaction = ref<Transaction | null>(null);

// Delete modal states
const isDeleteConfirmOpen = ref(false);
const transactionIdToDelete = ref<string | null>(null);

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

// Helper: get date string for today and yesterday
const getDateStr = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-CA");
};
const todayStr = getDateStr(0);
const yesterdayStr = getDateStr(-1);

// Sorted transactions (newest first)
const sortedTransactions = computed(() => {
  return [...transactionStore.transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
});

// Only today & yesterday for "Transaksi Terbaru"
const todayYesterdayTransactions = computed(() =>
  sortedTransactions.value.filter(
    (tx) => tx.date === todayStr || tx.date === yesterdayStr
  )
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(todayYesterdayTransactions.value.length / itemsPerPage))
);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return todayYesterdayTransactions.value.slice(start, start + itemsPerPage);
});

const onPageChange = (page: number) => {
  currentPage.value = page;
};

// Dynamic Greeting based on current hour
const greeting = computed(() => {
  const hr = new Date().getHours();
  if (hr < 11) return t('dashboard.greeting_morning');
  if (hr < 15) return t('dashboard.greeting_afternoon');
  if (hr < 19) return t('dashboard.greeting_evening');
  return t('dashboard.greeting_night');
});

// Format Date e.g. Minggu, 14 Juni 2026
const todayString = computed(() => {
  const dateFormatted = formatDate(new Date().toLocaleDateString("en-CA"));
  const dayIndex = new Date().getDay();
  const dayName = t(`day.${dayIndex}`);
  return `${dayName}, ${dateFormatted}`;
});

// Actions
const handleAddTransaction = (newTx: Transaction) => {
  try {
    transactionStore.addTransaction(newTx);
    isAddModalOpen.value = false;
    currentPage.value = 1;
    triggerToast(t('dashboard.toast_add_success'));
  } catch (error) {
    triggerToast(t('dashboard.toast_add_fail'), "danger");
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
    triggerToast(t('dashboard.toast_update_success'));
  } catch (error) {
    triggerToast(t('dashboard.toast_update_fail'), "danger");
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
      triggerToast('Transaksi berhasil dihapus');
      if (paginatedTransactions.value.length === 0 && currentPage.value > 1) {
        currentPage.value = currentPage.value - 1;
      }
    } catch (error) {
      triggerToast('Gagal menghapus transaksi', "danger");
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
