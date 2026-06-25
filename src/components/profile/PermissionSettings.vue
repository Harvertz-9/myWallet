<template>
  <BaseCard padding="md" class="bg-white dark:bg-card-dark">
    <div class="flex items-center gap-3 mb-4">
      <div class="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
        <ion-icon :icon="shieldCheckmarkOutline" class="text-lg text-purple-600 dark:text-purple-400" />
      </div>
      <div>
        <h3 class="text-sm font-bold text-gray-900 dark:text-white">Izin Aplikasi</h3>
        <p class="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Kelola izin untuk fitur aplikasi
        </p>
      </div>
    </div>

    <div class="space-y-2">
      <div
        v-for="perm in permissions"
        :key="perm.key"
        class="flex items-center justify-between gap-3 px-3 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            :class="perm.iconBgClass"
          >
            <ion-icon :icon="perm.icon" :class="perm.iconClass" />
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {{ perm.label }}
            </p>
            <!-- <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
              {{ perm.description }}
            </p> -->
          </div>
        </div>

        <div class="shrink-0">
          <span
            v-if="perm.status === 'granted'"
            class="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full uppercase tracking-wider"
          >
            Aktif
          </span>
          <button
            v-else
            type="button"
            class="text-[12px] font-bold text-primary bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 px-3 h-7 rounded uppercase tracking-wider cursor-pointer transition-colors min-w-20"
            @click="requestPermission(perm.key)"
          >
            {{ perm.loading ? 'Meminta...' : 'Minta Izin' }}
          </button>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IonIcon } from "@ionic/vue";
import {
  shieldCheckmarkOutline,
  notificationsOutline,
  cameraOutline,
  folderOpenOutline,
} from "ionicons/icons";
import BaseCard from "../base/BaseCard.vue";

interface PermissionItem {
  key: string;
  label: string;
  description: string;
  icon: string;
  iconBgClass: string;
  iconClass: string;
  status: "granted" | "denied" | "prompt";
  loading: boolean;
}

const checkNotificationPermission = () => {
  if (!("Notification" in window)) {
    return "denied" as const;
  }
  if (Notification.permission === "granted") return "granted" as const;
  if (Notification.permission === "denied") return "denied" as const;
  return "prompt" as const;
};

const permissions = reactive<PermissionItem[]>([
  {
    key: "notification",
    label: "Notifikasi",
    description: "Pengingat dan informasi transaksi",
    icon: notificationsOutline,
    iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
    iconClass: "text-base text-blue-600 dark:text-blue-400",
    status: checkNotificationPermission(),
    loading: false,
  },
  {
    key: "camera",
    label: "Kamera",
    description: "Mengambil foto profil",
    icon: cameraOutline,
    iconBgClass: "bg-amber-100 dark:bg-amber-900/30",
    iconClass: "text-base text-amber-600 dark:text-amber-400",
    status: "prompt",
    loading: false,
  },
  {
    key: "storage",
    label: "Penyimpanan",
    description: "Menyimpan dan mencadangkan data",
    icon: folderOpenOutline,
    iconBgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    iconClass: "text-base text-emerald-600 dark:text-emerald-400",
    status: "prompt",
    loading: false,
  },
]);

const requestPermission = async (key: string) => {
  const perm = permissions.find((p) => p.key === key);
  if (!perm || perm.loading) return;

  perm.loading = true;

  try {
    if (key === "notification") {
      if (!("Notification" in window)) {
        perm.status = "denied";
        return;
      }
      const result = await Notification.requestPermission();
      perm.status = result === "granted" ? "granted" : "denied";
    } else if (key === "camera") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach((t) => t.stop());
        perm.status = "granted";
      } catch {
        perm.status = "denied";
      }
    } else if (key === "storage") {
      if (navigator.storage && navigator.storage.persist) {
        const granted = await navigator.storage.persist();
        perm.status = granted ? "granted" : "denied";
      } else if ("StorageManager" in window) {
        perm.status = "granted";
      } else {
        perm.status = "granted";
      }
    }
  } catch {
    perm.status = "denied";
  } finally {
    perm.loading = false;
  }
};
</script>
