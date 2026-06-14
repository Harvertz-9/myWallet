import { storageService } from "./storageService";
import { Profile } from "../types/profile";

const STORAGE_KEY = "profile";

const DEFAULT_PROFILE: Profile = {
  name: "Bryan",
  photo: "",
};

export const profileService = {
  getProfile(): Profile {
    return storageService.getItem<Profile>(STORAGE_KEY, DEFAULT_PROFILE);
  },

  saveProfile(profile: Profile): void {
    storageService.setItem<Profile>(STORAGE_KEY, profile);
  },

  clearProfile(): void {
    storageService.removeItem(STORAGE_KEY);
  },
};
