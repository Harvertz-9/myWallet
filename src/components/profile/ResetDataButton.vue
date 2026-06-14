<template>
  <BaseCard
    padding="md"
    class="bg-white dark:bg-card-dark border border-red-100 dark:border-red-950/30"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3.5 min-w-0">
        <div class="bg-red-100 dark:bg-red-950/40 p-3 rounded-xl text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
          <ion-icon
            :icon="trashOutline"
            class="text-xl block"
          />
        </div>
        <div class="min-w-0">
          <p class="text-sm font-bold text-gray-950 dark:text-white">
            Reset Seluruh Data
          </p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider truncate">
            Hapus riwayat transaksi &amp; profil
          </p>
        </div>
      </div>
      <BaseButton
        variant="danger"
        size="md"
        class="shrink-0"
        @click="$emit('reset')"
      >
        Hapus
      </BaseButton>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { trashOutline } from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";
import BaseButton from "../base/BaseButton.vue";

defineEmits<{
  (e: "reset"): void;
}>();
</script>
