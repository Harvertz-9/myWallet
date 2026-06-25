<template>
  <BaseCard padding="md" class="bg-white dark:bg-card-dark">
    <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 px-1">
      Tren Keuangan
    </h3>

    <div
      v-if="chartData.labels.length === 0"
      class="flex flex-col items-center justify-center min-h-50 text-center p-4"
    >
      <div class="text-gray-400 dark:text-gray-600 mb-5">
        <ion-icon :icon="trendingUpOutline" class="text-4xl block" />
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400">
        Belum cukup data untuk menampilkan tren.
      </p>
    </div>

    <template v-else>
      <div class="flex items-center gap-4 px-1 pt-4 pb-2">
        <div class="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
          <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/30" />
          {{ abbreviate(totalIncome) }}
        </div>
        <div class="flex items-center gap-1.5 text-xs font-extrabold text-red-500 dark:text-red-400">
          <span class="w-2 h-2 rounded-full bg-red-500 inline-block shadow-sm shadow-red-500/30" />
          {{ abbreviate(totalExpense) }}
        </div>
      </div>
      <div class="relative min-h-58 w-full">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </template>
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

const totalIncome = computed(() =>
  props.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
);

const totalExpense = computed(() =>
  props.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
);

const abbreviate = (value: number) => {
  if (value >= 1000000000) {
    return "Rp" + (value / 1000000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (value >= 1000000) {
    return "Rp" + (value / 1000000).toFixed(1).replace(/\.0$/, "") + "jt";
  } else if (value >= 1000) {
    return "Rp" + (value / 1000).toFixed(0) + "rb";
  }
  return "Rp" + value;
};

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
      display: false,
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
        padding: 12,
      },
    },
  },
}));
</script>
