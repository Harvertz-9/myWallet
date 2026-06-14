<template>
  <BaseSelect
    :model-value="modelValue"
    :options="categoryOptions"
    label="Kategori"
    placeholder="Pilih Kategori"
    :error="error"
    @update:model-value="onSelect"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseSelect from "../base/BaseSelect.vue";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    type: "income" | "expense";
    error?: string;
  }>(),
  {
    error: "",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const INCOME_CATEGORIES = [
  { label: "Gaji 💰", value: "Salary" },
  { label: "Bonus 🎁", value: "Bonus" },
  { label: "Freelance 💻", value: "Freelance" },
  { label: "Investasi 📈", value: "Investment" },
  { label: "Hadiah 🧸", value: "Gift" },
  { label: "Lainnya 🛒", value: "Others" },
];

const EXPENSE_CATEGORIES = [
  { label: "Makanan 🍔", value: "Food" },
  { label: "Transportasi 🚗", value: "Transportation" },
  { label: "Belanja 🛍️", value: "Shopping" },
  { label: "Hiburan 🍿", value: "Entertainment" },
  { label: "Pendidikan 📚", value: "Education" },
  { label: "Kesehatan 💊", value: "Health" },
  { label: "Tagihan ⚡", value: "Bills" },
  { label: "Lainnya 📦", value: "Others" },
];

const categoryOptions = computed(() => {
  return props.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
});

const onSelect = (val: string | number) => {
  emit("update:modelValue", String(val));
};
</script>
