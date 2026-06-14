import { storageService } from "./storageService";
import { Transaction } from "../types/transaction";

const STORAGE_KEY = "transactions";

export const transactionService = {
  getTransactions(): Transaction[] {
    return storageService.getItem<Transaction[]>(STORAGE_KEY, []);
  },

  saveTransactions(transactions: Transaction[]): void {
    storageService.setItem<Transaction[]>(STORAGE_KEY, transactions);
  },

  clearTransactions(): void {
    storageService.removeItem(STORAGE_KEY);
  },
};
