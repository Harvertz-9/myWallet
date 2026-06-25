<template>
  <div class="flex gap-3 overflow-x-auto no-scrollbar py-1.5">
    <button
      v-for="filter in filters"
      :key="filter.value"
      type="button"
      class="h-9 w-full text-sm font-bold rounded transition-all duration-200 cursor-pointer whitespace-nowrap btn-press border flex items-center justify-center"
      :class="[
        modelValue === filter.value
          ? 'bg-primary text-white border-primary shadow-md shadow-primary/25'
          : 'bg-white dark:bg-card-dark text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
      ]"
      @click="selectFilter(filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: "all" | "income" | "expense";
  }>(),
  {
    modelValue: "all",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: "all" | "income" | "expense"): void;
  (e: "change", value: "all" | "income" | "expense"): void;
}>();

const filters = [
  { label: "Semua", value: "all" as const },
  { label: "Pemasukan", value: "income" as const },
  { label: "Pengeluaran", value: "expense" as const },
];

const selectFilter = (val: "all" | "income" | "expense") => {
  emit("update:modelValue", val);
  emit("change", val);
};
</script>
