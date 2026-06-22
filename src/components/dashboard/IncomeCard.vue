<template>
  <BaseCard
    padding="md"
    class="bg-white dark:bg-card-dark flex items-center gap-2.5 sm:gap-3.5"
  >
    <div class="bg-green-100 dark:bg-green-950/30 p-3 rounded-2xl text-green-600 dark:text-green-400 flex items-center justify-center">
      <ion-icon
        :icon="arrowDownCircle"
        class="text-2xl block"
      />
    </div>
    <div class="min-w-0 flex-1">
      <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Pemasukan
      </p>
      <p class="text-base font-extrabold text-green-600 dark:text-green-400 break-all">
        {{ formattedIncome }}
      </p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonIcon } from "@ionic/vue";
import { arrowDownCircle } from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";
import { formatRupiah } from "../../utils/currencyFormatter";

const props = defineProps<{
  income: number;
}>();

const formattedIncome = computed(() => {
  return formatRupiah(props.income);
});
</script>
