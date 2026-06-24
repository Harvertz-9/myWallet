<template>
  <ion-app>
    <ion-router-outlet :key="languageStore.currentLang + '_' + translationVersion" />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { computed } from 'vue';
import { useLanguageStore } from './stores/languageStore';
import { dynamicTranslations } from './utils/i18n';

const languageStore = useLanguageStore();

const translationVersion = computed(() => {
  const lang = languageStore.currentLang;
  return Object.keys(dynamicTranslations[lang] || {}).length;
});

// Dark mode is always on — applied via dark.always.css in main.ts
// and forced via body/html class below at startup
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
  document.documentElement.style.colorScheme = 'dark';
}
</script>

