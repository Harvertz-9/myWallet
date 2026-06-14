<template>
  <ion-modal
    :is-open="isOpen"
    :initial-breakpoint="breakpoint || undefined"
    :breakpoints="breakpoint ? [0, breakpoint, 1] : undefined"
    @didDismiss="$emit('close')"
    class="custom-modal-component"
  >
    <div class="bg-white dark:bg-bg-dark p-6 h-full flex flex-col justify-between overflow-y-auto">
      <div>
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
          <h2 class="text-xl font-bold text-gray-950 dark:text-white">{{ title }}</h2>
          <button
            type="button"
            class="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer transition-colors"
            @click="$emit('close')"
          >
            <ion-icon :icon="closeOutline" class="text-2xl block" />
          </button>
        </div>

        <!-- Modal Content -->
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>

      <!-- Modal Footer -->
      <div v-if="$slots.footer" class="pt-4 mt-6 border-t border-gray-100 dark:border-gray-800">
        <slot name="footer"></slot>
      </div>
    </div>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonIcon } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";

defineProps<{
  isOpen: boolean;
  title: string;
  breakpoint?: number; // E.g. 0.75 for sheet modal
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped>
/* Ensure custom styling is applied within Ionic shadow DOM if needed */
ion-modal {
  --background: var(--color-bg-light);
  --border-radius: 24px;
}
.dark ion-modal {
  --background: var(--color-bg-dark);
}
</style>
