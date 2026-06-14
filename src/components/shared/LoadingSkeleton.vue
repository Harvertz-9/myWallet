<template>
  <div class="animate-pulse space-y-4 w-full">
    <!-- Card Skeleton -->
    <div
      v-if="type === 'card'"
      class="bg-white dark:bg-card-dark rounded-card p-5 border border-gray-100 dark:border-gray-800/40"
    >
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
      <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
      <div class="flex gap-2">
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>

    <!-- List Skeleton -->
    <div
      v-else-if="type === 'list'"
      class="space-y-3"
    >
      <div
        v-for="i in count"
        :key="i"
        class="flex items-center justify-between p-4 bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800/40"
      >
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
        <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
      </div>
    </div>

    <!-- Chart Skeleton -->
    <div
      v-else-if="type === 'chart'"
      class="bg-white dark:bg-card-dark rounded-card p-5 border border-gray-100 dark:border-gray-800/40 flex flex-col items-center justify-center min-h-[200px]"
    >
      <div class="w-40 h-40 rounded-full border-8 border-gray-100 dark:border-gray-800 flex items-center justify-center">
        <div class="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "card" | "list" | "chart";
    count?: number;
  }>(),
  {
    type: "list",
    count: 3,
  }
);
</script>
