import { storageService } from "./storageService";
import { User, AuthSession } from "../types/auth";

const USERS_KEY = "auth_users";
const SESSION_KEY = "auth_session";

function hashPassword(password: string): string {
  // Simple deterministic hash using btoa + salt for offline use
  return btoa(`mywallet:${password}:secure`);
}

export const authService = {
  getUsers(): User[] {
    return storageService.getItem<User[]>(USERS_KEY, []);
  },

  saveUsers(users: User[]): void {
    storageService.setItem<User[]>(USERS_KEY, users);
  },

  register(name: string, email: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: "Email sudah terdaftar. Gunakan email lain." };
    }
    const newUser: User = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    this.saveUsers(users);
    return { success: true, message: "Akun berhasil dibuat." };
  },

  login(email: string, password: string): { success: boolean; message: string; session?: AuthSession } {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === hashPassword(password)
    );
    if (!user) {
      return { success: false, message: "Email atau kata sandi tidak sesuai." };
    }
    const session: AuthSession = {
      userId: user.id,
      name: user.name,
      email: user.email,
      loggedInAt: new Date().toISOString(),
    };
    storageService.setItem<AuthSession>(SESSION_KEY, session);
    return { success: true, message: "Login berhasil.", session };
  },

  logout(): void {
    storageService.removeItem(SESSION_KEY);
  },

  getSession(): AuthSession | null {
    return storageService.getItem<AuthSession | null>(SESSION_KEY, null);
  },

  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },

  updateUserName(userId: string, newName: string): void {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users[index].name = newName.trim();
      this.saveUsers(users);
    }
  },

  updateSessionName(newName: string): void {
    const session = this.getSession();
    if (session) {
      session.name = newName.trim();
      storageService.setItem<AuthSession>(SESSION_KEY, session);
    }
  },
};
