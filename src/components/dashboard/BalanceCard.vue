<template>
  <BaseCard
    padding="lg"
    class="bg-gradient-to-br from-primary to-teal-600 text-white relative overflow-hidden custom-balance-card"
  >
    <!-- Background accents -->
    <div class="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
    <div class="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-white/5 blur-xl pointer-events-none"></div>
    
    <div class="relative z-10 space-y-2">
      <div class="flex items-center justify-between">
        <p class="text-sm font-semibold tracking-wide text-emerald-100/90">
          Total Saldo
        </p>
        <div class="bg-white/20 p-2 rounded-xl">
          <ion-icon :icon="walletOutline" class="text-xl block" />
        </div>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight break-all">
        {{ formattedBalance }}
      </h1>
      <p class="text-xs text-emerald-100/70 font-medium">
        Seluruh Dompet & Rekening harian
      </p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonIcon } from "@ionic/vue";
import { walletOutline } from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";
import { formatRupiah } from "../../utils/currencyFormatter";

const props = defineProps<{
  balance: number;
}>();

const formattedBalance = computed(() => {
  return formatRupiah(props.balance);
});
</script>

<style scoped>
.custom-balance-card {
  box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.3), 0 8px 10px -6px rgba(16, 185, 129, 0.2);
}
</style>
