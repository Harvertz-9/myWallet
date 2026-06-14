<template>
  <div class="flex flex-col w-full gap-1.5">
    <label
      v-if="label"
      class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1"
    >
      {{ label }}
    </label>
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        class="w-full bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition-all duration-200 rounded-input py-3.5 pl-4 pr-10 appearance-none cursor-pointer dark:bg-gray-800/50 dark:text-white dark:border-gray-800"
        :class="{ 'border-red-400 focus:ring-red-400': error }"
        @change="onChange"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400 flex items-center">
        <ion-icon :icon="chevronDownOutline" class="text-xl block" />
      </div>
    </div>
    <span
      v-if="error"
      class="text-xs text-red-500 ml-1 font-medium animate-fade-in"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { chevronDownOutline } from "ionicons/icons";

interface Option {
  label: string;
  value: string | number;
}

withDefaults(
  defineProps<{
    modelValue: string | number;
    options: Option[];
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
  }>(),
  {
    placeholder: "",
    disabled: false,
    error: "",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>
