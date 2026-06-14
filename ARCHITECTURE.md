# MyWallet - Architecture Documentation

## Version

1.0

---

# 1. Architecture Overview

MyWallet menggunakan pendekatan **Layered Architecture** untuk memisahkan tanggung jawab setiap bagian aplikasi sehingga mudah dikembangkan, dipelihara, dan di-scale.

Arsitektur terdiri dari:

```text
Presentation Layer
        ↓
Component Layer
        ↓
State Management Layer
        ↓
Service Layer
        ↓
Storage Layer
```

---

# 2. High Level Architecture

```text
┌───────────────────────┐
│      Views (Pages)    │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│      Components       │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│      Pinia Store      │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│       Services        │
└──────────┬────────────┘
           ↓
┌───────────────────────┐
│ LocalStorage / SQLite │
└───────────────────────┘
```

---

# 3. Presentation Layer

Bertanggung jawab terhadap tampilan aplikasi.

Folder:

```text
src/views
```

Pages:

* DashboardPage.vue
* TransactionsPage.vue
* StatisticsPage.vue
* ProfilePage.vue

Responsibilities:

* Menampilkan data.
* Menangani interaksi pengguna.
* Memanggil state dari Pinia Store.

Tidak diperbolehkan:

* Mengakses LocalStorage secara langsung.
* Menyimpan business logic.

---

# 4. Component Layer

Berisi reusable component.

Folder:

```text
src/components
```

Components:

### BalanceCard

Menampilkan saldo.

---

### IncomeCard

Menampilkan total pemasukan.

---

### ExpenseCard

Menampilkan total pengeluaran.

---

### TransactionCard

Menampilkan item transaksi.

---

### AddTransactionModal

Form tambah transaksi.

---

Responsibilities:

* Reusable UI.
* Tidak memiliki business logic.

---

# 5. State Management Layer

Menggunakan Pinia.

Folder:

```text
src/stores
```

Stores:

### transactionStore

Mengelola transaksi.

---

### profileStore

Mengelola data profil pengguna.

---

### themeStore

Mengelola dark mode.

---

Responsibilities:

* Menyimpan state aplikasi.
* Menyediakan getter.
* Menyediakan action.

Contoh:

```ts
addTransaction()

updateTransaction()

deleteTransaction()

loadTransactions()
```

---

# 6. Service Layer

Folder:

```text
src/services
```

Responsibilities:

* Berinteraksi dengan LocalStorage.
* Berinteraksi dengan SQLite.
* Menyediakan abstraction terhadap database.

Services:

### transactionService

CRUD transaksi.

---

### profileService

Data profil.

---

### themeService

Dark mode.

---

Contoh:

```ts
saveTransaction()

getTransactions()

deleteTransaction()

updateTransaction()
```

---

# 7. Storage Layer

## V1

LocalStorage

```text
transactions
profile
settings
```

## V2

SQLite

Tables:

* transactions
* profiles
* settings

---

# 8. Folder Structure

```text
src
│
├── assets
│
├── components
│     BalanceCard.vue
│     IncomeCard.vue
│     ExpenseCard.vue
│     TransactionCard.vue
│     AddTransactionModal.vue
│
├── views
│     DashboardPage.vue
│     TransactionsPage.vue
│     StatisticsPage.vue
│     ProfilePage.vue
│
├── stores
│     transactionStore.ts
│     profileStore.ts
│     themeStore.ts
│
├── services
│     transactionService.ts
│     profileService.ts
│     themeService.ts
│
├── types
│     transaction.ts
│     profile.ts
│
├── utils
│     currencyFormatter.ts
│     dateFormatter.ts
│
├── router
│
├── theme
│
└── assets
```

---

# 9. Data Flow

Tambah transaksi:

```text
User
 ↓
AddTransactionModal
 ↓
transactionStore
 ↓
transactionService
 ↓
LocalStorage
 ↓
Pinia State Updated
 ↓
UI Re-render
```

---

Hapus transaksi:

```text
User
 ↓
TransactionCard
 ↓
transactionStore
 ↓
transactionService
 ↓
Storage Updated
 ↓
State Updated
 ↓
UI Re-render
```

---

# 10. State Flow

```text
Storage
    ↓
Service
    ↓
Pinia Store
    ↓
Components
    ↓
User Interface
```

---

# 11. Routing Architecture

Menggunakan Vue Router.

Main Navigation:

```text
Dashboard
Transactions
Statistics
Profile
```

Bottom Tab Navigation:

```text
tabs/dashboard
tabs/transactions
tabs/statistics
tabs/profile
```

---

# 12. Type System

Folder:

```text
src/types
```

Interfaces:

### Transaction

```ts
interface Transaction {
    id: string
    title: string
    amount: number
    category: string
    type: 'income' | 'expense'
    date: string
    createdAt: string
    updatedAt: string
}
```

---

### Profile

```ts
interface Profile {
    name: string
    photo?: string
}
```

---

# 13. Utility Layer

Folder:

```text
src/utils
```

Utilities:

### currencyFormatter.ts

Mengubah:

```text
1000000
```

menjadi:

```text
Rp1.000.000
```

---

### dateFormatter.ts

Mengubah:

```text
2026-06-14
```

menjadi:

```text
14 Juni 2026
```

---

# 14. Error Handling

Store bertanggung jawab menangani error.

Flow:

```text
Service Error
       ↓
Store
       ↓
Toast Message
       ↓
User
```

Contoh:

```text
"Gagal menyimpan transaksi."
```

---

# 15. Scalability

Future Architecture:

```text
Presentation Layer
       ↓
Components
       ↓
Pinia Store
       ↓
Repository Layer
       ↓
Service Layer
       ↓
SQLite
       ↓
Firebase API
```

---

# 16. Future Integrations

Version 2

* SQLite Database

Version 3

* Firebase Authentication

Version 4

* Cloud Synchronization

Version 5

* Push Notification

Version 6

* Multi Wallet

---

# 17. Architecture Principles

1. Separation of Concerns

2. Single Responsibility Principle

3. Reusable Components

4. Strong Type Safety

5. Scalable Structure

6. Offline First

7. Maintainability

8. Performance First

9. Mobile First

10. Clean Architecture Inspired
