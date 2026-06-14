<template>
  <div class="flex flex-col items-center justify-center text-center p-8 my-6">
    <div class="bg-primary/10 dark:bg-primary/5 p-5 rounded-full mb-4 text-primary animate-pulse">
      <slot name="icon">
        <ion-icon :icon="walletOutline" class="text-5xl block" />
      </slot>
    </div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
      {{ title }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6 leading-relaxed">
      {{ description }}
    </p>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { walletOutline } from "ionicons/icons";

withDefaults(
  defineProps<{
    title: string;
    description: string;
  }>(),
  {
    title: "Tidak ada data",
    description: "Mulai tambahkan catatan baru Anda hari ini.",
  }
);
</script>
