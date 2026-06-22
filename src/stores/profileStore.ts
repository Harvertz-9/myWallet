import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Profile } from "../types/profile";
import { profileService } from "../services/profileService";
import { useAuthStore } from "./authStore";

export const useProfileStore = defineStore("profile", () => {
  const name = ref<string>("");
  const photo = ref<string>("");
  const occupation = ref<string>("");
  const bio = ref<string>("");
  const authStore = useAuthStore();

  // Getters
  const profile = computed<Profile>(() => ({
    name: name.value,
    photo: photo.value || undefined,
    occupation: occupation.value || undefined,
    bio: bio.value || undefined,
  }));

  // Actions
  function loadProfile() {
    const userId = authStore.currentUser?.userId || "";
    const data = profileService.getProfile(userId);
    name.value = data.name || authStore.currentUser?.name || "Pengguna";
    photo.value = data.photo || "";
    occupation.value = data.occupation || "Mahasiswa / Personal Finance";
    bio.value = data.bio || "";
  }

  function updateProfile(newData: { name: string; photo: string; occupation: string; bio: string }) {
    name.value = newData.name.trim();
    photo.value = newData.photo;
    occupation.value = newData.occupation.trim();
    bio.value = newData.bio.trim();

    const userId = authStore.currentUser?.userId || "";
    profileService.saveProfile(userId, {
      name: name.value,
      photo: photo.value,
      occupation: occupation.value,
      bio: bio.value,
    });

    if (authStore.currentUser) {
      authStore.updateCurrentUserName(name.value);
    }
  }

  function setName(newName: string) {
    name.value = newName.trim();
    const userId = authStore.currentUser?.userId || "";
    profileService.saveProfile(userId, {
      name: name.value,
      photo: photo.value,
      occupation: occupation.value,
      bio: bio.value,
    });
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
      occupation: occupation.value,
      bio: bio.value,
    });
  }

  function resetProfile() {
    const userId = authStore.currentUser?.userId || "";
    profileService.clearProfile(userId);
    name.value = authStore.currentUser?.name || "Pengguna";
    photo.value = "";
    occupation.value = "Mahasiswa / Personal Finance";
    bio.value = "";
  }

  // Initialize profile immediately on store creation
  loadProfile();

  return {
    name,
    photo,
    occupation,
    bio,
    profile,
    loadProfile,
    updateProfile,
    setName,
    setPhoto,
    resetProfile,
  };
});
