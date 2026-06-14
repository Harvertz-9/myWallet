<template>
  <div class="relative w-full">
    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 flex items-center pointer-events-none">
      <ion-icon
        :icon="searchOutline"
        class="text-xl block"
      />
    </div>
    <input
      type="text"
      :value="modelValue"
      placeholder="Cari transaksi..."
      class="w-full bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-input py-3.5 pl-11 pr-10 shadow-sm transition-all duration-200"
      @input="onInput"
    />
    <button
      v-if="modelValue"
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center cursor-pointer transition-colors"
      @click="onClear"
    >
      <ion-icon
        :icon="closeCircleOutline"
        class="text-lg block"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { searchOutline, closeCircleOutline } from "ionicons/icons";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search", value: string): void;
}>();

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", value);
  emit("search", value);
};

const onClear = () => {
  emit("update:modelValue", "");
  emit("search", "");
};
</script>
