<template>
  <div class="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
    <button
      v-for="filter in filters"
      :key="filter.value"
      type="button"
      class="px-5 py-2.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap btn-press border"
      :class="[
        modelValue === filter.value
          ? 'bg-primary text-white border-primary shadow-sm shadow-primary/30'
          : 'bg-white dark:bg-card-dark text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800'
      ]"
      @click="selectFilter(filter.value)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
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
  { label: "Semua 🗓️", value: "all" as const },
  { label: "Pemasukan 🟢", value: "income" as const },
  { label: "Pengeluaran 🔴", value: "expense" as const },
];

const selectFilter = (val: "all" | "income" | "expense") => {
  emit("update:modelValue", val);
  emit("change", val);
};
</script>
