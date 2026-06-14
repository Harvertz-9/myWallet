<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="auth-container">
        <!-- Background decoration -->
        <div class="auth-bg-blob blob-1"></div>
        <div class="auth-bg-blob blob-2"></div>

        <div class="auth-card">
          <!-- Logo & Brand -->
          <div class="auth-brand">
            <div class="auth-logo">
              <ion-icon :icon="walletOutline" class="text-3xl text-white block" />
            </div>
            <h1 class="auth-title">MyWallet</h1>
            <p class="auth-subtitle">Masuk untuk kelola keuangan Anda</p>
          </div>

          <!-- Form -->
          <form class="auth-form" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="auth-field">
              <label class="auth-label">Email</label>
              <div class="auth-input-wrap" :class="{ 'error': errors.email }">
                <ion-icon :icon="mailOutline" class="auth-input-icon" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="email@contoh.com"
                  class="auth-input"
                  autocomplete="email"
                  @input="errors.email = ''"
                />
              </div>
              <span v-if="errors.email" class="auth-error">{{ errors.email }}</span>
            </div>

            <!-- Password -->
            <div class="auth-field">
              <label class="auth-label">Kata Sandi</label>
              <div class="auth-input-wrap" :class="{ 'error': errors.password }">
                <ion-icon :icon="lockClosedOutline" class="auth-input-icon" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Masukkan kata sandi"
                  class="auth-input"
                  autocomplete="current-password"
                  @input="errors.password = ''"
                />
                <button
                  type="button"
                  class="auth-toggle-pw"
                  @click="showPassword = !showPassword"
                >
                  <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" />
                </button>
              </div>
              <span v-if="errors.password" class="auth-error">{{ errors.password }}</span>
            </div>

            <!-- General Error -->
            <div v-if="generalError" class="auth-general-error">
              <ion-icon :icon="alertCircleOutline" class="shrink-0" />
              {{ generalError }}
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="auth-btn-primary"
              :disabled="loading"
            >
              <span v-if="loading" class="auth-spinner"></span>
              <span v-else>Masuk</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="auth-divider">
            <span>Belum punya akun?</span>
          </div>

          <!-- Register Link -->
          <router-link to="/register" class="auth-btn-secondary">
            Daftar Sekarang
          </router-link>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IonPage, IonContent, IonIcon } from "@ionic/vue";
import {
  walletOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  alertCircleOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const generalError = ref("");

const errors = ref({ email: "", password: "" });

const validate = (): boolean => {
  let valid = true;
  errors.value = { email: "", password: "" };
  generalError.value = "";

  if (!email.value.trim()) {
    errors.value.email = "Email tidak boleh kosong";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "Format email tidak valid";
    valid = false;
  }

  if (!password.value) {
    errors.value.password = "Kata sandi tidak boleh kosong";
    valid = false;
  }

  return valid;
};

const handleLogin = async () => {
  if (!validate()) return;
  loading.value = true;
  generalError.value = "";

  // Simulate slight delay for UX
  await new Promise((r) => setTimeout(r, 400));

  const result = authStore.login(email.value, password.value);
  loading.value = false;

  if (result.success) {
    router.replace("/tabs/dashboard");
  } else {
    generalError.value = result.message;
  }
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2027 100%);
}

.auth-bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

.blob-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #10b981, #059669);
  top: -80px;
  right: -80px;
}

.blob-2 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, #6366f1, #4f46e5);
  bottom: -60px;
  left: -60px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 36px 28px;
  position: relative;
  z-index: 10;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

.auth-brand {
  text-align: center;
  margin-bottom: 32px;
}

.auth-logo {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
}

.auth-title {
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.auth-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  font-weight: 500;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.auth-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.auth-label {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 4px;
}

.auth-input-wrap {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.07);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 0 14px;
  transition: border-color 0.2s, background 0.2s;
}

.auth-input-wrap:focus-within {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
}

.auth-input-wrap.error {
  border-color: #ef4444;
}

.auth-input-icon {
  color: rgba(255, 255, 255, 0.4);
  font-size: 18px;
  flex-shrink: 0;
}

.auth-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 14px 10px;
  font-size: 15px;
  color: #ffffff;
  font-weight: 500;
}

.auth-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.auth-toggle-pw {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.auth-toggle-pw:hover {
  color: rgba(255, 255, 255, 0.7);
}

.auth-error {
  font-size: 12px;
  color: #f87171;
  font-weight: 500;
  margin-left: 4px;
}

.auth-general-error {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 13px;
  color: #f87171;
  font-weight: 500;
}

.auth-btn-primary {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35);
  margin-top: 4px;
}

.auth-btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45);
}

.auth-btn-primary:active:not(:disabled) {
  transform: scale(0.98);
}

.auth-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-divider {
  text-align: center;
  margin: 20px 0 14px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

.auth-btn-secondary {
  display: block;
  width: 100%;
  padding: 14px;
  background: rgba(255, 255, 255, 0.06);
  color: #10b981;
  font-size: 15px;
  font-weight: 700;
  border: 1.5px solid rgba(16, 185, 129, 0.3);
  border-radius: 9999px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
}

.auth-btn-secondary:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}
</style>
