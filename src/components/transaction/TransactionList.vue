<template>
  <div class="space-y-6">
    <div
      v-for="group in groupedTransactions"
      :key="group.date"
      class="space-y-2"
    >
      <!-- Date Header -->
      <div class="flex items-center justify-between px-2.5 sticky top-0 bg-bg-light/95 dark:bg-bg-dark/95 z-20 py-1.5 backdrop-blur-sm rounded-lg">
        <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {{ formatGroupDate(group.date) }}
        </span>
        <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {{ group.items.length }} Transaksi
        </span>
      </div>

      <!-- Grouped Items -->
      <ion-list class="bg-transparent p-0 m-0">
        <TransactionCard
          v-for="tx in group.items"
          :key="tx.id"
          :transaction="tx"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"
        />
      </ion-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonList } from "@ionic/vue";
import TransactionCard from "./TransactionCard.vue";
import { Transaction } from "../../types/transaction";
import { formatDate } from "../../utils/dateFormatter";

const props = defineProps<{
  transactions: Transaction[];
}>();

defineEmits<{
  (e: "edit", tx: Transaction): void;
  (e: "delete", id: string): void;
}>();

const groupedTransactions = computed(() => {
  const groups: Record<string, Transaction[]> = {};

  // Sort transactions by date descending, then createdAt descending
  const sorted = [...props.transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateB !== dateA) {
      return dateB - dateA;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  sorted.forEach((tx) => {
    const key = tx.date;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(tx);
  });

  return Object.keys(groups).map((key) => ({
    date: key,
    items: groups[key],
  }));
});

const formatGroupDate = (dateString: string) => {
  const today = new Date().toLocaleDateString("en-CA");
  const yesterdayObj = new Date();
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterday = yesterdayObj.toLocaleDateString("en-CA");

  if (dateString === today) {
    return "Hari Ini";
  } else if (dateString === yesterday) {
    return "Kemarin";
  }
  return formatDate(dateString);
};
</script>

<style scoped>
ion-list {
  background: transparent !important;
}
</style>
