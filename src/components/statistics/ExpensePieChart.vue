<template>
  <BaseCard
    padding="md"
    class="bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800/40"
  >
    <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 px-1">
      Kategori Pengeluaran
    </h3>

    <!-- Fallback if no expenses -->
    <div
      v-if="chartData.datasets[0].data.length === 0"
      class="flex flex-col items-center justify-center min-h-[220px] text-center p-4"
    >
      <div class="text-gray-400 dark:text-gray-600 mb-2">
        <ion-icon :icon="pieChartOutline" class="text-4xl block" />
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Belum ada catatan pengeluaran bulan ini.
      </p>
    </div>

    <!-- Render Pie Chart with Custom Legend -->
    <div
      v-else
      class="flex flex-col sm:flex-row items-center gap-6 py-2 w-full"
    >
      <!-- Chart Canvas Wrapper -->
      <div class="relative w-full max-w-[160px] h-[160px] flex-shrink-0 flex justify-center items-center">
        <Pie
          :data="chartData"
          :options="chartOptions"
        />
      </div>

      <!-- Custom Responsive Legend -->
      <div class="flex-1 w-full grid grid-cols-2 gap-2 sm:gap-3">
        <div
          v-for="item in legendItems"
          :key="item.label"
          class="flex items-center gap-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 min-w-0"
        >
          <!-- Color Dot -->
          <span
            class="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
            :style="{ backgroundColor: item.color }"
          ></span>
          
          <!-- Details (Name, %, Amount) -->
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
import { computed } from "vue";
import { Pie } from "vue-chartjs";
import { IonIcon } from "@ionic/vue";
import { pieChartOutline } from "ionicons/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import BaseCard from "../base/BaseCard.vue";
import { Transaction } from "../../types/transaction";
import { formatRupiah } from "../../utils/currencyFormatter";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const props = defineProps<{
  transactions: Transaction[];
}>();

const categoryLabelMap: Record<string, string> = {
  Food: "Makanan",
  Transportation: "Transportasi",
  Shopping: "Belanja",
  Entertainment: "Hiburan",
  Education: "Pendidikan",
  Health: "Kesehatan",
  Bills: "Tagihan",
  Others: "Lainnya",
};

const categoryColors: Record<string, string> = {
  Food: "#F87171",           // Red
  Transportation: "#FB923C",   // Orange
  Shopping: "#FBBF24",         // Amber
  Entertainment: "#A78BFA",    // Purple
  Education: "#60A5FA",        // Blue
  Health: "#34D399",          // Emerald
  Bills: "#F472B6",            // Pink
  Others: "#9CA3AF",           // Gray
};

// Custom Legend Items
const legendItems = computed(() => {
  const expenses = props.transactions.filter((t) => t.type === "expense");
  
  // Aggregate expenses by category
  const aggregated: Record<string, number> = {};
  let total = 0;
  expenses.forEach((t) => {
    const cat = t.category;
    aggregated[cat] = (aggregated[cat] || 0) + t.amount;
    total += t.amount;
  });

  return Object.keys(aggregated).map((cat) => {
    const amount = aggregated[cat];
    const percentage = total > 0 ? Math.round((amount / total) * 100) : 0;
    return {
      label: categoryLabelMap[cat] || cat,
      color: categoryColors[cat] || "#D1D5DB",
      amount,
      percentage,
      formattedAmount: formatRupiah(amount),
    };
  }).sort((a, b) => b.amount - a.amount); // Sort by highest expense first
});

const chartData = computed(() => {
  const expenses = props.transactions.filter((t) => t.type === "expense");
  
  // Aggregate expenses by category
  const aggregated: Record<string, number> = {};
  expenses.forEach((t) => {
    const cat = t.category;
    aggregated[cat] = (aggregated[cat] || 0) + t.amount;
  });

  const categories = Object.keys(aggregated);
  const data = Object.values(aggregated);
  const labels = categories.map((c) => categoryLabelMap[c] || c);
  const backgroundColor = categories.map((c) => categoryColors[c] || "#D1D5DB");

  if (data.length === 0) {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
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
    legend: {
      display: false, // HIDE standard ChartJS legend
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
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

<style scoped>
/* Scoped styles */
</style>
