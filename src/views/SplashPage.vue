<template>
  <ion-page>
    <ion-content :fullscreen="true" class="splash-content">
      <div class="splash-container">
        <!-- Background decorative elements -->
        <div class="splash-bg-ring ring-1"></div>
        <div class="splash-bg-ring ring-2"></div>
        <div class="splash-bg-ring ring-3"></div>

        <!-- Main Content -->
        <div class="splash-main">
          <!-- Logo -->
          <div class="splash-logo-wrapper" :class="{ 'animate-in': showContent }">
            <div class="splash-logo-glow"></div>
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
  min-height: 100vh;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 30%, #0d2818 0%, #0a0f1a 55%, #060a12 100%);
}

/* Decorative background rings */
.splash-bg-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(16, 185, 129, 0.06);
}

.ring-1 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulseRing 3s ease-in-out infinite;
}

.ring-2 {
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulseRing 3s ease-in-out infinite 0.5s;
}

.ring-3 {
  width: 700px;
  height: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulseRing 3s ease-in-out infinite 1s;
}

@keyframes pulseRing {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
}

/* Main content area */
.splash-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 10;
}

/* Logo wrapper with glow effect */
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

.splash-logo-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%);
  filter: blur(20px);
  animation: glowPulse 2.5s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.splash-logo-img {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(16, 185, 129, 0.4);
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.15), 0 8px 32px rgba(0, 0, 0, 0.4);
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
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #34d399 0%, #10B981 40%, #059669 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
  line-height: 1.1;
}

.splash-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.01em;
}

/* Bottom progress area */
.splash-bottom {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;
  z-index: 10;
}

.splash-bottom.animate-in {
  opacity: 1;
}

.splash-progress-track {
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
  overflow: hidden;
}

.splash-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10B981, #34d399);
  border-radius: 99px;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
}

.splash-loading-text {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 500;
  letter-spacing: 0.05em;
  margin: 0;
}
</style>
