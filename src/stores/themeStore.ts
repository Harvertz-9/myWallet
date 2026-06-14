import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { themeService } from "../services/themeService";

export const useThemeStore = defineStore("theme", () => {
  const darkMode = ref<boolean>(false);

  // Getters
  const isDarkMode = computed(() => darkMode.value);

  // Apply theme to both <html> and <body> for maximum compatibility
  function applyTheme(isDark: boolean) {
    // Apply to <html> — needed for Ionic dark.class.css
    document.documentElement.classList.toggle("dark", isDark);
    // Apply to <body> — needed for Tailwind utilities
    document.body.classList.toggle("dark", isDark);
    // Set color-scheme for native form elements
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
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
