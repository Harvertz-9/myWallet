import { defineStore } from "pinia";
import { ref } from "vue";
import { storageService } from "../services/storageService";
import { Lang } from "../utils/i18n";

const LANG_KEY = "app_language";

export const useLanguageStore = defineStore("language", () => {
  // Default to Indonesian if no saved preference
  const currentLang = ref<Lang>(storageService.getItem<Lang>(LANG_KEY, "id"));
  const isLoadingTranslations = ref(false);

  // Background check on load
  if (currentLang.value !== "id") {
    isLoadingTranslations.value = true;
    import("../utils/i18n").then(({ fetchDynamicTranslations }) => {
      fetchDynamicTranslations(currentLang.value)
        .catch(err => console.error("Initial translation fetch failed:", err))
        .finally(() => {
          isLoadingTranslations.value = false;
        });
    });
  }

  async function setLanguage(lang: Lang) {
    currentLang.value = lang;
    storageService.setItem<Lang>(LANG_KEY, lang);

    if (lang !== "id") {
      isLoadingTranslations.value = true;
      try {
        // Dynamic import to avoid circular dependency
        const { fetchDynamicTranslations } = await import("../utils/i18n");
        await fetchDynamicTranslations(lang);
      } catch (error) {
        console.error("Failed to fetch translations:", error);
      } finally {
        isLoadingTranslations.value = false;
      }
    }
  }

  return {
    currentLang,
    isLoadingTranslations,
    setLanguage,
  };
});

