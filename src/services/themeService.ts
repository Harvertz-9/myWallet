import { storageService } from "./storageService";
import { Settings } from "../types/settings";

const STORAGE_KEY = "settings";

const DEFAULT_SETTINGS: Settings = {
  darkMode: false,
};

export const themeService = {
  getDarkMode(): boolean {
    const settings = storageService.getItem<Settings>(STORAGE_KEY, DEFAULT_SETTINGS);
    return settings.darkMode;
  },

  saveDarkMode(darkMode: boolean): void {
    storageService.setItem<Settings>(STORAGE_KEY, { darkMode });
  },
};
