<template>
  <ion-page>
    <!-- Header with Back Button -->
    <ion-header class="ion-no-border">
      <ion-toolbar class="px-2">
        <ion-buttons slot="start">
          <button
            type="button"
            class="text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center cursor-pointer"
            @click="goBack"
          >
            <ion-icon :icon="arrowBackOutline" class="text-xl" />
          </button>
        </ion-buttons>
        <ion-title class="text-base font-bold text-gray-900 dark:text-white text-center">
          Kustomisasi Profil
        </ion-title>
        <div slot="end" class="w-10"></div> <!-- Spacer for symmetry -->
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="page-container space-y-6 pb-28">
        <!-- Form -->
        <form @submit.prevent="saveProfile" class="space-y-6">
          <!-- Avatar Customization Card -->
          <BaseCard padding="md" class="bg-white dark:bg-card-dark flex flex-col items-center border border-gray-100 dark:border-gray-800/40">
            <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 block w-full text-left">
              Pilih Avatar Emoji
            </span>

            <!-- Large Selected Avatar Preview -->
            <div class="relative mb-5">
              <div 
                class="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-tint flex items-center justify-center text-5xl font-extrabold shadow-md border border-primary/20"
              >
                <span>{{ selectedEmoji || '👤' }}</span>
              </div>
              <div class="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white dark:border-card-dark">
                <ion-icon :icon="sparkles" class="text-xs block" />
              </div>
            </div>

            <!-- Emojis Grid -->
            <div class="grid grid-cols-5 gap-3 w-full max-w-[320px] justify-center">
              <button
                v-for="emoji in emojis"
                :key="emoji"
                type="button"
                class="w-12 h-12 text-2xl flex items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer"
                :class="selectedEmoji === emoji 
                  ? 'bg-primary/20 border-primary scale-110 shadow-sm' 
                  : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-850 hover:bg-gray-100 dark:hover:bg-gray-800'"
                @click="selectedEmoji = emoji"
              >
                {{ emoji }}
              </button>
            </div>
          </BaseCard>

          <!-- Input Fields Card -->
          <BaseCard padding="md" class="bg-white dark:bg-card-dark space-y-4 border border-gray-100 dark:border-gray-800/40">
            <!-- Full Name -->
            <BaseInput
              v-model="fullName"
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap Anda"
              :error="errors.fullName"
              :maxlength="20"
            >
              <template #icon>
                <ion-icon :icon="personOutline" class="text-lg" />
              </template>
            </BaseInput>

            <!-- Occupation -->
            <BaseInput
              v-model="occupation"
              label="Pekerjaan / Status"
              placeholder="e.g. Mahasiswa / Personal Finance"
              :error="errors.occupation"
              :maxlength="30"
            >
              <template #icon>
                <ion-icon :icon="briefcaseOutline" class="text-lg" />
              </template>
            </BaseInput>

            <!-- Bio -->
            <div class="flex flex-col w-full gap-1.5">
              <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                Bio Singkat
              </label>
              <textarea
                v-model="bio"
                placeholder="Tulis bio atau catatan finansial Anda..."
                maxlength="100"
                rows="3"
                class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-2xl p-4 text-sm font-medium transition-all duration-200"
              ></textarea>
              <span class="text-[10px] text-right text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                {{ bio.length }}/100 karakter
              </span>
            </div>
          </BaseCard>

          <!-- Save Button -->
          <div class="pt-2">
            <BaseButton
              type="submit"
              variant="primary"
              :full="true"
              :disabled="saving"
            >
              <span v-if="saving">Menyimpan...</span>
              <span v-else>Simpan Perubahan</span>
            </BaseButton>
          </div>
        </form>
      </div>

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
import { ref, onMounted } from "vue";
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonIcon } from "@ionic/vue";
import { arrowBackOutline, personOutline, briefcaseOutline, sparkles } from "ionicons/icons";
import { useRouter } from "vue-router";
import BaseCard from "../components/base/BaseCard.vue";
import BaseInput from "../components/base/BaseInput.vue";
import BaseButton from "../components/base/BaseButton.vue";
import ToastMessage from "../components/shared/ToastMessage.vue";
import { useProfileStore } from "../stores/profileStore";

const router = useRouter();
const profileStore = useProfileStore();

// Form States
const fullName = ref("");
const occupation = ref("");
const bio = ref("");
const selectedEmoji = ref("");
const saving = ref(false);

const errors = ref({
  fullName: "",
  occupation: "",
});

const emojis = [
  "🧔", "👩", "🎓", "💻", "💼",
  "🦊", "🦁", "🐼", "🥑", "🍕",
  "📈", "🚀", "💰", "🎮", "🎨"
];

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
  fullName.value = profileStore.name;
  occupation.value = profileStore.occupation;
  bio.value = profileStore.bio;
  selectedEmoji.value = profileStore.photo || emojis[0];
});

const goBack = () => {
  router.back();
};

const validate = (): boolean => {
  let valid = true;
  errors.value = { fullName: "", occupation: "" };

  if (!fullName.value.trim()) {
    errors.value.fullName = "Nama lengkap tidak boleh kosong";
    valid = false;
  } else if (fullName.value.trim().length < 2) {
    errors.value.fullName = "Nama lengkap minimal 2 karakter";
    valid = false;
  }

  return valid;
};

const saveProfile = async () => {
  if (!validate()) return;
  saving.value = true;

  try {
    await new Promise((r) => setTimeout(r, 400));
    
    profileStore.updateProfile({
      name: fullName.value,
      photo: selectedEmoji.value,
      occupation: occupation.value,
      bio: bio.value,
    });
    
    triggerToast("Profil berhasil diperbarui.");
    
    setTimeout(() => {
      saving.value = false;
      router.replace("/tabs/profile");
    }, 1200);
  } catch (error) {
    saving.value = false;
    triggerToast("Gagal menyimpan profil.", "danger");
  }
};
</script>

<style scoped>
.page-container {
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
textarea:focus {
  background-color: transparent;
}
</style>
