<template>
  <div class="flex flex-col w-full gap-1.5">
    <label
      v-if="label"
      class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1"
    >
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <span class="absolute left-4 text-xl font-bold text-primary dark:text-primary">
        Rp
      </span>
      <input
        type="number"
        pattern="[0-9]*"
        inputmode="numeric"
        :value="modelValue || ''"
        placeholder="0"
        class="w-full bg-gray-50 border border-gray-200 text-gray-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-input py-4 pl-12 pr-4 text-xl font-bold dark:bg-gray-800/50 dark:text-white dark:border-gray-800 transition-all duration-200"
        :class="{ 'border-red-400 focus:ring-red-400': error }"
        @input="onInput"
      />
    </div>
    <!-- Real-time formatted helper text -->
    <span
      v-if="modelValue"
      class="text-xs text-primary dark:text-primary-tint ml-1 font-medium"
    >
      Terbilang: {{ formattedAmount }}
    </span>
    <span
      v-if="error"
      class="text-xs text-red-500 ml-1 font-medium animate-fade-in"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatRupiah } from "../../utils/currencyFormatter";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    label?: string;
    error?: string;
  }>(),
  {
    label: "Nominal",
    error: "",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const formattedAmount = computed(() => {
  return formatRupiah(props.modelValue);
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const num = target.value !== "" ? Number(target.value) : 0;
  emit("update:modelValue", num);
};
</script>
