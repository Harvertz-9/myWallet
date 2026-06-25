<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-4 pb-32">
        <!-- Page Header -->
        <div class="pt-4 px-1 flex items-center justify-between animate-[fadeIn_0.5s_ease-out]">
          <div>
            <span class="text-xs font-semibold text-primary dark:text-primary-tint uppercase tracking-wider block mb-1">
              {{ t('transactions.header_subtitle') }}
            </span>
            <h1 class="text-2xl font-black text-gray-900 dark:text-white">
              {{ t('transactions.header_title') }}
            </h1>
          </div>
          <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0 shadow-sm border border-blue-200 dark:border-blue-800/50">
            <ion-icon :icon="receiptOutline" />
          </div>
        </div>

        <!-- Search Bar -->
        <SearchBar v-model="searchQuery" @update:modelValue="resetPage" />

        <!-- Filter Card: Year, Type, Date Range -->
        <div class="bg-white dark:bg-card-dark rounded-card p-3 space-y-3 shadow-sm border border-gray-100 dark:border-gray-800/40">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
                Tahun
              </label>
              <input
                type="number"
                v-model.number="filterYear"
                placeholder="2026"
                class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
                Jenis
              </label>
              <select
                v-model="filterType"
                class="w-full appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value="all">Semua</option>
                <option value="income">Pemasukan</option>
                <option value="expense">Pengeluaran</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
                Dari Tanggal
              </label>
              <input
                type="date"
                v-model="filterDateFrom"
                class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary [color-scheme:var(--date-picker-scheme)]"
              />
            </div>
            <div>
              <label class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-1.5">
                Sampai Tanggal
              </label>
              <input
                type="date"
                v-model="filterDateTo"
                class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary [color-scheme:var(--date-picker-scheme)]"
              />
            </div>
          </div>
          <p v-if="dateRangeError" class="text-[10px] font-semibold text-red-500 dark:text-red-400 px-0.5">
            {{ dateRangeError }}
          </p>
        </div>

        <!-- Loading Skeleton / Empty State / List -->
        <div v-if="transactionStore.loading" class="pt-4">
          <LoadingSkeleton type="list" :count="4" />
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="pt-6">
          <EmptyState
            :title="t('transactions.empty_title')"
            :description="t('transactions.empty_desc')"
          />
        </div>

        <div v-else class="space-y-4 pt-1">
          <TransactionList
            :transactions="paginatedTransactions"
            @click="openEditModal"
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
        :title="t('transactions.delete_title')"
        :message="t('transactions.delete_msg')"
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
import { IonPage, IonContent, IonIcon } from "@ionic/vue";
import { receiptOutline } from "ionicons/icons";
import SearchBar from "../components/transaction/SearchBar.vue";
import TransactionList from "../components/transaction/TransactionList.vue";
import LoadingSkeleton from "../components/shared/LoadingSkeleton.vue";
import EmptyState from "../components/shared/EmptyState.vue";
import ConfirmationModal from "../components/shared/ConfirmationModal.vue";
import EditTransactionModal from "../components/forms/EditTransactionModal.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import Pagination from "../components/shared/Pagination.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { Transaction } from "../types/transaction";
import { useI18n } from "../utils/i18n";

const transactionStore = useTransactionStore();
const { t } = useI18n();

// Filter States
const searchQuery = ref("");
const filterYear = ref<number | "">("");
const filterType = ref<"all" | "income" | "expense">("all");
const filterDateFrom = ref("");
const filterDateTo = ref("");

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

// Validate date range (max 7 days)
const dateRangeError = computed(() => {
  if (!filterDateFrom.value || !filterDateTo.value) return "";
  const from = new Date(filterDateFrom.value);
  const to = new Date(filterDateTo.value);
  if (from > to) return "Tanggal akhir harus setelah tanggal awal.";
  const diffDays = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays > 7) return "Rentang tanggal maksimal 7 hari.";
  return "";
});

// Clamp date range to max 7 days when both dates are set
watch([filterDateFrom, filterDateTo], ([from, to]) => {
  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (fromDate > toDate) {
      const newFrom = new Date(toDate);
      newFrom.setDate(newFrom.getDate() - 7);
      filterDateFrom.value = newFrom.toISOString().split("T")[0];
      return;
    }
    const diffDays = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) {
      const newTo = new Date(fromDate);
      newTo.setDate(newTo.getDate() + 7);
      filterDateTo.value = newTo.toISOString().split("T")[0];
    }
  }
});

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

  // 1. Filter by year
  if (filterYear.value !== "") {
    list = list.filter((tx) => new Date(tx.date).getFullYear() === filterYear.value);
  }

  // 2. Filter by type
  if (filterType.value !== "all") {
    list = list.filter((tx) => tx.type === filterType.value);
  }

  // 3. Filter by date range
  if (filterDateFrom.value) {
    const from = new Date(filterDateFrom.value);
    from.setHours(0, 0, 0, 0);
    list = list.filter((tx) => new Date(tx.date) >= from);
  }
  if (filterDateTo.value) {
    const to = new Date(filterDateTo.value);
    to.setHours(23, 59, 59, 999);
    list = list.filter((tx) => new Date(tx.date) <= to);
  }

  // 4. Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    const categoryLabelMap: Record<string, string> = {
      Salary: "gaji",
      Bonus: "bonus",
      Freelance: "freelance",
      Investment: "investasi",
      Gift: "hadiah",
      Food: "makanan",
      Transportation: "transportasi",
      Shopping: "belanja",
      Entertainment: "hiburan",
      Education: "pendidikan",
      Health: "kesehatan",
      Bills: "tagihan",
      Others: "lainnya",
    };
    list = list.filter((tx) => {
      const titleMatch = tx.title.toLowerCase().includes(query);
      const categoryEnglishMatch = tx.category.toLowerCase().includes(query);
      const indonesianCategory = categoryLabelMap[tx.category] || tx.category.toLowerCase();
      const categoryIndonesianMatch = indonesianCategory.includes(query);
      const noteMatch = tx.note ? tx.note.toLowerCase().includes(query) : false;
      return titleMatch || categoryEnglishMatch || categoryIndonesianMatch || noteMatch;
    });
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
watch([searchQuery, filterYear, filterType, filterDateFrom, filterDateTo], () => {
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
    triggerToast(t('transactions.toast_update_success'));
  } catch (error) {
    triggerToast(t('transactions.toast_update_fail'), "danger");
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
      triggerToast(t('transactions.toast_delete_success'));
      // Reset to page 1 if current page is now empty
      if (paginatedTransactions.value.length === 0 && currentPage.value > 1) {
        currentPage.value = currentPage.value - 1;
      }
    } catch (error) {
      triggerToast(t('transactions.toast_delete_fail'), "danger");
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
