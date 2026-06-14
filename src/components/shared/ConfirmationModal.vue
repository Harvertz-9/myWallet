<template>
  <BaseModal
    :is-open="isOpen"
    :title="title"
    @close="$emit('cancel')"
  >
    <div class="space-y-5">
      <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {{ message }}
      </p>

      <div class="flex gap-3 pt-2">
        <BaseButton
          variant="secondary"
          size="md"
          class="flex-1"
          @click="$emit('cancel')"
        >
          Batal
        </BaseButton>
        <BaseButton
          variant="danger"
          size="md"
          class="flex-1"
          @click="$emit('confirm')"
        >
          Ya, Lanjutkan
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../base/BaseModal.vue";
import BaseButton from "../base/BaseButton.vue";

defineProps<{
  isOpen: boolean;
  title: string;
  message: string;
}>();

defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>
