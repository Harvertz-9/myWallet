import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { AuthSession } from "../types/auth";
import { authService } from "../services/authService";

export const useAuthStore = defineStore("auth", () => {
  const session = ref<AuthSession | null>(null);

  // Getters
  const isLoggedIn = computed(() => session.value !== null);
  const currentUser = computed(() => session.value);

  // Actions
  function loadSession() {
    session.value = authService.getSession();
  }

  function register(
    name: string,
    email: string,
    password: string
  ): { success: boolean; message: string } {
    return authService.register(name, email, password);
  }

  function login(
    email: string,
    password: string
  ): { success: boolean; message: string } {
    const result = authService.login(email, password);
    if (result.success && result.session) {
      session.value = result.session;
    }
    return result;
  }

  function logout() {
    authService.logout();
    session.value = null;
  }

  function updateCurrentUserName(newName: string) {
    if (session.value) {
      session.value.name = newName.trim();
      authService.updateSessionName(newName);
      authService.updateUserName(session.value.userId, newName);
    }
  }

  // Initialize session immediately on store creation
  loadSession();

  return {
    session,
    isLoggedIn,
    currentUser,
    loadSession,
    register,
    login,
    logout,
    updateCurrentUserName,
  };
});
