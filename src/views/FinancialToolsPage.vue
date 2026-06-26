<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-5 pb-32">
        <!-- Page Header -->
        <div class="pt-4 px-1 flex items-center justify-between animate-[fadeIn_0.5s_ease-out]">
          <div>
            <span class="text-xs font-semibold text-primary dark:text-primary-tint uppercase tracking-wider block mb-1">
              {{ t('financial_tools.header_subtitle') }}
            </span>
            <h1 class="text-2xl font-black text-gray-900 dark:text-white">
              {{ t('financial_tools.header_title') }}
            </h1>
          </div>
          <div class="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shrink-0 shadow-sm border border-amber-200 dark:border-amber-800/50">
            <ion-icon :icon="calculatorOutline" />
          </div>
        </div>

        <!-- Segment Selector -->
        <ion-segment
          :value="selectedTool"
          @ionChange="onSegmentChange"
          scrollable
          class="segment-bar"
        >
          <ion-segment-button value="discount">
            <ion-icon :icon="pricetagOutline" />
            <ion-label>{{ t('financial_tools.tab_discount') }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="loan">
            <ion-icon :icon="cardOutline" />
            <ion-label>{{ t('financial_tools.tab_loan') }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="savings">
            <ion-icon :icon="walletOutline" />
            <ion-label>{{ t('financial_tools.tab_savings') }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="interest">
            <ion-icon :icon="trendingUpOutline" />
            <ion-label>{{ t('financial_tools.tab_interest') }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="goal">
            <ion-icon :icon="flagOutline" />
            <ion-label>{{ t('financial_tools.tab_goal') }}</ion-label>
          </ion-segment-button>
          <ion-segment-button value="expense">
            <ion-icon :icon="pieChartOutline" />
            <ion-label>{{ t('financial_tools.tab_expense') }}</ion-label>
          </ion-segment-button>
        </ion-segment>

        <!-- Calculator Views -->
        <div v-if="selectedTool === 'discount'">
          <DiscountCalculator />
        </div>
        <div v-else-if="selectedTool === 'loan'">
          <LoanCalculator />
        </div>
        <div v-else-if="selectedTool === 'savings'">
          <SavingsCalculator />
        </div>
        <div v-else-if="selectedTool === 'interest'">
          <InterestCalculator />
        </div>
        <div v-else-if="selectedTool === 'goal'">
          <SavingGoalCalculator />
        </div>
        <div v-else-if="selectedTool === 'expense'">
          <ExpensePercentageCalculator />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonPage, IonContent, IonIcon, IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";
import { calculatorOutline, pricetagOutline, cardOutline, walletOutline, trendingUpOutline, flagOutline, pieChartOutline } from "ionicons/icons";
import DiscountCalculator from "../components/financial-tools/DiscountCalculator.vue";
import LoanCalculator from "../components/financial-tools/LoanCalculator.vue";
import SavingsCalculator from "../components/financial-tools/SavingsCalculator.vue";
import InterestCalculator from "../components/financial-tools/InterestCalculator.vue";
import SavingGoalCalculator from "../components/financial-tools/SavingGoalCalculator.vue";
import ExpensePercentageCalculator from "../components/financial-tools/ExpensePercentageCalculator.vue";
import { useI18n } from "../utils/i18n";

const { t } = useI18n();

const selectedTool = ref<string>("discount");

const onSegmentChange = (event: CustomEvent) => {
  selectedTool.value = event.detail.value as string;
};
</script>

<style scoped>
.page-container {
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
ion-segment.segment-bar {
  --background: transparent;
  padding: 2px 0;
}
ion-segment-button {
  --color: #9ca3af;
  --color-checked: var(--ion-color-primary);
  --indicator-color: var(--ion-color-primary);
  font-weight: 600;
  font-size: 10px;
  min-width: auto;
  min-height: 44px;
}
ion-segment-button ion-icon {
  font-size: 18px;
  margin-bottom: 2px;
}
ion-segment-button ion-label {
  font-size: 9px;
  margin-top: 0;
}
</style>
