<template>
  <BaseCard
    padding="md"
    class="bg-white dark:bg-card-dark"
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

    <!-- Render Pie Chart -->
    <div
      v-else
      class="relative flex justify-center items-center min-h-[220px] w-full"
    >
      <div class="w-full max-w-[220px]">
        <Pie
          :data="chartData"
          :options="chartOptions"
        />
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

  // If no expenses, chartData will have empty dataset
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
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 12,
        font: {
          family: "'Inter', sans-serif",
          size: 10,
          weight: "bold" as const,
        },
        color: document.body.classList.contains("dark") ? "#9CA3AF" : "#4B5563",
      },
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
