# MyWallet - Components Documentation

## Version

1.0

---

# 1. Overview

Dokumen ini mendefinisikan seluruh reusable component yang digunakan pada aplikasi MyWallet.

Tujuan:

* Konsistensi UI.
* Reusability.
* Mempermudah maintenance.
* Mengurangi duplikasi kode.

---

# 2. Component Architecture

```text
Pages
  ↓
Reusable Components
  ↓
Base Components
```

---

# 3. Dashboard Components

---

## BalanceCard

### Purpose

Menampilkan total saldo pengguna.

### File

```text
src/components/dashboard/BalanceCard.vue
```

### Props

```ts
interface BalanceCardProps {
    balance: number
}
```

### Example

```vue
<BalanceCard :balance="2500000" />
```

### Output

```text
Total Balance
Rp2.500.000
```

---

## IncomeCard

### Purpose

Menampilkan total pemasukan.

### File

```text
src/components/dashboard/IncomeCard.vue
```

### Props

```ts
interface IncomeCardProps {
    income: number
}
```

---

## ExpenseCard

### Purpose

Menampilkan total pengeluaran.

### File

```text
src/components/dashboard/ExpenseCard.vue
```

### Props

```ts
interface ExpenseCardProps {
    expense: number
}
```

---

## RecentTransactions

### Purpose

Menampilkan transaksi terbaru.

### File

```text
src/components/dashboard/RecentTransactions.vue
```

### Props

```ts
interface RecentTransactionsProps {
    transactions: Transaction[]
}
```

---

# 4. Transaction Components

---

## TransactionCard

### Purpose

Menampilkan satu item transaksi.

### File

```text
src/components/transaction/TransactionCard.vue
```

### Props

```ts
interface TransactionCardProps {
    transaction: Transaction
}
```

### Example

```vue
<TransactionCard
    :transaction="item"
/>
```

### Display

```text
🍔 Makan Siang
14 Juni 2026

- Rp25.000
```

---

## TransactionList

### Purpose

Menampilkan daftar transaksi.

### File

```text
src/components/transaction/TransactionList.vue
```

### Props

```ts
interface TransactionListProps {
    transactions: Transaction[]
}
```

---

## SearchBar

### Purpose

Mencari transaksi.

### File

```text
src/components/transaction/SearchBar.vue
```

### Emits

```ts
search
```

---

## FilterChip

### Purpose

Filter transaksi.

### File

```text
src/components/transaction/FilterChip.vue
```

### Available Filters

```text
All
Income
Expense
```

### Emits

```ts
change
```

---

# 5. Form Components

---

## AddTransactionModal

### Purpose

Form tambah transaksi.

### File

```text
src/components/forms/AddTransactionModal.vue
```

### Fields

* Title
* Amount
* Type
* Category
* Date

### Emits

```ts
save
close
```

---

## EditTransactionModal

### Purpose

Mengedit transaksi.

### File

```text
src/components/forms/EditTransactionModal.vue
```

### Props

```ts
interface EditTransactionModalProps {
    transaction: Transaction
}
```

### Emits

```ts
update
close
```

---

## AmountInput

### Purpose

Input nominal uang.

### File

```text
src/components/forms/AmountInput.vue
```

### Props

```ts
interface AmountInputProps {
    modelValue: number
}
```

---

## CategorySelect

### Purpose

Memilih kategori transaksi.

### File

```text
src/components/forms/CategorySelect.vue
```

### Props

```ts
interface CategorySelectProps {
    type: "income" | "expense"
}
```

---

# 6. Statistics Components

---

## ExpensePieChart

### Purpose

Visualisasi kategori pengeluaran.

### File

```text
src/components/statistics/ExpensePieChart.vue
```

### Props

```ts
interface ExpensePieChartProps {
    transactions: Transaction[]
}
```

---

## IncomeExpenseBarChart

### Purpose

Menampilkan perbandingan pemasukan dan pengeluaran.

### File

```text
src/components/statistics/IncomeExpenseBarChart.vue
```

### Props

```ts
interface IncomeExpenseBarChartProps {
    income: number
    expense: number
}
```

---

## StatisticsSummary

### Purpose

Ringkasan statistik.

### File

```text
src/components/statistics/StatisticsSummary.vue
```

---

# 7. Profile Components

---

## UserCard

### Purpose

Menampilkan informasi pengguna.

### File

```text
src/components/profile/UserCard.vue
```

### Props

```ts
interface UserCardProps {
    name: string
    photo?: string
}
```

---

## ThemeToggle

### Purpose

Mengaktifkan Dark Mode.

### File

```text
src/components/profile/ThemeToggle.vue
```

### Props

```ts
interface ThemeToggleProps {
    darkMode: boolean
}
```

### Emits

```ts
toggle
```

---

## ResetDataButton

### Purpose

Menghapus seluruh data aplikasi.

### File

```text
src/components/profile/ResetDataButton.vue
```

### Emits

```ts
reset
```

---

# 8. Shared Components

---

## EmptyState

### Purpose

Menampilkan keadaan ketika data kosong.

### File

```text
src/components/shared/EmptyState.vue
```

### Props

```ts
interface EmptyStateProps {
    title: string
    description: string
}
```

---

## LoadingSkeleton

### Purpose

Menampilkan loading.

### File

```text
src/components/shared/LoadingSkeleton.vue
```

---

## ConfirmationModal

### Purpose

Konfirmasi sebelum menghapus data.

### File

```text
src/components/shared/ConfirmationModal.vue
```

### Props

```ts
interface ConfirmationModalProps {
    title: string
    message: string
}
```

### Emits

```ts
confirm
cancel
```

---

## ToastMessage

### Purpose

Menampilkan pesan sukses atau error.

### File

```text
src/components/shared/ToastMessage.vue
```

---

# 9. Floating Action Button

---

## FloatingActionButton

### Purpose

Menambah transaksi.

### File

```text
src/components/shared/FloatingActionButton.vue
```

### Icon

```text
add
```

### Emits

```ts
click
```

---

# 10. Base Components

---

## BaseButton

### File

```text
src/components/base/BaseButton.vue
```

### Variants

* Primary
* Secondary
* Danger

---

## BaseCard

### File

```text
src/components/base/BaseCard.vue
```

Digunakan oleh:

* BalanceCard
* IncomeCard
* ExpenseCard

---

## BaseInput

### File

```text
src/components/base/BaseInput.vue
```

---

## BaseModal

### File

```text
src/components/base/BaseModal.vue
```

---

## BaseSelect

### File

```text
src/components/base/BaseSelect.vue
```

---

# 11. Component Tree

```text
DashboardPage
│
├── BalanceCard
├── IncomeCard
├── ExpenseCard
├── RecentTransactions
└── FloatingActionButton

TransactionsPage
│
├── SearchBar
├── FilterChip
├── TransactionList
│       └── TransactionCard
└── AddTransactionModal

StatisticsPage
│
├── ExpensePieChart
├── IncomeExpenseBarChart
└── StatisticsSummary

ProfilePage
│
├── UserCard
├── ThemeToggle
└── ResetDataButton
```

---

# 12. Component Principles

1. Single Responsibility Principle

2. Reusable Components

3. Dumb Components Preferred

4. Props Down

5. Events Up

6. Type Safe Components

7. Consistent Naming

8. Minimal Side Effects

9. Composition API First

10. Scalable Structure
