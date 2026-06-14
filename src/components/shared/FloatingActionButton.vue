<template>
  <ion-fab
    slot="fixed"
    vertical="bottom"
    horizontal="end"
    class="mb-6 mr-4 pointer-events-auto"
  >
    <ion-fab-button
      color="primary"
      class="btn-press shadow-lg"
      @click="$emit('click')"
    >
      <ion-icon
        :icon="add"
        class="text-3xl block"
      />
    </ion-fab-button>
  </ion-fab>
</template>

<script setup lang="ts">
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";
import { add } from "ionicons/icons";

defineEmits<{
  (e: "click"): void;
}>();
</script>

<style scoped>
ion-fab-button {
  --box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.4), 0 4px 6px -4px rgba(16, 185, 129, 0.2);
  --border-radius: 16px;
  width: 56px;
  height: 56px;
}
</style>
