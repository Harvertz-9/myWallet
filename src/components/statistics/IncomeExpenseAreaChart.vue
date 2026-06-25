<template>
  <BaseCard padding="md" class="bg-white dark:bg-card-dark">
    <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-6 px-1">
      Tren Keuangan
    </h3>

    <div
      v-if="chartData.labels.length === 0"
      class="flex flex-col items-center justify-center min-h-50 text-center p-4"
    >
      <div class="text-gray-400 dark:text-gray-600 mb-2">
        <ion-icon :icon="trendingUpOutline" class="text-4xl block" />
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Belum cukup data untuk menampilkan tren.
      </p>
    </div>

    <div v-else class="relative min-h-58 w-full pt-3">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Line } from "vue-chartjs";
import { IonIcon } from "@ionic/vue";
import { trendingUpOutline } from "ionicons/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import BaseCard from "../base/BaseCard.vue";
import { Transaction } from "../../types/transaction";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const props = defineProps<{
  transactions: Transaction[];
}>();

const isDark = () => document.body.classList.contains("dark");

interface DateGroup {
  date: string;
  income: number;
  expense: number;
}

const grouped = computed(() => {
  const map = new Map<string, DateGroup>();

  for (const tx of props.transactions) {
    const key = tx.date;
    if (!map.has(key)) {
      map.set(key, { date: key, income: 0, expense: 0 });
    }
    const group = map.get(key)!;
    if (tx.type === "income") {
      group.income += tx.amount;
    } else {
      group.expense += tx.amount;
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
});

const formatLabel = (dateStr: string) => {
  const parts = dateStr.split("-");
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(d);
};

const chartData = computed(() => {
  const labels = grouped.value.map((g) => formatLabel(g.date));
  const incomeData = grouped.value.map((g) => g.income);
  const expenseData = grouped.value.map((g) => g.expense);

  const incomeColor = "10, 185, 129";
  const expenseColor = "239, 68, 68";

  return {
    labels,
    datasets: [
      {
        label: "Pemasukan",
        data: incomeData,
        borderColor: `rgba(${incomeColor}, 1)`,
        backgroundColor: (ctx: any) => {
          if (!ctx.chart?.ctx) return `rgba(${incomeColor}, 0.15)`;
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          gradient.addColorStop(0, `rgba(${incomeColor}, 0.35)`);
          gradient.addColorStop(1, `rgba(${incomeColor}, 0.02)`);
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHitRadius: 20,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: `rgba(${incomeColor}, 1)`,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        borderWidth: 2.5,
      },
      {
        label: "Pengeluaran",
        data: expenseData,
        borderColor: `rgba(${expenseColor}, 1)`,
        backgroundColor: (ctx: any) => {
          if (!ctx.chart?.ctx) return `rgba(${expenseColor}, 0.15)`;
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          gradient.addColorStop(0, `rgba(${expenseColor}, 0.35)`);
          gradient.addColorStop(1, `rgba(${expenseColor}, 0.02)`);
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        pointHitRadius: 20,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: `rgba(${expenseColor}, 1)`,
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        borderWidth: 2.5,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index" as const,
  },
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      align: "start" as const,
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        borderRadius: 4,
        usePointStyle: true,
        pointStyle: "circle" as const,
        padding: 24,
        color: isDark() ? "#D1D5DB" : "#4B5563",
        font: {
          family: "'Inter', sans-serif",
          size: 11,
          weight: "bold" as const,
        },
      },
    },
    tooltip: {
      backgroundColor: isDark() ? "#1F2937" : "#fff",
      titleColor: isDark() ? "#F3F4F6" : "#111827",
      bodyColor: isDark() ? "#D1D5DB" : "#4B5563",
      borderColor: isDark() ? "#374151" : "#E5E7EB",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 12,
      titleFont: {
        family: "'Inter', sans-serif",
        size: 11,
        weight: "bold" as const,
      },
      bodyFont: {
        family: "'Inter', sans-serif",
        size: 12,
      },
      callbacks: {
        title(items: any[]) {
          if (items.length) return items[0].label;
          return "";
        },
        label(context: any) {
          const value = context.raw as number;
          const formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(value);
          return ` ${context.dataset.label}: ${formatted.replace(/\s/g, "")}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: isDark() ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)",
        drawBorder: false,
      },
      ticks: {
        color: isDark() ? "#9CA3AF" : "#9CA3AF",
        font: {
          family: "'Inter', sans-serif",
          size: 10,
        },
        padding: 8,
        callback(value: any) {
          if (value >= 1000000000) {
            return (value / 1000000000).toFixed(1) + "M";
          } else if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + "jt";
          } else if (value >= 1000) {
            return (value / 1000).toFixed(0) + "rb";
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
        maxTicksLimit: 8,
        color: isDark() ? "#9CA3AF" : "#9CA3AF",
        font: {
          family: "'Inter', sans-serif",
          size: 10,
        },
        maxRotation: 0,
      },
    },
  },
}));
</script>
