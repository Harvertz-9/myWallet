<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

// Dark mode is always on — applied via dark.always.css in main.ts
// and forced via body/html class below at startup
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
  document.documentElement.style.colorScheme = 'dark';
}
</script>


