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
        :max="MAX_AMOUNT"
        :min="0"
        placeholder="0"
        class="w-full bg-gray-50 border border-gray-200 text-gray-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-input py-4 pl-12 pr-4 text-xl font-bold dark:bg-gray-800/50 dark:text-white dark:border-gray-800 transition-all duration-200"
        :class="{ 'border-red-400 focus:ring-red-400': error || limitError }"
        @input="onInput"
      />
    </div>

    <!-- Real-time formatted helper text -->
    <span
      v-if="modelValue && !limitError"
      class="text-xs text-primary dark:text-primary-tint ml-1 font-medium"
    >
      Terbilang: {{ formattedAmount }}
    </span>

    <!-- Limit warning -->
    <span
      v-if="limitError"
      class="text-xs text-amber-500 ml-1 font-medium flex items-center gap-1"
    >
      ⚠️ {{ limitError }}
    </span>

    <!-- Validation error -->
    <span
      v-if="error"
      class="text-xs text-red-500 ml-1 font-medium animate-fade-in"
    >
      {{ error }}
    </span>

    <!-- Max hint -->
    <span class="text-[11px] text-gray-400 dark:text-gray-500 ml-1 font-medium">
      Maks: {{ formattedMax }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { formatRupiah } from "../../utils/currencyFormatter";

// Maximum allowed transaction amount: 999 billion
const MAX_AMOUNT = 999_999_999_999;

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

const limitError = ref("");

const formattedAmount = computed(() => {
  return formatRupiah(props.modelValue);
});

const formattedMax = computed(() => formatRupiah(MAX_AMOUNT));

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let num = target.value !== "" ? Number(target.value) : 0;

  limitError.value = "";

  if (num < 0) {
    num = 0;
    target.value = "0";
  }

  if (num > MAX_AMOUNT) {
    num = MAX_AMOUNT;
    target.value = String(MAX_AMOUNT);
    limitError.value = `Nominal maksimal adalah ${formatRupiah(MAX_AMOUNT)}`;
  }

  emit("update:modelValue", num);
};
</script>
