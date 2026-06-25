<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
      {{ label }}
    </label>
    <div class="relative">
      <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary pointer-events-none">
        <ion-icon :icon="calendarOutline" class="text-lg block" />
      </div>
      <select
        :value="modelValue"
        class="w-full appearance-none bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold rounded-2xl py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer min-h-12"
        @change="onchange"
      >
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <div class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <ion-icon :icon="chevronDownOutline" class="text-base block" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { calendarOutline, chevronDownOutline } from "ionicons/icons";

export type TimeFilterValue =
  | "all"
  | "today"
  | "this_week"
  | "this_month"
  | "last_3_months"
  | "last_6_months"
  | "this_year"
  | "last_year";

withDefaults(
  defineProps<{
    modelValue: TimeFilterValue;
    label?: string;
  }>(),
  {
    label: "Periode",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: TimeFilterValue): void;
}>();

const options: { label: string; value: TimeFilterValue }[] = [
  { label: "Semua Waktu", value: "all" },
  { label: "Hari Ini", value: "today" },
  { label: "Minggu Ini", value: "this_week" },
  { label: "Bulan Ini", value: "this_month" },
  { label: "3 Bulan Terakhir", value: "last_3_months" },
  { label: "6 Bulan Terakhir", value: "last_6_months" },
  { label: "Tahun Ini", value: "this_year" },
  { label: "Tahun Lalu", value: "last_year" },
];

const onchange = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLSelectElement).value as TimeFilterValue);
};
</script>
