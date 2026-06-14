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
      return "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 focus:ring-gray-400";
    case "danger":
      return "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 shadow-sm shadow-red-500/20";
    case "primary":
    default:
      return "bg-primary hover:bg-primary-dark text-white focus:ring-primary shadow-sm shadow-primary/20";
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      // Fixed: increased padding so button is not thin
      return "px-4 py-2.5 text-sm rounded-full min-h-[40px]";
    case "lg":
      return "px-6 py-4 text-lg rounded-full min-h-[56px]";
    case "md":
    default:
      return "px-6 py-3.5 text-base rounded-full min-h-[48px] w-20";
  }
});

const widthClass = computed(() => (props.full ? "w-full" : ""));
</script>
