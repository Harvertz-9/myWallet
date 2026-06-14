import { storageService } from "./storageService";
import { Transaction } from "../types/transaction";
import { authService } from "./authService";

export const transactionService = {
  getStorageKey(): string {
    const session = authService.getSession();
    return session ? `transactions_${session.userId}` : "transactions";
  },

  getTransactions(): Transaction[] {
    return storageService.getItem<Transaction[]>(this.getStorageKey(), []);
  },

  saveTransactions(transactions: Transaction[]): void {
    storageService.setItem<Transaction[]>(this.getStorageKey(), transactions);
  },

  clearTransactions(): void {
    storageService.removeItem(this.getStorageKey());
  },
};
