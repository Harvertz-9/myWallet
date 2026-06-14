<template>
  <div class="flex flex-col w-full gap-1.5">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1"
    >
      {{ label }}
    </label>
    <div class="relative flex items-center">
      <div
        v-if="$slots.icon"
        class="absolute left-4 text-gray-400 dark:text-gray-500 pointer-events-none"
      >
        <slot name="icon"></slot>
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        class="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition-all duration-200 rounded-input py-3.5"
        :class="[
          $slots.icon ? 'pl-11 pr-4' : 'px-4',
          error ? 'border-red-400 focus:ring-red-400' : 'focus:ring-primary border-gray-200 dark:border-gray-800',
          disabled ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50',
          'dark:text-white dark:placeholder-gray-600'
        ]"
        @input="onInput"
        @blur="$emit('blur', $event)"
      />
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
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    label?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    maxlength?: number;
    id?: string;
  }>(),
  {
    type: "text",
    placeholder: "",
    disabled: false,
    error: "",
    id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "blur", event: FocusEvent): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let val: string | number = target.value;
  if (props.type === "number") {
    val = val !== "" ? Number(val) : "";
  }
  emit("update:modelValue", val);
};
</script>
