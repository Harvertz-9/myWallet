import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Profile } from "../types/profile";
import { profileService } from "../services/profileService";
import { useAuthStore } from "./authStore";

export const useProfileStore = defineStore("profile", () => {
  const name = ref<string>("Bryan");
  const photo = ref<string>("");
  const authStore = useAuthStore();

  // Getters
  const profile = computed<Profile>(() => ({
    name: name.value,
    photo: photo.value || undefined,
  }));

  // Actions
  function loadProfile() {
    const userId = authStore.currentUser?.userId || "";
    const data = profileService.getProfile(userId);
    // If user is logged in but has no saved profile name, default to user's registered name
    name.value = data.name || authStore.currentUser?.name || "Bryan";
    photo.value = data.photo || "";
  }

  function setName(newName: string) {
    name.value = newName.trim();
    const userId = authStore.currentUser?.userId || "";
    profileService.saveProfile(userId, {
      name: name.value,
      photo: photo.value,
    });
    // Also sync the name back to auth store/session/users list
    if (authStore.currentUser) {
      authStore.updateCurrentUserName(newName);
    }
  }

  function setPhoto(newPhoto: string) {
    photo.value = newPhoto;
    const userId = authStore.currentUser?.userId || "";
    profileService.saveProfile(userId, {
      name: name.value,
      photo: photo.value,
    });
  }

  function resetProfile() {
    const userId = authStore.currentUser?.userId || "";
    profileService.clearProfile(userId);
    name.value = authStore.currentUser?.name || "Bryan";
    photo.value = "";
  }

  // Initialize profile immediately on store creation
  loadProfile();

  return {
    name,
    photo,
    profile,
    loadProfile,
    setName,
    setPhoto,
    resetProfile,
  };
});
