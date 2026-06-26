<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-5 pb-32">
        <!-- Page Header -->
        <div class="pt-4 px-1 flex items-center justify-between animate-[fadeIn_0.5s_ease-out]">
          <div>
            <span class="text-xs font-semibold text-primary dark:text-primary-tint uppercase tracking-wider block mb-1">
              {{ t('statistics.header_subtitle') }}
            </span>
            <h1 class="text-2xl font-black text-gray-900 dark:text-white">
              {{ t('statistics.header_title') }}
            </h1>
          </div>
          <div class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl shrink-0 shadow-sm border border-purple-200 dark:border-purple-800/50">
            <ion-icon :icon="pieChartOutline" />
          </div>
        </div>

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
                :placeholder="new Date().getFullYear().toString()"
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

        <!-- Check loading state -->
        <div v-if="transactionStore.loading" class="space-y-5">
          <LoadingSkeleton type="chart" />
          <LoadingSkeleton type="card" />
        </div>

        <!-- No data at all -->
        <div v-else-if="transactionStore.transactions.length === 0">
          <div class="pt-10">
            <EmptyState
              :title="t('statistics.empty_title')"
              :description="t('statistics.empty_desc')"
            />
          </div>
        </div>

        <!-- No data for selected period -->
        <div v-else-if="filteredTransactions.length === 0" class="pt-4">
          <EmptyState
            :title="t('statistics.no_data_title')"
            :description="t('statistics.no_data_desc')"
          />
          <button
            type="button"
            class="mt-4 w-full py-3 text-sm font-semibold text-primary dark:text-primary-tint border border-primary/30 rounded-2xl hover:bg-primary/5 transition-colors cursor-pointer"
            @click="resetFilters"
          >
            {{ t('statistics.show_all') }}
          </button>
        </div>

        <!-- Render statistics when data loaded -->
        <div v-else class="space-y-5">
          <!-- Summary Card Widget -->
          <div class="grid grid-cols-3 gap-2 text-center bg-white dark:bg-card-dark rounded-card p-4 shadow-sm border border-gray-100 dark:border-gray-800/40">
            <div>
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {{ t('statistics.total_income') }}
              </p>
              <p class="text-xs font-extrabold text-green-600 dark:text-green-400 mt-1 truncate">
                {{ formatRupiah(filteredIncome) }}
              </p>
            </div>
            <div class="border-x border-gray-100 dark:border-gray-800/60">
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {{ t('statistics.total_expense') }}
              </p>
              <p class="text-xs font-extrabold text-red-500 dark:text-red-400 mt-1 truncate">
                {{ formatRupiah(filteredExpense) }}
              </p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {{ t('statistics.balance') }}
              </p>
              <p class="text-xs font-extrabold text-primary dark:text-primary-tint mt-1 truncate">
                {{ formatRupiah(filteredBalance) }}
              </p>
            </div>
          </div>

          <!-- Area Chart (Trend like stock market) -->
          <IncomeExpenseAreaChart :transactions="filteredTransactions" />

          <!-- Combined Pie Chart with Dropdown -->
          <CategoryPieChart :transactions="filteredTransactions" />

          <!-- Financial Summary Insights -->
          <StatisticsSummary :transactions="filteredTransactions" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { IonPage, IonContent, IonIcon } from "@ionic/vue";
import { pieChartOutline } from "ionicons/icons";
import IncomeExpenseAreaChart from "../components/statistics/IncomeExpenseAreaChart.vue";
import CategoryPieChart from "../components/statistics/CategoryPieChart.vue";
import StatisticsSummary from "../components/statistics/StatisticsSummary.vue";
import LoadingSkeleton from "../components/shared/LoadingSkeleton.vue";
import EmptyState from "../components/shared/EmptyState.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { formatRupiah } from "../utils/currencyFormatter";
import { useI18n } from "../utils/i18n";

const transactionStore = useTransactionStore();
const { t } = useI18n();

const filterYear = ref<number | "">("");
const filterType = ref<"all" | "income" | "expense">("all");
const filterDateFrom = ref("");
const filterDateTo = ref("");

onMounted(() => {
  transactionStore.loadTransactions();
});

const dateRangeError = computed(() => {
  if (!filterDateFrom.value || !filterDateTo.value) return "";
  const from = new Date(filterDateFrom.value);
  const to = new Date(filterDateTo.value);
  if (from > to) return "Tanggal akhir harus setelah tanggal awal.";
  const diffDays = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays > 7) return "Rentang tanggal maksimal 7 hari.";
  return "";
});

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

const filteredTransactions = computed(() => {
  let list = [...transactionStore.transactions];

  // Sort newest first
  list.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Filter by year
  if (filterYear.value !== "") {
    list = list.filter((tx) => new Date(tx.date).getFullYear() === filterYear.value);
  }

  // Filter by type
  if (filterType.value !== "all") {
    list = list.filter((tx) => tx.type === filterType.value);
  }

  // Filter by date range
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

  return list;
});

const filteredIncome = computed(() =>
  filteredTransactions.value
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
);

const filteredExpense = computed(() =>
  filteredTransactions.value
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
);

const filteredBalance = computed(() => filteredIncome.value - filteredExpense.value);

const resetFilters = () => {
  filterYear.value = "";
  filterType.value = "all";
  filterDateFrom.value = "";
  filterDateTo.value = "";
};
</script>

<style scoped>
.page-container {
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
</style>
