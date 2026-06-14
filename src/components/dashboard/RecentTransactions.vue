<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between px-1">
      <h3 class="text-base font-bold text-gray-900 dark:text-gray-100">
        Transaksi Terbaru
      </h3>
      <router-link
        to="/tabs/transactions"
        class="text-xs font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
      >
        Lihat Semua
        <ion-icon :icon="chevronForwardOutline" class="block text-sm" />
      </router-link>
    </div>

    <!-- Empty State for Recent Transactions -->
    <div
      v-if="transactions.length === 0"
      class="bg-white dark:bg-card-dark rounded-card p-6 text-center border border-gray-100 dark:border-gray-800/40"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Belum ada catatan transaksi harian.
      </p>
    </div>

    <!-- Transaction List -->
    <div
      v-else
      class="space-y-2.5"
    >
      <TransactionCard
        v-for="tx in transactions"
        :key="tx.id"
        :transaction="tx"
        @click="onCardClick(tx)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { chevronForwardOutline } from "ionicons/icons";
import TransactionCard from "../transaction/TransactionCard.vue";
import { Transaction } from "../../types/transaction";

defineProps<{
  transactions: Transaction[];
}>();

const emit = defineEmits<{
  (e: "select", transaction: Transaction): void;
}>();

const onCardClick = (tx: Transaction) => {
  emit("select", tx);
};
</script>
