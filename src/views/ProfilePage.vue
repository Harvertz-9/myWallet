<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-5 pb-20">
        <!-- Page Header -->
        <div class="pt-4 px-1 flex items-center justify-between animate-[fadeIn_0.5s_ease-out]">
          <div>
            <span class="text-xs font-semibold text-primary dark:text-primary-tint uppercase tracking-wider block mb-1">
              {{ t('profile.header_subtitle') }}
            </span>
            <h1 class="text-2xl font-black text-gray-900 dark:text-white">
              {{ t('profile.header_title') }}
            </h1>
          </div>
          <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xl shrink-0 shadow-sm border border-orange-200 dark:border-orange-800/50">
            <ion-icon :icon="settingsOutline" />
          </div>
        </div>


        <!-- User Profile Card -->
        <UserCard
          :name="profileStore.name"
          :photo="profileStore.photo"
          :occupation="profileStore.occupation"
        />

        <!-- App Language / Bahasa Aplikasi (Clickable Navigation Row) -->
        <BaseCard
          padding="md"
          class="bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800/40 cursor-pointer active:scale-[0.98] transition-transform duration-150"
          @click="isLanguageModalOpen = true"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="bg-blue-100 dark:bg-blue-950/30 p-3 rounded-xl text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <ion-icon :icon="languageOutline" class="text-xl block" />
              </div>
              <div class="min-w-0">
                <p class="text-sm font-bold text-gray-950 dark:text-white">{{ t('language.title') }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                  {{ t('language.desc') }}
                </p>
              </div>
            </div>
            
            <!-- Current Language Indicator + Chevron -->
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-xs font-bold text-primary dark:text-primary-tint bg-primary/10 dark:bg-primary/20 px-2.5 py-1 rounded-lg">
                {{ currentLang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN' }}
              </span>
              <ion-icon :icon="chevronForwardOutline" class="text-gray-400 dark:text-gray-500 text-lg" />
            </div>
          </div>
        </BaseCard>

        <!-- Reset Button -->
        <ResetDataButton @reset="promptReset" />

        <!-- Logged-in User Info -->
        <BaseCard
          v-if="authStore.currentUser"
          padding="md"
          class="bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800/40"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <ion-icon :icon="personCircleOutline" class="text-xl text-primary" />
            </div>
            <div>
              <p class="text-sm font-bold text-gray-900 dark:text-white">{{ authStore.currentUser.name }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ authStore.currentUser.email }}</p>
            </div>
          </div>
          <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-3">
            Login sejak {{ formatLoginTime(authStore.currentUser.loggedInAt) }}
          </p>
        </BaseCard>

        <!-- Logout Button -->
        <BaseCard
          padding="md"
          class="bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800/40"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="bg-orange-100 dark:bg-orange-950/30 p-3 rounded-xl text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                <ion-icon :icon="logOutOutline" class="text-xl block" />
              </div>
              <div class="min-w-0">
                <p class="text-sm font-bold text-gray-950 dark:text-white">{{ t('profile.logout_title') }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                  {{ t('profile.logout_desc') }}
                </p>
              </div>
            </div>
            <BaseButton
              variant="secondary"
              size="md"
              class="shrink-0 text-orange-600! border! border-orange-200! dark:border-orange-800/40! dark:text-orange-400!"
              @click="promptLogout"
            >
              {{ t('profile.logout_btn') }}
            </BaseButton>
          </div>
        </BaseCard>
      </div>

      <!-- Reset Confirmation Modal -->
      <ConfirmationModal
        :is-open="isResetConfirmOpen"
        :title="t('profile.reset_confirm_title')"
        :message="t('profile.reset_confirm_msg')"
        @confirm="confirmReset"
        @cancel="isResetConfirmOpen = false"
      />

      <!-- Logout Confirmation Modal -->
      <ConfirmationModal
        :is-open="isLogoutConfirmOpen"
        :title="t('profile.logout_confirm_title')"
        :message="t('profile.logout_confirm_msg')"
        @confirm="confirmLogout"
        @cancel="isLogoutConfirmOpen = false"
      />


      <!-- Language Selection Bottom Sheet Modal -->
      <BaseModal
        :is-open="isLanguageModalOpen"
        :title="t('language.title')"
        :breakpoint="0.40"
        @close="isLanguageModalOpen = false"
      >
        <div class="space-y-3 relative">
          <!-- Loading Overlay -->
          <div
            v-if="languageStore.isLoadingTranslations"
            class="absolute inset-0 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-[1px] flex flex-col items-center justify-center rounded-2xl z-10 animate-fade-in"
          >
            <div class="w-8 h-8 rounded-full border-3 border-primary/20 border-t-primary animate-spin mb-2"></div>
            <p class="text-xs font-bold text-gray-700 dark:text-gray-300">
              Menerjemahkan teks...
            </p>
          </div>

          <!-- Bahasa Indonesia Option -->
          <button
            type="button"
            :disabled="languageStore.isLoadingTranslations"
            class="w-full flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :class="currentLang === 'id'
              ? 'bg-primary/10 dark:bg-primary/15 border-primary/40 dark:border-primary/50 ring-1 ring-primary/30 dark:ring-primary/40 shadow-sm'
              : 'bg-gray-50 dark:bg-gray-800/40 border-gray-150 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/80'"
            @click="selectLanguage('id')"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇮🇩</span>
              <div class="text-left">
                <p class="text-sm font-bold text-gray-900 dark:text-white">Bahasa Indonesia</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">Tampilkan dalam Bahasa Indonesia</p>
              </div>
            </div>
            <ion-icon
              v-if="currentLang === 'id'"
              :icon="checkmarkCircle"
              class="text-2xl text-primary shrink-0"
            />
          </button>

          <!-- English Option -->
          <button
            type="button"
            :disabled="languageStore.isLoadingTranslations"
            class="w-full flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            :class="currentLang === 'en'
              ? 'bg-primary/10 dark:bg-primary/15 border-primary/40 dark:border-primary/50 ring-1 ring-primary/30 dark:ring-primary/40 shadow-sm'
              : 'bg-gray-50 dark:bg-gray-800/40 border-gray-150 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/80'"
            @click="selectLanguage('en')"
          >
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇬🇧</span>
              <div class="text-left">
                <p class="text-sm font-bold text-gray-900 dark:text-white">English</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">Display in English</p>
              </div>
            </div>
            <ion-icon
              v-if="currentLang === 'en'"
              :icon="checkmarkCircle"
              class="text-2xl text-primary shrink-0"
            />
          </button>
        </div>
      </BaseModal>


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
import { logOutOutline, personCircleOutline, settingsOutline, languageOutline, chevronForwardOutline } from "ionicons/icons";
import { checkmarkCircle } from "ionicons/icons";
import { useRouter } from "vue-router";
import UserCard from "../components/profile/UserCard.vue";
import ResetDataButton from "../components/profile/ResetDataButton.vue";
import ConfirmationModal from "../components/shared/ConfirmationModal.vue";
import BaseModal from "../components/base/BaseModal.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import BaseCard from "../components/base/BaseCard.vue";
import BaseButton from "../components/base/BaseButton.vue";
import { useProfileStore } from "../stores/profileStore";
import { useTransactionStore } from "../stores/transactionStore";
import { useAuthStore } from "../stores/authStore";
import { useLanguageStore } from "../stores/languageStore";
import { useI18n, Lang } from "../utils/i18n";

const { t, currentLang } = useI18n();

const router = useRouter();
const profileStore = useProfileStore();
const transactionStore = useTransactionStore();
const authStore = useAuthStore();
const languageStore = useLanguageStore();

const isResetConfirmOpen = ref(false);
const isLogoutConfirmOpen = ref(false);
const isLanguageModalOpen = ref(false);

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
  authStore.loadSession();
});

// Format login time
const formatLoginTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
};

// Language actions
const selectLanguage = (lang: Lang) => {
  languageStore.setLanguage(lang);
  isLanguageModalOpen.value = false;
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
    triggerToast("Data berhasil direset.");
  } catch (error) {
    triggerToast("Gagal mereset data.", "danger");
  } finally {
    isResetConfirmOpen.value = false;
  }
};

// Logout
const promptLogout = () => {
  isLogoutConfirmOpen.value = true;
};

const confirmLogout = () => {
  isLogoutConfirmOpen.value = false;
  authStore.logout();
  
  // Clear stores state
  transactionStore.transactions = [];
  profileStore.name = "";
  profileStore.photo = "";
  
  router.replace("/login");
};
</script>

<style scoped>
.page-container {
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
</style>
