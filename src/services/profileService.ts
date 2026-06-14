import { storageService } from "./storageService";
import { Profile } from "../types/profile";

const STORAGE_KEY = "profile";

const DEFAULT_PROFILE: Profile = {
  name: "Bryan",
  photo: "",
};

export const profileService = {
  getStorageKey(userId: string): string {
    return userId ? `profile_${userId}` : STORAGE_KEY;
  },

  getProfile(userId: string): Profile {
    return storageService.getItem<Profile>(this.getStorageKey(userId), DEFAULT_PROFILE);
  },

  saveProfile(userId: string, profile: Profile): void {
    storageService.setItem<Profile>(this.getStorageKey(userId), profile);
  },

  clearProfile(userId: string): void {
    storageService.removeItem(this.getStorageKey(userId));
  },
};
