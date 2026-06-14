<template>
  <BaseCard
    padding="md"
    class="bg-white dark:bg-card-dark flex items-center gap-3.5"
  >
    <div class="bg-red-100 dark:bg-red-950/30 p-3 rounded-2xl text-red-600 dark:text-red-400 flex items-center justify-center">
      <ion-icon
        :icon="arrowUpCircle"
        class="text-2xl block"
      />
    </div>
    <div class="min-w-0 flex-1">
      <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Pengeluaran
      </p>
      <p class="text-base font-extrabold text-red-500 dark:text-red-400 break-all">
        {{ formattedExpense }}
      </p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonIcon } from "@ionic/vue";
import { arrowUpCircle } from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";
import { formatRupiah } from "../../utils/currencyFormatter";

const props = defineProps<{
  expense: number;
}>();

const formattedExpense = computed(() => {
  return formatRupiah(props.expense);
});
</script>
