<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="space-y-6 pb-24">
        <!-- Header Profile Greeting -->
        <div class="flex items-center justify-between pt-4 px-1">
          <div>
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              {{ todayString }}
            </span>
            <h1 class="text-2xl font-black text-gray-900 dark:text-white">
              {{ greeting }}, {{ profileStore.name }}!
            </h1>
          </div>
          <!-- Avatar Clickable -> Navigates to Profile -->
          <router-link
            to="/tabs/profile"
            class="w-11 h-11 rounded-2xl bg-primary/10 text-primary dark:bg-primary/5 flex items-center justify-center text-lg font-bold border border-primary/10 shadow-sm"
          >
            {{ profileStore.name.charAt(0).toUpperCase() }}
          </router-link>
        </div>

        <!-- Balance Card -->
        <BalanceCard :balance="transactionStore.balance" />

        <!-- Income & Expense Summary Grid -->
        <div class="grid grid-cols-2 gap-3">
          <IncomeCard :income="transactionStore.totalIncome" />
          <ExpenseCard :expense="transactionStore.totalExpense" />
        </div>

        <!-- Recent Transactions -->
        <RecentTransactions
          :transactions="transactionStore.recentTransactions"
          @select="openEditModal"
        />
      </div>

      <!-- Add FAB -->
      <FloatingActionButton @click="isAddModalOpen = true" />

      <!-- Add Transaction Modal -->
      <AddTransactionModal
        :is-open="isAddModalOpen"
        @close="isAddModalOpen = false"
        @save="handleAddTransaction"
      />

      <!-- Edit Transaction Modal -->
      <EditTransactionModal
        :is-open="isEditModalOpen"
        :transaction="selectedTransaction"
        @close="closeEditModal"
        @update="handleUpdateTransaction"
      />

      <!-- Toast Feedbacks -->
      <ToastMessage
        :is-open="toast.show"
        :message="toast.message"
        :color="toast.color"
        @dismiss="toast.show = false"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import BalanceCard from "../components/dashboard/BalanceCard.vue";
import IncomeCard from "../components/dashboard/IncomeCard.vue";
import ExpenseCard from "../components/dashboard/ExpenseCard.vue";
import RecentTransactions from "../components/dashboard/RecentTransactions.vue";
import FloatingActionButton from "../components/shared/FloatingActionButton.vue";
import AddTransactionModal from "../components/forms/AddTransactionModal.vue";
import EditTransactionModal from "../components/forms/EditTransactionModal.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import { useTransactionStore } from "../stores/transactionStore";
import { useProfileStore } from "../stores/profileStore";
import { Transaction } from "../types/transaction";
import { formatDate } from "../utils/dateFormatter";

const transactionStore = useTransactionStore();
const profileStore = useProfileStore();

// Modal States
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedTransaction = ref<Transaction | null>(null);

// Toast States
const toast = ref({
  show: false,
  message: "",
  color: "success" as "success" | "danger",
});

const triggerToast = (message: string, color: "success" | "danger" = "success") => {
  toast.value.message = message;
  toast.value.color = color;
  toast.value.show = true;
};

// Life Cycles
onMounted(() => {
  transactionStore.loadTransactions();
  profileStore.loadProfile();
});

// Dynamic Greeting based on current hour
const greeting = computed(() => {
  const hr = new Date().getHours();
  if (hr < 11) return "Selamat Pagi";
  if (hr < 15) return "Selamat Siang";
  if (hr < 19) return "Selamat Sore";
  return "Selamat Malam";
});

// Format Date e.g. Minggu, 14 Juni 2026
const todayString = computed(() => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const dayName = days[new Date().getDay()];
  const dateFormatted = formatDate(new Date().toLocaleDateString("en-CA"));
  return `${dayName}, ${dateFormatted}`;
});

// Actions
const handleAddTransaction = (newTx: Transaction) => {
  try {
    transactionStore.addTransaction(newTx);
    isAddModalOpen.value = false;
    triggerToast("Transaksi berhasil ditambahkan.");
  } catch (error) {
    triggerToast("Gagal menyimpan transaksi", "danger");
  }
};

const openEditModal = (tx: Transaction) => {
  selectedTransaction.value = tx;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  selectedTransaction.value = null;
  isEditModalOpen.value = false;
};

const handleUpdateTransaction = (updatedTx: Transaction) => {
  try {
    transactionStore.updateTransaction(updatedTx);
    closeEditModal();
    triggerToast("Transaksi berhasil diperbarui.");
  } catch (error) {
    triggerToast("Gagal memperbarui transaksi", "danger");
  }
};
</script>
