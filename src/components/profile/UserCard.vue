<template>
  <BaseCard
    padding="lg"
    class="bg-white dark:bg-card-dark text-center flex flex-col items-center relative custom-profile-card"
  >
    <!-- Avatar circle -->
    <div class="relative mb-4">
      <div 
        class="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-extrabold shadow-md border border-primary/10 overflow-hidden"
        :class="photo ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-tint' : 'bg-primary text-white'"
      >
        <img v-if="photo && photo.startsWith('data:image')" :src="photo" class="w-full h-full object-cover" />
        <span v-else-if="photo">{{ photo }}</span>
        <span v-else>{{ name ? name.charAt(0).toUpperCase() : 'P' }}</span>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="w-full flex flex-col items-center justify-center">
      <h2 class="text-xl font-extrabold text-gray-900 dark:text-white truncate max-w-[280px]">
        {{ name || 'Pengguna' }}
      </h2>
      <p class="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-1.5">
        {{ occupation || "Mahasiswa / Personal Finance" }}
      </p>

      <!-- Edit Profil Button -> Navigates to Customization Page -->
      <router-link
        to="/tabs/profile/edit"
        class="mt-4 flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-primary dark:text-primary-tint border border-primary/20 dark:border-primary-tint/20 rounded-full hover:bg-primary/5 transition-colors cursor-pointer"
      >
        <ion-icon :icon="createOutline" class="text-sm" />
        {{ t('profile.customize') }}
      </router-link>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { IonIcon } from "@ionic/vue";
import { createOutline, personCircleOutline } from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";
import { useI18n } from "../../utils/i18n";

const { t } = useI18n();

withDefaults(
  defineProps<{
    name: string;
    photo?: string;
    occupation?: string;
  }>(),
  {
    name: "Pengguna",
    photo: "",
    occupation: "",
  }
);
</script>


<style scoped>
.custom-profile-card {
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
}
</style>
