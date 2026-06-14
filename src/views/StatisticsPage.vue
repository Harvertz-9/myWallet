<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-5 pb-20">
        <!-- Page Header -->
        <div class="pt-4 px-1">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Grafik &amp; Ringkasan
          </span>
          <h1 class="text-2xl font-black text-gray-900 dark:text-white">
            Statistik Keuangan
          </h1>
        </div>

        <!-- Time Filter Dropdown -->
        <TimeFilterDropdown v-model="timeFilter" label="Tampilkan Periode" />

        <!-- Active period label -->
        <div
          v-if="timeFilter !== 'all'"
          class="flex items-center gap-2 px-1"
        >
          <span class="text-xs font-semibold text-primary dark:text-primary-tint">
            📊 Menampilkan: {{ activePeriodLabel }}
          </span>
          <button
            type="button"
            class="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 font-semibold underline cursor-pointer"
            @click="timeFilter = 'all'"
          >
            Reset
          </button>
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
              title="Data Statistik Kosong"
              description="Tambahkan transaksi terlebih dahulu di Dashboard untuk memantau grafik analisis keuangan Anda."
            />
          </div>
        </div>

        <!-- No data for selected period -->
        <div v-else-if="filteredTransactions.length === 0" class="pt-4">
          <EmptyState
            title="Tidak Ada Data"
            description="Tidak ada transaksi pada periode yang dipilih. Coba pilih periode yang lain."
          />
          <button
            type="button"
            class="mt-4 w-full py-3 text-sm font-semibold text-primary dark:text-primary-tint border border-primary/30 rounded-2xl hover:bg-primary/5 transition-colors cursor-pointer"
            @click="timeFilter = 'all'"
          >
            Tampilkan Semua Data
          </button>
        </div>

        <!-- Render statistics when data loaded -->
        <div v-else class="space-y-5">
          <!-- Summary Card Widget -->
          <div class="grid grid-cols-3 gap-2 text-center bg-white dark:bg-card-dark rounded-card p-4 shadow-sm border border-gray-100 dark:border-gray-800/40">
            <div>
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Total Masuk
              </p>
              <p class="text-xs font-extrabold text-green-600 dark:text-green-400 mt-1 truncate">
                {{ formatRupiah(filteredIncome) }}
              </p>
            </div>
            <div class="border-x border-gray-100 dark:border-gray-800/60">
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Total Keluar
              </p>
              <p class="text-xs font-extrabold text-red-500 dark:text-red-400 mt-1 truncate">
                {{ formatRupiah(filteredExpense) }}
              </p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Sisa Saldo
              </p>
              <p class="text-xs font-extrabold text-primary dark:text-primary-tint mt-1 truncate">
                {{ formatRupiah(filteredBalance) }}
              </p>
            </div>
          </div>

          <!-- Bar Chart (Income vs Expense) -->
          <IncomeExpenseBarChart
            :income="filteredIncome"
            :expense="filteredExpense"
          />

          <!-- Pie Chart (Expense Categories) -->
          <ExpensePieChart :transactions="filteredTransactions" />

          <!-- Financial Summary Insights -->
          <StatisticsSummary :transactions="filteredTransactions" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import IncomeExpenseBarChart from "../components/statistics/IncomeExpenseBarChart.vue";
import ExpensePieChart from "../components/statistics/ExpensePieChart.vue";
import StatisticsSummary from "../components/statistics/StatisticsSummary.vue";
import LoadingSkeleton from "../components/shared/LoadingSkeleton.vue";
import EmptyState from "../components/shared/EmptyState.vue";
import TimeFilterDropdown, { TimeFilterValue } from "../components/shared/TimeFilterDropdown.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { formatRupiah } from "../utils/currencyFormatter";
import { Transaction } from "../types/transaction";

const transactionStore = useTransactionStore();
const timeFilter = ref<TimeFilterValue>("all");

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

const filteredTransactions = computed(() =>
  filterByTimePeriod(transactionStore.transactions, timeFilter.value)
);

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

const periodLabels: Record<TimeFilterValue, string> = {
  all: "Semua Waktu",
  this_month: "Bulan Ini",
  last_3_months: "3 Bulan Terakhir",
  last_6_months: "6 Bulan Terakhir",
  this_year: "Tahun Ini",
  last_year: "Tahun Lalu",
};

const activePeriodLabel = computed(() => periodLabels[timeFilter.value]);
</script>

<style scoped>
.page-container {
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
</style>
