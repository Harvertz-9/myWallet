<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-between gap-3 pt-2"
  >
    <!-- Prev Button -->
    <button
      type="button"
      :disabled="currentPage <= 1"
      class="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
      :class="currentPage > 1
        ? 'bg-white dark:bg-card-dark border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
        : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-800 text-gray-400'"
      @click="$emit('page-change', currentPage - 1)"
    >
      <ion-icon :icon="chevronBackOutline" class="text-base" />
    </button>

    <!-- Page Info -->
    <div class="flex items-center gap-1.5">
      <template v-for="page in displayedPages" :key="page">
        <span
          v-if="page === '...'"
          class="px-1 text-gray-400 dark:text-gray-500 text-sm font-medium"
        >
          ...
        </span>
        <button
          v-else
          type="button"
          class="w-9 h-9 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer"
          :class="page === currentPage
            ? 'bg-primary text-white shadow-sm shadow-primary/30'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
          @click="$emit('page-change', page as number)"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      type="button"
      :disabled="currentPage >= totalPages"
      class="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
      :class="currentPage < totalPages
        ? 'bg-white dark:bg-card-dark border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
        : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-800 text-gray-400'"
      @click="$emit('page-change', currentPage + 1)"
    >
      <ion-icon :icon="chevronForwardOutline" class="text-base" />
    </button>
  </div>

  <!-- Page Summary -->
  <p
    v-if="totalPages > 1"
    class="text-xs text-center text-gray-400 dark:text-gray-500 font-medium mt-1"
  >
    Halaman {{ currentPage }} dari {{ totalPages }} • {{ totalItems }} transaksi
  </p>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IonIcon } from "@ionic/vue";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
}>();

defineEmits<{
  (e: "page-change", page: number): void;
}>();

// Smart page number display: show ellipsis for large page counts
const displayedPages = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  const pages: (number | string)[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);
  if (current > 3) pages.push("...");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);

  return pages;
});
</script>
