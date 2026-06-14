<template>
  <BaseCard
    padding="md"
    class="bg-white dark:bg-card-dark"
  >
    <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 px-1">
      Pemasukan vs Pengeluaran
    </h3>

    <!-- Fallback if no transactions -->
    <div
      v-if="income === 0 && expense === 0"
      class="flex flex-col items-center justify-center min-h-[200px] text-center p-4"
    >
      <div class="text-gray-400 dark:text-gray-600 mb-2">
        <ion-icon :icon="barChartOutline" class="text-4xl block" />
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Belum ada transaksi untuk dibandingkan.
      </p>
    </div>

    <!-- Render Bar Chart -->
    <div
      v-else
      class="relative min-h-[200px] w-full"
    >
      <Bar
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import { IonIcon } from "@ionic/vue";
import { barChartOutline } from "ionicons/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import BaseCard from "../base/BaseCard.vue";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const props = defineProps<{
  income: number;
  expense: number;
}>();

const chartData = computed(() => {
  return {
    labels: ["Pemasukan 🟢", "Pengeluaran 🔴"],
    datasets: [
      {
        label: "Total Keuangan",
        data: [props.income, props.expense],
        backgroundColor: ["#10B981", "#EF4444"], // Emerald and Red
        borderRadius: 12,
        borderWidth: 0,
        barThickness: 40,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hide legend since labels are descriptive enough
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
          return ` Total: ${formatted.replace(/\s/g, "")}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: document.body.classList.contains("dark") ? "#1F2937" : "#F3F4F6",
      },
      ticks: {
        color: document.body.classList.contains("dark") ? "#9CA3AF" : "#6B7280",
        font: {
          family: "'Inter', sans-serif",
          size: 10,
        },
        callback: function (value: any) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + "M";
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + "K";
          }
          return value;
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: document.body.classList.contains("dark") ? "#9CA3AF" : "#6B7280",
        font: {
          family: "'Inter', sans-serif",
          size: 11,
          weight: "bold" as const,
        },
      },
    },
  },
}));
</script>
