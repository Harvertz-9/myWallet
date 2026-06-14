# MyWallet - State Management Documentation

Version: 1.0

State Management Library: Pinia

---

# 1. Overview

MyWallet menggunakan Pinia sebagai state management utama.

Tujuan:

- Menyimpan state global aplikasi.
- Memisahkan business logic dari UI.
- Mempermudah maintenance.
- Mendukung scalability.

---

# 2. State Architecture

```text
User Interface
       ↓
Components
       ↓
Pinia Store
       ↓
Services
       ↓
Storage
(LocalStorage / SQLite)
```

---

# 3. Available Stores

```text
stores
│
├── transactionStore.ts
├── profileStore.ts
└── themeStore.ts
```

---

# 4. transactionStore

Merupakan store utama aplikasi.

File:

```text
src/stores/transactionStore.ts
```

---

# State

```ts
transactions: Transaction[]
loading: boolean
error: string | null
```

---

# Interface

```ts
interface Transaction {
    id: string
    title: string
    amount: number
    category: string
    type: "income" | "expense"
    date: string
    note?: string
    createdAt: string
    updatedAt: string
}
```

---

# Getters

## totalIncome

Menghitung total pemasukan.

Return:

```ts
number
```

---

## totalExpense

Menghitung total pengeluaran.

Return:

```ts
number
```

---

## balance

Menghitung saldo saat ini.

Formula:

```text
Balance = Total Income - Total Expense
```

Return:

```ts
number
```

---

## recentTransactions

Mengambil 5 transaksi terbaru.

Return:

```ts
Transaction[]
```

---

## incomeTransactions

Mengambil seluruh transaksi pemasukan.

Return:

```ts
Transaction[]
```

---

## expenseTransactions

Mengambil seluruh transaksi pengeluaran.

Return:

```ts
Transaction[]
```

---

## transactionCount

Jumlah transaksi.

Return:

```ts
number
```

---

# Actions

## loadTransactions()

Mengambil data dari storage.

---

## addTransaction()

Menambahkan transaksi baru.

Parameter:

```ts
Transaction
```

---

## updateTransaction()

Mengubah transaksi.

Parameter:

```ts
Transaction
```

---

## deleteTransaction()

Menghapus transaksi.

Parameter:

```ts
id: string
```

---

## clearTransactions()

Menghapus seluruh transaksi.

---

## searchTransactions()

Mencari transaksi berdasarkan nama.

Parameter:

```ts
keyword: string
```

Return:

```ts
Transaction[]
```

---

## filterTransactions()

Memfilter transaksi.

Parameter:

```ts
"income"
```

atau

```ts
"expense"
```

---

# Data Flow

```text
User
 ↓
Page
 ↓
Component
 ↓
transactionStore
 ↓
transactionService
 ↓
LocalStorage
 ↓
State Updated
 ↓
UI Re-render
```

---

# 5. profileStore

Mengelola data profil pengguna.

File:

```text
src/stores/profileStore.ts
```

---

# State

```ts
name: string
photo: string
```

---

# Getters

## profile

Return:

```ts
Profile
```

---

# Actions

## setName()

Parameter:

```ts
name: string
```

---

## setPhoto()

Parameter:

```ts
photo: string
```

---

## loadProfile()

Mengambil data dari storage.

---

## resetProfile()

Menghapus profil.

---

# Interface

```ts
interface Profile {
    name: string
    photo?: string
}
```

---

# 6. themeStore

Mengatur tampilan aplikasi.

File:

```text
src/stores/themeStore.ts
```

---

# State

```ts
darkMode: boolean
```

---

# Getters

## isDarkMode

Return:

```ts
boolean
```

---

# Actions

## toggleTheme()

Mengubah mode terang dan gelap.

---

## enableDarkMode()

Mengaktifkan dark mode.

---

## disableDarkMode()

Menonaktifkan dark mode.

---

## loadTheme()

Mengambil setting dari storage.

---

# 7. Store Dependencies

```text
transactionStore
      ↓
transactionService

profileStore
      ↓
profileService

themeStore
      ↓
themeService
```

Store tidak boleh berkomunikasi langsung dengan storage.

Seluruh operasi penyimpanan dilakukan melalui Service Layer.

---

# 8. Service Flow

```text
Pinia Store
     ↓
Service Layer
     ↓
LocalStorage

Future:

Pinia Store
     ↓
Repository Layer
     ↓
SQLite
     ↓
Firebase
```

---

# 9. Computed Data

Computed values tidak disimpan ke database.

Contoh:

### balance

```text
Income - Expense
```

---

### totalIncome

Jumlah seluruh pemasukan.

---

### totalExpense

Jumlah seluruh pengeluaran.

---

### recentTransactions

5 transaksi terbaru.

---

# 10. Error State

Setiap store memiliki:

```ts
loading: boolean
error: string | null
```

Contoh:

```ts
{
    loading: false,
    error: null
}
```

---

# 11. Future Stores

Version 2

```text
walletStore.ts
```

Mengelola multi wallet.

---

Version 3

```text
budgetStore.ts
```

Mengelola budget.

---

Version 4

```text
goalStore.ts
```

Mengelola financial goals.

---

Version 5

```text
notificationStore.ts
```

Mengelola reminder.

---

# 12. State Principles

1. Single Source of Truth

2. Business Logic Inside Store

3. UI Should Stay Dumb

4. Computed State Preferred

5. Minimal Global State

6. Strong Type Safety

7. Scalable Store Structure

8. Service Layer Abstraction

9. Offline First

10. Maintainable Architecture