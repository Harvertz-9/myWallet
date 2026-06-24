<template>
  <ion-page>
    <ion-content :fullscreen="true" class="splash-content">
      <div class="splash-container">
        <!-- Main Content -->
        <div class="splash-main">
          <!-- Logo -->
          <div class="splash-logo-wrapper" :class="{ 'animate-in': showContent }">
            <img
              src="/image/logo.jpg"
              alt="myWallet Logo"
              class="splash-logo-img"
            />
          </div>

          <!-- App Name -->
          <div class="splash-text" :class="{ 'animate-in': showContent }">
            <h1 class="splash-title">myWallet</h1>
            <p class="splash-subtitle">{{ greeting }}</p>
          </div>
        </div>

        <!-- Bottom Progress Indicator -->
        <div class="splash-bottom" :class="{ 'animate-in': showContent }">
          <div class="splash-progress-track">
            <div class="splash-progress-bar" :style="{ width: progressWidth + '%' }"></div>
          </div>
          <p class="splash-loading-text">Mempersiapkan aplikasi...</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";
import { authService } from "../services/authService";

const router = useRouter();
const showContent = ref(false);
const progressWidth = ref(0);

let progressInterval: ReturnType<typeof setInterval> | null = null;
let redirectTimeout: ReturnType<typeof setTimeout> | null = null;

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "Selamat Pagi 🌅";
  if (hour >= 11 && hour < 15) return "Selamat Siang ☀️";
  if (hour >= 15 && hour < 18) return "Selamat Sore 🌇";
  return "Selamat Malam 🌙";
});

onMounted(() => {
  // Trigger entrance animations after a brief delay
  setTimeout(() => {
    showContent.value = true;
  }, 100);

  // Animate progress bar
  const totalDuration = 2500; // 2.5s
  const intervalMs = 30;
  const increment = (100 / totalDuration) * intervalMs;

  progressInterval = setInterval(() => {
    progressWidth.value = Math.min(progressWidth.value + increment, 100);
    if (progressWidth.value >= 100 && progressInterval) {
      clearInterval(progressInterval);
    }
  }, intervalMs);

  // Redirect after splash duration
  redirectTimeout = setTimeout(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      router.replace("/tabs/dashboard");
    } else {
      router.replace("/login");
    }
  }, totalDuration);
});

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval);
  if (redirectTimeout) clearTimeout(redirectTimeout);
});
</script>

<style scoped>
.splash-content {
  --background: #0a0f1a;
}

.splash-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100dvh;
  background: #0a0f1a;
  overflow: hidden;
}

/* Main content area */
.splash-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.25rem, 4vw, 2rem);
  z-index: 10;
}

/* Logo wrapper */
.splash-logo-wrapper {
  position: relative;
  opacity: 0;
  transform: scale(0.7) translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.splash-logo-wrapper.animate-in {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.splash-logo-img {
  position: relative;
  width: 130px;
  height: 140px;
  object-fit: cover;
  /* Make logo white */
  filter: brightness(0) invert(1);
  z-index: 1;
}

/* Text section */
.splash-text {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
}

.splash-text.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.splash-title {
  font-size: clamp(1.8rem, 7vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin: 0 0 0.4rem 0;
  line-height: 1.1;
}

.splash-subtitle {
  font-size: clamp(0.85rem, 3vw, 1rem);
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.01em;
}

/* Bottom progress area */
.splash-bottom {
  position: absolute;
  bottom: clamp(40px, 8vh, 72px);
  left: 50%;
  transform: translateX(-50%);
  width: clamp(160px, 50vw, 240px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;
  z-index: 10;
}

.splash-bottom.animate-in {
  opacity: 1;
}

.splash-progress-track {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 99px;
  overflow: hidden;
}

.splash-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9));
  border-radius: 99px;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.splash-loading-text {
  font-size: clamp(0.6rem, 2vw, 0.7rem);
  color: rgba(255, 255, 255, 0.3);
  font-weight: 500;
  letter-spacing: 0.05em;
  margin: 0;
  white-space: nowrap;
}
</style>
