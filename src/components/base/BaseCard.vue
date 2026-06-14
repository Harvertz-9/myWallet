<template>
  <div
    class="custom-card overflow-hidden"
    :class="[
      glass ? 'glass-panel shadow-sm' : 'bg-white dark:bg-card-dark shadow-md border border-gray-100 dark:border-gray-800/40',
      paddingClasses
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    glass?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
  }>(),
  {
    glass: false,
    padding: "md",
  }
);

const paddingClasses = computed(() => {
  switch (props.padding) {
    case "none":
      return "p-0";
    case "sm":
      return "p-3";
    case "lg":
      return "p-6";
    case "md":
    default:
      return "p-4";
  }
});
</script>
