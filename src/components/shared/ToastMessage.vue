<template>
  <ion-toast
    :is-open="isOpen"
    :message="message"
    :duration="duration"
    :color="color"
    :buttons="toastButtons"
    @didDismiss="$emit('dismiss')"
  ></ion-toast>
</template>

<script setup lang="ts">
import { IonToast } from "@ionic/vue";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    message: string;
    duration?: number;
    color?: "success" | "danger" | "warning" | "primary" | "medium";
  }>(),
  {
    isOpen: false,
    message: "",
    duration: 2000,
    color: "success",
  }
);

defineEmits<{
  (e: "dismiss"): void;
}>();

const toastButtons = computed(() => [
  {
    text: "Tutup",
    role: "cancel",
  },
]);
</script>
