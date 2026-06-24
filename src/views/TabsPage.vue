<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <!-- Dashboard Tab -->
        <ion-tab-button tab="dashboard" href="/tabs/dashboard">
          <ion-icon aria-hidden="true" :icon="wallet" />
          <ion-label>{{ t('tab.dashboard') }}</ion-label>
        </ion-tab-button>

        <!-- Transactions Tab -->
        <ion-tab-button tab="transactions" href="/tabs/transactions">
          <ion-icon aria-hidden="true" :icon="receipt" />
          <ion-label>{{ t('tab.transactions') }}</ion-label>
        </ion-tab-button>

        <!-- Statistics Tab -->
        <ion-tab-button tab="statistics" href="/tabs/statistics">
          <ion-icon aria-hidden="true" :icon="pieChart" />
          <ion-label>{{ t('tab.statistics') }}</ion-label>
        </ion-tab-button>

        <!-- Profile Tab -->
        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="personCircle" />
          <ion-label>{{ t('tab.profile') }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { wallet, receipt, pieChart, personCircle } from "ionicons/icons";
import { useI18n } from "../utils/i18n";

const { t } = useI18n();
</script>

<style scoped>
ion-tab-bar {
  --border: 1px solid rgba(0, 0, 0, 0.05);
  height: 64px;
}
.dark ion-tab-bar {
  --border: 1px solid rgba(255, 255, 255, 0.05);
}
ion-tab-button {
  --color-selected: var(--ion-color-primary);
  font-weight: 600;
  font-size: 10px;
}
</style>
