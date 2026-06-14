<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="space-y-6 pb-20">
        <!-- Page Header -->
        <div class="pt-4 px-1">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Grafik & Ringkasan
          </span>
          <h1 class="text-2xl font-black text-gray-900 dark:text-white">
            Statistik Keuangan
          </h1>
        </div>

        <!-- Check loading state -->
        <div v-if="transactionStore.loading" class="space-y-5">
          <LoadingSkeleton type="chart" />
          <LoadingSkeleton type="card" />
        </div>

        <!-- Render statistics when data loaded -->
        <div v-else-if="transactionStore.transactions.length === 0">
          <div class="pt-10">
            <EmptyState
              title="Data Statistik Kosong"
              description="Tambahkan transaksi terlebih dahulu di Dashboard untuk memantau grafik analisis keuangan Anda."
            />
          </div>
        </div>

        <div v-else class="space-y-6">
          <!-- Monthly Summary Card Widget -->
          <div class="grid grid-cols-3 gap-2 text-center bg-white dark:bg-card-dark rounded-card p-4 shadow-sm border border-gray-100 dark:border-gray-800/40">
            <div>
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Total Masuk
              </p>
              <p class="text-xs font-extrabold text-green-600 dark:text-green-400 mt-1 truncate">
                {{ formatRupiah(transactionStore.totalIncome) }}
              </p>
            </div>
            <div class="border-x border-gray-100 dark:border-gray-800/60">
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Total Keluar
              </p>
              <p class="text-xs font-extrabold text-red-500 dark:text-red-400 mt-1 truncate">
                {{ formatRupiah(transactionStore.totalExpense) }}
              </p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Sisa Saldo
              </p>
              <p class="text-xs font-extrabold text-primary dark:text-primary-tint mt-1 truncate">
                {{ formatRupiah(transactionStore.balance) }}
              </p>
            </div>
          </div>

          <!-- Bar Chart (Income vs Expense) -->
          <IncomeExpenseBarChart
            :income="transactionStore.totalIncome"
            :expense="transactionStore.totalExpense"
          />

          <!-- Pie Chart (Expense Categories) -->
          <ExpensePieChart :transactions="transactionStore.transactions" />

          <!-- Financial Summary Insights -->
          <StatisticsSummary :transactions="transactionStore.transactions" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import IncomeExpenseBarChart from "../components/statistics/IncomeExpenseBarChart.vue";
import ExpensePieChart from "../components/statistics/ExpensePieChart.vue";
import StatisticsSummary from "../components/statistics/StatisticsSummary.vue";
import LoadingSkeleton from "../components/shared/LoadingSkeleton.vue";
import EmptyState from "../components/shared/EmptyState.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { formatRupiah } from "../utils/currencyFormatter";

const transactionStore = useTransactionStore();

onMounted(() => {
  transactionStore.loadTransactions();
});
</script>
