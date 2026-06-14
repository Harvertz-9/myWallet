<template>
  <button
    :type="type"
    :disabled="disabled"
    class="flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    :class="[variantClasses, sizeClasses, widthClass]"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left"></slot>
    <span :class="{ 'ml-2': $slots['icon-left'], 'mr-2': $slots['icon-right'] }">
      <slot></slot>
    </span>
    <slot name="icon-right"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    full?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: "button",
    variant: "primary",
    size: "md",
    full: false,
    disabled: false,
  }
);

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 focus:ring-gray-400";
    case "danger":
      return "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400";
    case "primary":
    default:
      return "bg-primary hover:bg-primary-dark text-white focus:ring-primary";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1.5 text-sm rounded-xl";
    case "lg":
      return "px-6 py-3.5 text-lg rounded-2xl";
    case "md":
    default:
      return "px-5 py-3 text-base rounded-2xl";
  }
});

const widthClass = computed(() => (props.full ? "w-full" : ""));
</script>
