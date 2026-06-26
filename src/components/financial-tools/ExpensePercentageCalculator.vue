<template>
  <ion-card class="tool-card">
    <ion-card-header>
      <div class="flex items-center gap-3 mx-5">
        <div class="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <ion-icon :icon="pieChartOutline" class="text-xl" />
        </div>
        <div class="py-3">
          <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">
            {{ t('financial_tools.expense_sub') }}
          </span>
          <ion-card-title class="text-lg font-bold text-gray-900 dark:text-white p-0!">
            {{ t('financial_tools.expense_title') }}
          </ion-card-title>
        </div>
      </div>
    </ion-card-header>

    <ion-card-content class="space-y-5">
      <div v-if="hasIncome" class="space-y-4">
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {{ t('financial_tools.total_income') }}
            </span>
            <span class="text-sm font-extrabold text-green-600 dark:text-green-400">
              {{ formatRupiah(totalIncome) }}
            </span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {{ t('financial_tools.total_expense') }}
            </span>
            <span class="text-sm font-extrabold text-red-500 dark:text-red-400">
              {{ formatRupiah(totalExpense) }}
            </span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">
              {{ t('financial_tools.expense_percentage') }}
            </span>
            <span class="text-base font-extrabold" :class="percentageColorClass">
              {{ percentageDisplay }}
            </span>
          </div>
        </div>

        <div
          class="rounded-xl p-4 text-center"
          :class="statusCardClass"
        >
          <p class="text-sm font-extrabold" :class="statusTextClass">
            {{ statusText }}
          </p>
          <p class="text-xs font-semibold mt-1" :class="statusDescClass">
            {{ statusDescription }}
          </p>
        </div>
      </div>

      <div v-else class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
        <p class="text-sm font-semibold text-gray-400 dark:text-gray-500">
          {{ t('financial_tools.no_income') }}
        </p>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from "@ionic/vue";
import { pieChartOutline } from "ionicons/icons";
import { formatRupiah } from "../../utils/currencyFormatter";
import { useTransactionStore } from "../../stores/transactionStore";
import { useI18n } from "../../utils/i18n";

const { t } = useI18n();
const transactionStore = useTransactionStore();

const totalIncome = computed(() => transactionStore.totalIncome);
const totalExpense = computed(() => transactionStore.totalExpense);

const hasIncome = computed(() => totalIncome.value > 0);

const expensePercentage = computed(() => {
  if (!hasIncome.value) return 0;
  return (totalExpense.value / totalIncome.value) * 100;
});

const percentageDisplay = computed(() => {
  if (!hasIncome.value) return "-";
  return `${expensePercentage.value.toFixed(1)}%`;
});

type StatusLevel = "healthy" | "attention" | "danger" | "overspending";

const statusLevel = computed<StatusLevel>(() => {
  if (!hasIncome.value) return "healthy";
  const pct = expensePercentage.value;
  if (pct > 100) return "overspending";
  if (pct > 70) return "danger";
  if (pct > 50) return "attention";
  return "healthy";
});

const statusText = computed(() => {
  const labels: Record<StatusLevel, string> = {
    healthy: "Sehat",
    attention: "Perlu Diperhatikan",
    danger: "Zona Berbahaya",
    overspending: "Overbudget",
  };
  return labels[statusLevel.value];
});

const statusDescription = computed(() => {
  const descriptions: Record<StatusLevel, string> = {
    healthy: "Pengeluaran Anda masih dalam batas wajar",
    attention: "Perhatikan pengeluaran agar tidak membengkak",
    danger: "Segera evaluasi pengeluaran Anda",
    overspending: "Pengeluaran melebihi pemasukan!",
  };
  return descriptions[statusLevel.value];
});

const percentageColorClass = computed(() => {
  const colors: Record<StatusLevel, string> = {
    healthy: "text-green-600 dark:text-green-400",
    attention: "text-yellow-600 dark:text-yellow-400",
    danger: "text-orange-600 dark:text-orange-400",
    overspending: "text-red-600 dark:text-red-400",
  };
  return colors[statusLevel.value];
});

const statusCardClass = computed(() => {
  const classes: Record<StatusLevel, string> = {
    healthy: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40",
    attention: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/40",
    danger: "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/40",
    overspending: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40",
  };
  return classes[statusLevel.value];
});

const statusTextClass = computed(() => {
  const classes: Record<StatusLevel, string> = {
    healthy: "text-green-700 dark:text-green-300",
    attention: "text-yellow-700 dark:text-yellow-300",
    danger: "text-orange-700 dark:text-orange-300",
    overspending: "text-red-700 dark:text-red-300",
  };
  return classes[statusLevel.value];
});

const statusDescClass = computed(() => {
  const classes: Record<StatusLevel, string> = {
    healthy: "text-green-600/70 dark:text-green-400/70",
    attention: "text-yellow-600/70 dark:text-yellow-400/70",
    danger: "text-orange-600/70 dark:text-orange-400/70",
    overspending: "text-red-600/70 dark:text-red-400/70",
  };
  return classes[statusLevel.value];
});
</script>

<style scoped>
ion-card.tool-card {
  margin: 0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
:root.dark ion-card.tool-card {
  border-color: rgba(255, 255, 255, 0.05);
}
ion-card-header {
  padding-bottom: 0;
}
ion-card-header ion-card-title {
  margin: 0;
}
</style>
