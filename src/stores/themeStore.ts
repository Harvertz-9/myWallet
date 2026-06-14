import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { themeService } from "../services/themeService";

export const useThemeStore = defineStore("theme", () => {
  const darkMode = ref<boolean>(false);

  // Getters
  const isDarkMode = computed(() => darkMode.value);

  // Helper to apply theme to document
  function applyTheme(isDark: boolean) {
    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark", isDark);
  }

  // Actions
  function loadTheme() {
    darkMode.value = themeService.getDarkMode();
    applyTheme(darkMode.value);
  }

  function toggleTheme() {
    darkMode.value = !darkMode.value;
    themeService.saveDarkMode(darkMode.value);
    applyTheme(darkMode.value);
  }

  function enableDarkMode() {
    darkMode.value = true;
    themeService.saveDarkMode(true);
    applyTheme(true);
  }

  function disableDarkMode() {
    darkMode.value = false;
    themeService.saveDarkMode(false);
    applyTheme(false);
  }

  return {
    darkMode,
    isDarkMode,
    loadTheme,
    toggleTheme,
    enableDarkMode,
    disableDarkMode,
  };
});
