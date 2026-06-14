<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="space-y-6 pb-20">
        <!-- Page Header -->
        <div class="pt-4 px-1">
          <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Pengaturan Aplikasi
          </span>
          <h1 class="text-2xl font-black text-gray-900 dark:text-white">
            Profil & Kustomisasi
          </h1>
        </div>

        <!-- User Profile Card -->
        <UserCard
          :name="profileStore.name"
          @update:name="handleUpdateName"
        />

        <!-- Dark Mode Toggle -->
        <ThemeToggle
          :dark-mode="themeStore.darkMode"
          @toggle="handleToggleTheme"
        />

        <!-- Reset Button -->
        <ResetDataButton @reset="promptReset" />

        <!-- App Information Card -->
        <BaseCard
          padding="md"
          class="bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800/40"
        >
          <h3 class="text-sm font-bold text-gray-950 dark:text-white mb-3 flex items-center gap-1.5">
            <ion-icon :icon="informationCircleOutline" class="text-lg text-primary" />
            Tentang Aplikasi
          </h3>
          <div class="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
            <div class="flex justify-between font-medium">
              <span>Nama Aplikasi</span>
              <span class="font-bold text-gray-900 dark:text-white">MyWallet</span>
            </div>
            <div class="flex justify-between font-medium">
              <span>Versi</span>
              <span class="font-bold text-gray-900 dark:text-white">1.0 (MVP)</span>
            </div>
            <div class="flex justify-between font-medium">
              <span>Developer</span>
              <span class="font-bold text-gray-900 dark:text-white">Antigravity AI</span>
            </div>
            <div class="border-t border-gray-100 dark:border-gray-800 pt-2.5 mt-1">
              <p class="font-semibold text-gray-900 dark:text-white mb-1">Teknologi:</p>
              <p class="text-[10px] leading-relaxed text-gray-500">
                Ionic Vue, TypeScript, Pinia State Management, TailwindCSS, Chart.js, LocalStorage.
              </p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Reset Confirmation Modal -->
      <ConfirmationModal
        :is-open="isResetConfirmOpen"
        title="Reset Seluruh Data?"
        message="Tindakan ini akan menghapus semua riwayat transaksi keuangan dan mereset profil Anda kembali ke setelan pabrik. Tindakan ini tidak dapat dibatalkan."
        @confirm="confirmReset"
        @cancel="isResetConfirmOpen = false"
      />

      <!-- Toast Messages -->
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
import { ref, onMounted } from "vue";
import { IonPage, IonContent, IonIcon } from "@ionic/vue";
import { informationCircleOutline } from "ionicons/icons";
import UserCard from "../components/profile/UserCard.vue";
import ThemeToggle from "../components/profile/ThemeToggle.vue";
import ResetDataButton from "../components/profile/ResetDataButton.vue";
import ConfirmationModal from "../components/shared/ConfirmationModal.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import BaseCard from "../components/base/BaseCard.vue";
import { useProfileStore } from "../stores/profileStore";
import { useThemeStore } from "../stores/themeStore";
import { useTransactionStore } from "../stores/transactionStore";

const profileStore = useProfileStore();
const themeStore = useThemeStore();
const transactionStore = useTransactionStore();

const isResetConfirmOpen = ref(false);

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

// Lifecycle
onMounted(() => {
  profileStore.loadProfile();
  themeStore.loadTheme();
});

// Update profile name
const handleUpdateName = (newName: string) => {
  try {
    profileStore.setName(newName);
    triggerToast(`Nama profil diubah menjadi "${newName}".`);
  } catch (error) {
    triggerToast("Gagal mengubah nama profil.", "danger");
  }
};

// Toggle Theme dark/light mode
const handleToggleTheme = () => {
  try {
    themeStore.toggleTheme();
    const mode = themeStore.darkMode ? "Gelap" : "Terang";
    triggerToast(`Tema berubah ke mode ${mode}.`);
  } catch (error) {
    triggerToast("Gagal mengubah tema.", "danger");
  }
};

// Reset Prompt
const promptReset = () => {
  isResetConfirmOpen.value = true;
};

// Reset Database execution
const confirmReset = () => {
  try {
    transactionStore.clearTransactions();
    profileStore.resetProfile();
    themeStore.disableDarkMode();
    triggerToast("Data berhasil direset.");
  } catch (error) {
    triggerToast("Gagal mereset data.", "danger");
  } finally {
    isResetConfirmOpen.value = false;
  }
};
</script>
