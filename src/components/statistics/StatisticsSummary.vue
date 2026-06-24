<template>
  <div class="space-y-4">
    <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 px-1">
      Analisis Finansial
    </h3>

    <div class="grid grid-cols-2 gap-3">
      <!-- Total Transaksi -->
      <BaseCard
        padding="sm"
        class="bg-white dark:bg-card-dark flex flex-col justify-between min-h-[90px]"
      >
        <div class="flex items-center justify-between text-gray-400 dark:text-gray-500 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider">Total Transaksi</span>
          <ion-icon :icon="listOutline" class="text-lg" />
        </div>
        <div>
          <h4 class="text-lg font-extrabold text-gray-900 dark:text-white">
            {{ transactions.length }}
          </h4>
          <p class="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">
            Catatan tersimpan
          </p>
        </div>
      </BaseCard>

      <!-- Rata-rata Pengeluaran -->
      <BaseCard
        padding="sm"
        class="bg-white dark:bg-card-dark flex flex-col justify-between min-h-[90px]"
      >
        <div class="flex items-center justify-between text-gray-400 dark:text-gray-500 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider">Rata-rata Keluar</span>
          <ion-icon :icon="calculatorOutline" class="text-lg" />
        </div>
        <div>
          <h4 class="text-lg font-extrabold text-red-500 dark:text-red-400">
            {{ formattedAverageExpense }}
          </h4>
          <p class="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">
            Per transaksi
          </p>
        </div>
      </BaseCard>

      <!-- Rata-rata Pemasukan -->
      <BaseCard
        padding="sm"
        class="bg-white dark:bg-card-dark flex flex-col justify-between min-h-[90px]"
      >
        <div class="flex items-center justify-between text-gray-400 dark:text-gray-500 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider">Rata-rata Masuk</span>
          <ion-icon :icon="trendingUpOutline" class="text-lg text-green-500" />
        </div>
        <div>
          <h4 class="text-lg font-extrabold text-green-600 dark:text-green-400">
            {{ formattedAverageIncome }}
          </h4>
          <p class="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-0.5">
            Per transaksi
          </p>
        </div>
      </BaseCard>

      <!-- Pengeluaran Terbesar -->
      <BaseCard
        padding="sm"
        class="bg-white dark:bg-card-dark flex flex-col justify-between min-h-[100px] col-span-2"
      >
        <div class="flex items-center justify-between text-gray-400 dark:text-gray-500 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider">Pengeluaran Terbesar 📈</span>
          <ion-icon :icon="trendingUpOutline" class="text-lg text-red-500" />
        </div>
        <div class="flex items-center justify-between mt-1.5">
          <div class="min-w-0 pr-2">
            <h4 class="text-sm font-bold text-gray-900 dark:text-white truncate">
              {{ highestExpense ? highestExpense.title : "Belum Ada" }}
            </h4>
            <p class="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
              {{ highestExpense ? getCategoryLabel(highestExpense.category) : "Kategori" }}
            </p>
          </div>
          <p class="text-base font-extrabold text-red-500 dark:text-red-400 shrink-0">
            {{ highestExpense ? formatRupiah(highestExpense.amount) : "Rp0" }}
          </p>
        </div>
      </BaseCard>

      <!-- Pemasukan Terbesar -->
      <BaseCard
        padding="sm"
        class="bg-white dark:bg-card-dark flex flex-col justify-between min-h-[100px] col-span-2"
      >
        <div class="flex items-center justify-between text-gray-400 dark:text-gray-500 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider">Pemasukan Terbesar 🌟</span>
          <ion-icon :icon="sparklesOutline" class="text-lg text-green-500" />
        </div>
        <div class="flex items-center justify-between mt-1.5">
          <div class="min-w-0 pr-2">
            <h4 class="text-sm font-bold text-gray-900 dark:text-white truncate">
              {{ highestIncome ? highestIncome.title : "Belum Ada" }}
            </h4>
            <p class="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
              {{ highestIncome ? getCategoryLabel(highestIncome.category) : "Kategori" }}
            </p>
          </div>
          <p class="text-base font-extrabold text-green-600 dark:text-green-400 shrink-0">
            {{ highestIncome ? formatRupiah(highestIncome.amount) : "Rp0" }}
          </p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonIcon } from "@ionic/vue";
import {
  listOutline,
  calculatorOutline,
  trendingUpOutline,
  sparklesOutline,
} from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";
import { Transaction } from "../../types/transaction";
import { formatRupiah } from "../../utils/currencyFormatter";

const props = defineProps<{
  transactions: Transaction[];
}>();

const categoryLabelMap: Record<string, string> = {
  Salary: "Gaji",
  Bonus: "Bonus",
  Freelance: "Freelance",
  Investment: "Investasi",
  Gift: "Hadiah",
  Food: "Makanan",
  Transportation: "Transportasi",
  Shopping: "Belanja",
  Entertainment: "Hiburan",
  Education: "Pendidikan",
  Health: "Kesehatan",
  Bills: "Tagihan",
  Others: "Lainnya",
};

const getCategoryLabel = (category: string) => {
  return categoryLabelMap[category] || category;
};

// Highest Expense
const highestExpense = computed(() => {
  const expenses = props.transactions.filter((t) => t.type === "expense");
  if (expenses.length === 0) return null;
  return expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0]);
});

// Highest Income
const highestIncome = computed(() => {
  const incomes = props.transactions.filter((t) => t.type === "income");
  if (incomes.length === 0) return null;
  return incomes.reduce((max, t) => (t.amount > max.amount ? t : max), incomes[0]);
});

// Average Expense
const formattedAverageExpense = computed(() => {
  const expenses = props.transactions.filter((t) => t.type === "expense");
  if (expenses.length === 0) return "Rp0";
  const sum = expenses.reduce((acc, t) => acc + t.amount, 0);
  const avg = Math.round(sum / expenses.length);
  return formatRupiah(avg);
});

// Average Income
const formattedAverageIncome = computed(() => {
  const incomes = props.transactions.filter((t) => t.type === "income");
  if (incomes.length === 0) return "Rp0";
  const sum = incomes.reduce((acc, t) => acc + t.amount, 0);
  const avg = Math.round(sum / incomes.length);
  return formatRupiah(avg);
});
</script>
