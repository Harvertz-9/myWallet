<template>
  <div class="card-wrapper rounded-2xl overflow-hidden mb-3">
    <ion-item-sliding
      ref="slidingRef"
      class="custom-sliding-item"
    >

      <!-- Transaction Main Item -->
      <ion-item
        button
        :detail="false"
        lines="none"
        class="transaction-item bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800/40"
        @click="$emit('click', transaction)"
      >
        <div class="flex items-center justify-between w-full py-2.5">
          <!-- Category Icon & Title & Date -->
          <div class="flex items-center gap-3.5 min-w-0">
            <div class="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-2xl shadow-sm border border-gray-100/50 dark:border-gray-800/30">
              {{ getEmoji(transaction.category) }}
            </div>
            <div class="min-w-0">
              <h4 class="text-sm font-bold text-gray-900 dark:text-gray-100 truncate mb-0.5">
                {{ transaction.title }}
              </h4>
              <div class="flex flex-col text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">
                <span class="truncate">{{ getCategoryLabel(transaction.category) }}</span>
                <span class="text-gray-400 dark:text-gray-500 font-normal mt-0.5">{{ formattedDate }}</span>
              </div>
              <p
                v-if="transaction.note"
                class="text-xs text-gray-400 dark:text-gray-500 italic mt-1 truncate max-w-45"
              >
                "{{ transaction.note }}"
              </p>
            </div>
          </div>

          <!-- Price/Amount -->
          <div class="text-right pl-3 flex-shrink-0">
            <p
              class="text-sm font-extrabold whitespace-nowrap"
              :class="transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'"
            >
              {{ transaction.type === 'income' ? '+' : '-' }} {{ formattedAmount }}
            </p>
            <span class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {{ transaction.type === 'income' ? 'Masuk' : 'Keluar' }}
            </span>
          </div>
        </div>
      </ion-item>

      <!-- Right options (Swipe to left) → Edit + Delete -->
      <ion-item-options side="end">
        <ion-item-option
          color="warning"
          class="swipe-option"
          @click="handleEdit"
        >
          <ion-icon :icon="createOutline" slot="icon-only" />
        </ion-item-option>
        <ion-item-option
          color="danger"
          class="swipe-option"
          @click="handleDelete"
        >
          <ion-icon :icon="trashOutline" slot="icon-only" />
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/vue";
import { createOutline, trashOutline } from "ionicons/icons";
import { Transaction } from "../../types/transaction";
import { formatRupiah } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";

const props = defineProps<{
  transaction: Transaction;
}>();

const emit = defineEmits<{
  (e: "click", tx: Transaction): void;
  (e: "edit", tx: Transaction): void;
  (e: "delete", id: string): void;
}>();

const slidingRef = ref<any>(null);

const formattedAmount = computed(() => {
  return formatRupiah(props.transaction.amount);
});

const formattedDate = computed(() => {
  return formatDate(props.transaction.date);
});

const categoryEmojiMap: Record<string, string> = {
  Salary: "💰",
  Bonus: "🎁",
  Freelance: "💻",
  Investment: "📈",
  Gift: "🧸",
  Food: "🍔",
  Transportation: "🚗",
  Shopping: "🛍️",
  Entertainment: "🍿",
  Education: "📚",
  Health: "💊",
  Bills: "⚡",
  Others: "📦",
};

const categoryLabelMap: Record<string, string> = {
  Salary: "Gaji",
  Bonus: "Bonus",
  Freelance: "Freelance",
  Investment: "Investasi",
  Gift: "Hadiah",
  Food: "Makanan",
  Transportation: "Transportasi",
  Shopping: "Belanja",
  Entertainment: "Hiburan",
  Education: "Pendidikan",
  Health: "Kesehatan",
  Bills: "Tagihan",
  Others: "Lainnya",
};

const getEmoji = (category: string) => {
  return categoryEmojiMap[category] || "💸";
};

const getCategoryLabel = (category: string) => {
  return categoryLabelMap[category] || category;
};

/** Closes the sliding item safely, handling Vue proxy wrapping */
const closeSlidingItem = () => {
  const el = slidingRef.value?.$el ?? slidingRef.value;
  if (el && typeof el.close === "function") {
    el.close();
  }
};

const handleEdit = () => {
  closeSlidingItem();
  emit("edit", props.transaction);
};

const handleDelete = () => {
  closeSlidingItem();
  emit("delete", props.transaction.id);
};
</script>

<style scoped>
/* Isolate each card so swipe doesn't trigger layout on siblings */
.card-wrapper {
  contain: layout style;
}

/* Remove standard padding or lines of ion-item */
ion-item {
  --inner-padding-end: 0;
  --padding-start: 12px;
  --padding-end: 12px;
}

/* Ensure sliding item fills width and gestures are captured correctly */
.custom-sliding-item {
  display: block;
  width: 100%;
}

/* Unified swipe option styling - no gaps, no rounding */
.swipe-option {
  --border-radius: 0;
  border-radius: 0;
  font-weight: 700;
  font-size: 1.25rem;
  min-width: 56px;
}
</style>
