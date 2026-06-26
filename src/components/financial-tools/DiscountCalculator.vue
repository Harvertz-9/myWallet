<template>
  <ion-card class="tool-card">
    <ion-card-header>
      <div class="flex items-center gap-3 mx-5">
        <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
          <ion-icon :icon="pricetagOutline" class="text-xl" />
        </div>
        <div class="py-3">
          <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-0.5">
            {{ t('financial_tools.discount_sub') }}
          </span>
          <ion-card-title class="text-lg font-bold text-gray-900 dark:text-white p-0!">
            {{ t('financial_tools.discount_title') }}
          </ion-card-title>
        </div>
      </div>
    </ion-card-header>

    <ion-card-content class="space-y-5">
      <ion-grid class="p-0!">
        <ion-row>
          <ion-col size="12" size-md="6">
            <ion-item class="input-item" lines="none">
              <ion-label position="stacked" class="input-label">
                {{ t('financial_tools.original_price') }}
              </ion-label>
              <ion-input
                type="number"
                v-model="originalPrice"
                placeholder="0"
                fill="outline"
                class="input-field"
              />
            </ion-item>
          </ion-col>
          <ion-col size="12" size-md="6">
            <ion-item class="input-item" lines="none">
              <ion-label position="stacked" class="input-label">
                {{ t('financial_tools.discount_percent') }}
              </ion-label>
              <ion-input
                type="number"
                v-model="discountPercent"
                placeholder="0"
                fill="outline"
                class="input-field"
              />
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>

      <p v-if="validationError" class="text-xs font-semibold text-red-500 dark:text-red-400 px-0.5">
        {{ validationError }}
      </p>

      <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {{ t('financial_tools.discount_amount') }}
          </span>
          <span class="text-sm font-extrabold text-green-600 dark:text-green-400">
            {{ discountAmountDisplay }}
          </span>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-700 pt-3 flex items-center justify-between">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {{ t('financial_tools.final_price') }}
          </span>
          <span class="text-base font-extrabold text-primary dark:text-primary-tint">
            {{ finalPriceDisplay }}
          </span>
        </div>
      </div>

      <ion-button expand="block" fill="outline" color="medium" @click="reset">
        {{ t('financial_tools.reset') }}
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { pricetagOutline } from "ionicons/icons";
import { formatRupiah } from "../../utils/currencyFormatter";
import { useI18n } from "../../utils/i18n";

const { t } = useI18n();

const originalPrice = ref<string>("");
const discountPercent = ref<string>("");

const priceNum = computed(() => parseFloat(originalPrice.value));
const percentNum = computed(() => parseFloat(discountPercent.value));

const isInputValid = computed(() => {
  if (originalPrice.value === "" || discountPercent.value === "") return false;
  if (isNaN(priceNum.value) || isNaN(percentNum.value)) return false;
  if (priceNum.value <= 0) return false;
  if (percentNum.value < 0 || percentNum.value > 100) return false;
  return true;
});

const validationError = computed(() => {
  if (originalPrice.value === "" || discountPercent.value === "") return "";
  if (isNaN(priceNum.value) || isNaN(percentNum.value)) return "Harap masukkan angka yang valid";
  if (priceNum.value <= 0) return "Harga harus lebih dari 0";
  if (percentNum.value < 0 || percentNum.value > 100) return "Diskon harus antara 0 sampai 100";
  return "";
});

const discountAmount = computed(() => {
  if (!isInputValid.value) return 0;
  return priceNum.value * percentNum.value / 100;
});

const finalPrice = computed(() => {
  if (!isInputValid.value) return 0;
  return priceNum.value - discountAmount.value;
});

const discountAmountDisplay = computed(() => {
  if (!isInputValid.value) return "-";
  return formatRupiah(discountAmount.value);
});

const finalPriceDisplay = computed(() => {
  if (!isInputValid.value) return "-";
  return formatRupiah(finalPrice.value);
});

const reset = () => {
  originalPrice.value = "";
  discountPercent.value = "";
};
</script>

<style scoped>
ion-card.tool-card {
  margin: 0;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
:root.dark ion-card.tool-card {
  border-color: rgba(255, 255, 255, 0.05);
}
ion-card-header {
  padding-bottom: 0;
}
ion-card-header ion-card-title {
  margin: 0;
}
ion-item.input-item {
  --inner-padding-end: 0;
  --padding-start: 0;
  --min-height: 60px;
}
ion-label.input-label {
  font-size: 14px !important;
  font-weight: 700 !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9ca3af !important;
  margin-bottom: 4px !important;
}
ion-input.input-field {
  --background: #f3f4f6;
  --border-color: transparent;
  --border-radius: 14px;
  --border-width: 2px;
  --padding-start: 14px;
  --padding-end: 14px;
  --padding-top: 14px;
  --padding-bottom: 14px;
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  --highlight-color-focused: var(--ion-color-primary);
  --box-shadow: none;
  transition: --background 0.2s ease;
}
:root.dark ion-input.input-field {
  --background: rgba(55, 65, 81, 0.4);
  color: #f3f4f6;
}
ion-input.input-field:focus-within {
  --background: #e5e7eb;
}
:root.dark ion-input.input-field:focus-within {
  --background: rgba(55, 65, 81, 0.7);
}
</style>
