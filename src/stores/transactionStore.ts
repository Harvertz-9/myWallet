import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Transaction } from "../types/transaction";
import { transactionService } from "../services/transactionService";

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<Transaction[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Getters
  const totalIncome = computed(() => {
    return transactions.value
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const totalExpense = computed(() => {
    return transactions.value
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const balance = computed(() => {
    return totalIncome.value - totalExpense.value;
  });

  const recentTransactions = computed(() => {
    // Sort by date descending, then by createdAt descending
    return [...transactions.value]
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (dateB !== dateA) {
          return dateB - dateA;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 5);
  });

  const incomeTransactions = computed(() => {
    return transactions.value.filter((t) => t.type === "income");
  });

  const expenseTransactions = computed(() => {
    return transactions.value.filter((t) => t.type === "expense");
  });

  const transactionCount = computed(() => {
    return transactions.value.length;
  });

  // Actions
  function loadTransactions() {
    loading.value = true;
    error.value = null;
    try {
      transactions.value = transactionService.getTransactions();
    } catch (err: any) {
      error.value = err.message || "Gagal memuat transaksi";
    } finally {
      loading.value = false;
    }
  }

  function addTransaction(transaction: Transaction) {
    loading.value = true;
    error.value = null;
    try {
      transactions.value.push(transaction);
      transactionService.saveTransactions(transactions.value);
    } catch (err: any) {
      error.value = err.message || "Gagal menyimpan transaksi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function updateTransaction(updatedTransaction: Transaction) {
    loading.value = true;
    error.value = null;
    try {
      const index = transactions.value.findIndex((t) => t.id === updatedTransaction.id);
      if (index !== -1) {
        transactions.value[index] = { ...updatedTransaction };
        transactionService.saveTransactions(transactions.value);
      } else {
        throw new Error("Transaksi tidak ditemukan");
      }
    } catch (err: any) {
      error.value = err.message || "Gagal memperbarui transaksi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function deleteTransaction(id: string) {
    loading.value = true;
    error.value = null;
    try {
      transactions.value = transactions.value.filter((t) => t.id !== id);
      transactionService.saveTransactions(transactions.value);
    } catch (err: any) {
      error.value = err.message || "Gagal menghapus transaksi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function clearTransactions() {
    loading.value = true;
    error.value = null;
    try {
      transactions.value = [];
      transactionService.clearTransactions();
    } catch (err: any) {
      error.value = err.message || "Gagal mereset data transaksi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function searchTransactions(keyword: string): Transaction[] {
    if (!keyword.trim()) return transactions.value;
    const lower = keyword.toLowerCase();
    return transactions.value.filter((t) => t.title.toLowerCase().includes(lower));
  }

  function filterTransactions(type: "income" | "expense"): Transaction[] {
    return transactions.value.filter((t) => t.type === type);
  }

  return {
    transactions,
    loading,
    error,
    totalIncome,
    totalExpense,
    balance,
    recentTransactions,
    incomeTransactions,
    expenseTransactions,
    transactionCount,
    loadTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    clearTransactions,
    searchTransactions,
    filterTransactions,
  };
});
