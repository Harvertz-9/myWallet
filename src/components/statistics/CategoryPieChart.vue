<template>
  <BaseCard padding="md" class="bg-white dark:bg-card-dark">
    <div class="flex items-center justify-between mb-4 px-1">
      <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100">
        Kategori
      </h3>
      <div class="relative">
        <select
          v-model="selectedType"
          class="appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-xl py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer min-w-[130px]"
        >
          <option value="expense">Pengeluaran</option>
          <option value="income">Pemasukan</option>
        </select>
        <div class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <ion-icon :icon="chevronDownOutline" class="text-sm block" />
        </div>
      </div>
    </div>

    <div
      v-if="chartData.datasets[0].data.length === 0"
      class="flex flex-col items-center justify-center min-h-52 text-center p-4"
    >
      <div class="text-gray-400 dark:text-gray-600 mb-2">
        <ion-icon :icon="selectedType === 'income' ? trendingUpOutline : pieChartOutline" class="text-4xl block" />
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Belum ada catatan {{ selectedType === 'income' ? 'pemasukan' : 'pengeluaran' }} periode ini.
      </p>
    </div>

    <div v-else class="flex flex-col sm:flex-row items-center gap-6 py-2 w-full">
      <div class="relative w-full max-w-40 h-40 flex-shrink-0 flex justify-center items-center">
        <Pie :data="chartData" :options="chartOptions" />
      </div>

      <div class="flex-1 w-full grid grid-cols-2 gap-2 sm:gap-3">
        <div
          v-for="item in legendItems"
          :key="item.label"
          class="flex items-center gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 min-w-0"
        >
          <span
            class="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
            :style="{ backgroundColor: item.color }"
          ></span>
          <div class="truncate flex-1 min-w-0 leading-tight">
            <div class="truncate text-gray-850 dark:text-gray-200">{{ item.label }}</div>
            <div class="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
              {{ item.percentage }}% • {{ item.formattedAmount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Pie } from "vue-chartjs";
import { IonIcon } from "@ionic/vue";
import { chevronDownOutline, trendingUpOutline, pieChartOutline } from "ionicons/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import BaseCard from "../base/BaseCard.vue";
import { Transaction } from "../../types/transaction";
import { formatRupiah } from "../../utils/currencyFormatter";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const props = defineProps<{
  transactions: Transaction[];
}>();

const selectedType = ref<"income" | "expense">("expense");

const incomeLabelMap: Record<string, string> = {
  Salary: "Gaji",
  Bonus: "Bonus",
  Freelance: "Freelance",
  Investment: "Investasi",
  Gift: "Hadiah",
  Others: "Lainnya",
};

const incomeColors: Record<string, string> = {
  Salary: "#34D399",
  Bonus: "#60A5FA",
  Freelance: "#A78BFA",
  Investment: "#FBBF24",
  Gift: "#F472B6",
  Others: "#9CA3AF",
};

const expenseLabelMap: Record<string, string> = {
  Food: "Makanan",
  Transportation: "Transportasi",
  Shopping: "Belanja",
  Entertainment: "Hiburan",
  Education: "Pendidikan",
  Health: "Kesehatan",
  Bills: "Tagihan",
  Others: "Lainnya",
};

const expenseColors: Record<string, string> = {
  Food: "#F87171",
  Transportation: "#FB923C",
  Shopping: "#FBBF24",
  Entertainment: "#A78BFA",
  Education: "#60A5FA",
  Health: "#34D399",
  Bills: "#F472B6",
  Others: "#9CA3AF",
};

const legendItems = computed(() => {
  const filtered = props.transactions.filter((t) => t.type === selectedType.value);
  const labelMap = selectedType.value === "income" ? incomeLabelMap : expenseLabelMap;
  const colors = selectedType.value === "income" ? incomeColors : expenseColors;
  const defaultColor = selectedType.value === "income" ? "#34D399" : "#F87171";

  const aggregated: Record<string, number> = {};
  let total = 0;
  filtered.forEach((t) => {
    const cat = t.category;
    aggregated[cat] = (aggregated[cat] || 0) + t.amount;
    total += t.amount;
  });

  return Object.keys(aggregated)
    .map((cat) => {
      const amount = aggregated[cat];
      const percentage = total > 0 ? Math.round((amount / total) * 100) : 0;
      return {
        label: labelMap[cat] || cat,
        color: colors[cat] || defaultColor,
        amount,
        percentage,
        formattedAmount: formatRupiah(amount),
      };
    })
    .sort((a, b) => b.amount - a.amount);
});

const chartData = computed(() => {
  const filtered = props.transactions.filter((t) => t.type === selectedType.value);
  const labelMap = selectedType.value === "income" ? incomeLabelMap : expenseLabelMap;
  const colors = selectedType.value === "income" ? incomeColors : expenseColors;
  const defaultColor = selectedType.value === "income" ? "#34D399" : "#F87171";

  const aggregated: Record<string, number> = {};
  filtered.forEach((t) => {
    const cat = t.category;
    aggregated[cat] = (aggregated[cat] || 0) + t.amount;
  });

  const categories = Object.keys(aggregated);
  const data = Object.values(aggregated);
  const labels = categories.map((c) => labelMap[c] || c);
  const backgroundColor = categories.map((c) => colors[c] || defaultColor);

  if (data.length === 0) {
    return {
      labels: [],
      datasets: [{ data: [], backgroundColor: [] }],
    };
  }

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 2,
        borderColor: "transparent",
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label(context: any) {
          const value = context.raw;
          const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value);
          return ` ${context.label}: ${formatted.replace(/\s/g, "")}`;
        },
      },
    },
  },
}));
</script>
