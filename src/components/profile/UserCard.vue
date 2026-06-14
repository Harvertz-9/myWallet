<template>
  <BaseCard
    padding="lg"
    class="bg-white dark:bg-card-dark text-center flex flex-col items-center relative custom-profile-card"
  >
    <!-- Avatar circle -->
    <div class="relative mb-4">
      <div class="w-20 h-20 rounded-full bg-primary/15 dark:bg-primary/10 text-primary dark:text-primary-tint flex items-center justify-center text-4xl font-extrabold shadow-inner border border-primary/10">
        {{ name.charAt(0).toUpperCase() }}
      </div>
      <div class="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full border-2 border-white dark:border-card-dark">
        <ion-icon :icon="personCircleOutline" class="text-xs block" />
      </div>
    </div>

    <!-- Edit Name Flow -->
    <div class="w-full flex flex-col items-center justify-center min-h-[44px]">
      <div
        v-if="!isEditing"
        class="flex items-center gap-2"
      >
        <h2 class="text-xl font-extrabold text-gray-900 dark:text-white truncate max-w-[180px]">
          {{ name }}
        </h2>
        <button
          type="button"
          class="text-gray-400 hover:text-primary dark:hover:text-primary-tint p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
          @click="startEdit"
        >
          <ion-icon :icon="createOutline" class="text-sm block" />
        </button>
      </div>
      
      <div
        v-else
        class="flex items-center gap-2 w-full max-w-[200px]"
      >
        <input
          ref="inputRef"
          v-model="editValue"
          type="text"
          maxlength="20"
          class="flex-1 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center"
          @keyup.enter="saveName"
          @blur="saveName"
        />
        <button
          type="button"
          class="bg-primary text-white p-2 rounded-xl btn-press cursor-pointer flex items-center justify-center shadow-md shadow-primary/20 shrink-0"
          @mousedown.prevent="saveName"
        >
          <ion-icon :icon="checkmarkOutline" class="text-sm block font-extrabold" />
        </button>
      </div>
    </div>

    <p class="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-1.5">
      Mahasiswa / Personal Finance
    </p>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { IonIcon } from "@ionic/vue";
import { createOutline, checkmarkOutline, personCircleOutline } from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";

const props = withDefaults(
  defineProps<{
    name: string;
    photo?: string;
  }>(),
  {
    name: "Bryan",
    photo: "",
  }
);

const emit = defineEmits<{
  (e: "update:name", newName: string): void;
}>();

const isEditing = ref(false);
const editValue = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

const startEdit = () => {
  editValue.value = props.name;
  isEditing.value = true;
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
      inputRef.value.select();
    }
  });
};

const saveName = () => {
  if (!isEditing.value) return;
  const trimmed = editValue.value.trim();
  if (trimmed && trimmed !== props.name) {
    emit("update:name", trimmed);
  }
  isEditing.value = false;
};
</script>

<style scoped>
.custom-profile-card {
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
}
</style>
