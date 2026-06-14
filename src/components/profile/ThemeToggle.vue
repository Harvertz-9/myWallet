<template>
  <BaseCard
    padding="md"
    class="bg-white dark:bg-card-dark flex items-center justify-between"
  >
    <div class="flex items-center gap-3.5">
      <div class="bg-indigo-100 dark:bg-indigo-950/30 p-2.5 rounded-xl text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
        <ion-icon
          :icon="darkMode ? moon : sunny"
          class="text-xl block"
        />
      </div>
      <div>
        <p class="text-sm font-bold text-gray-950 dark:text-white">
          Mode Gelap
        </p>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
          {{ darkMode ? 'Aktif' : 'Nonaktif' }}
        </p>
      </div>
    </div>
    <ion-toggle
      :checked="darkMode"
      color="primary"
      class="cursor-pointer"
      @ionChange="$emit('toggle')"
    />
  </BaseCard>
</template>

<script setup lang="ts">
import { IonIcon, IonToggle } from "@ionic/vue";
import { moon, sunny } from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";

defineProps<{
  darkMode: boolean;
}>();

defineEmits<{
  (e: "toggle"): void;
}>();
</script>
