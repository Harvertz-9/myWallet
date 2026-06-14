import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Profile } from "../types/profile";
import { profileService } from "../services/profileService";

export const useProfileStore = defineStore("profile", () => {
  const name = ref<string>("Bryan");
  const photo = ref<string>("");

  // Getters
  const profile = computed<Profile>(() => ({
    name: name.value,
    photo: photo.value || undefined,
  }));

  // Actions
  function loadProfile() {
    const data = profileService.getProfile();
    name.value = data.name || "Bryan";
    photo.value = data.photo || "";
  }

  function setName(newName: string) {
    name.value = newName;
    profileService.saveProfile({
      name: name.value,
      photo: photo.value,
    });
  }

  function setPhoto(newPhoto: string) {
    photo.value = newPhoto;
    profileService.saveProfile({
      name: name.value,
      photo: photo.value,
    });
  }

  function resetProfile() {
    name.value = "Bryan";
    photo.value = "";
    profileService.clearProfile();
  }

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
