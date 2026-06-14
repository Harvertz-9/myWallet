# MyWallet - Folder Structure Documentation

Version: 1.0

---

# 1. Overview

MyWallet menggunakan pendekatan modular dan scalable agar mudah dikembangkan, dipelihara, serta mendukung penambahan fitur di masa depan.

Prinsip yang digunakan:

- Separation of Concerns
- Reusability
- Scalability
- Maintainability
- Type Safety

---

# 2. Root Structure

```text
myWallet
│
├── docs
├── public
├── src
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── capacitor.config.ts
├── ionic.config.json
├── README.md
└── LICENSE
```

---

# 3. Documentation Folder

```text
docs
│
├── PRD.md
├── DESIGN.md
├── ARCHITECTURE.md
├── COMPONENTS.md
├── DATABASE.md
├── FOLDER_STRUCTURE.md
├── STATE_MANAGEMENT.md
├── ROADMAP.md
└── TESTING.md
```

---

# 4. Source Folder

```text
src
│
├── assets
├── components
├── views
├── stores
├── services
├── types
├── utils
├── constants
├── router
├── composables
├── theme
├── layouts
├── plugins
├── hooks
├── App.vue
└── main.ts
```

---

# 5. Assets

Digunakan untuk file statis.

```text
assets
│
├── images
├── icons
├── illustrations
└── logo
```

Contoh:

```text
logo.png
empty-state.svg
wallet-icon.svg
```

---

# 6. Components

Seluruh reusable component.

```text
components
│
├── base
├── dashboard
├── transaction
├── forms
├── statistics
├── profile
└── shared
```

---

## Base Components

Komponen dasar yang digunakan di seluruh aplikasi.

```text
base
│
├── BaseButton.vue
├── BaseCard.vue
├── BaseInput.vue
├── BaseModal.vue
└── BaseSelect.vue
```

---

## Dashboard Components

```text
dashboard
│
├── BalanceCard.vue
├── IncomeCard.vue
├── ExpenseCard.vue
└── RecentTransactions.vue
```

---

## Transaction Components

```text
transaction
│
├── TransactionCard.vue
├── TransactionList.vue
├── SearchBar.vue
└── FilterChip.vue
```

---

## Forms

```text
forms
│
├── AddTransactionModal.vue
├── EditTransactionModal.vue
├── AmountInput.vue
└── CategorySelect.vue
```

---

## Statistics Components

```text
statistics
│
├── ExpensePieChart.vue
├── IncomeExpenseBarChart.vue
└── StatisticsSummary.vue
```

---

## Profile Components

```text
profile
│
├── UserCard.vue
├── ThemeToggle.vue
└── ResetDataButton.vue
```

---

## Shared Components

```text
shared
│
├── EmptyState.vue
├── LoadingSkeleton.vue
├── ToastMessage.vue
├── ConfirmationModal.vue
└── FloatingActionButton.vue
```

---

# 7. Views

Berisi halaman utama aplikasi.

```text
views
│
├── DashboardPage.vue
├── TransactionsPage.vue
├── StatisticsPage.vue
├── ProfilePage.vue
└── NotFoundPage.vue
```

---

# 8. Stores

State management menggunakan Pinia.

```text
stores
│
├── transactionStore.ts
├── profileStore.ts
└── themeStore.ts
```

---

## transactionStore

Mengelola:

- transaksi
- saldo
- pemasukan
- pengeluaran

---

## profileStore

Mengelola:

- nama pengguna
- foto profil

---

## themeStore

Mengelola:

- dark mode

---

# 9. Services

Lapisan yang berinteraksi dengan storage.

```text
services
│
├── transactionService.ts
├── profileService.ts
├── themeService.ts
└── storageService.ts
```

---

# 10. Types

Seluruh interface TypeScript.

```text
types
│
├── transaction.ts
├── profile.ts
└── settings.ts
```

---

# 11. Utils

Berisi helper functions.

```text
utils
│
├── currencyFormatter.ts
├── dateFormatter.ts
├── uuidGenerator.ts
└── chartFormatter.ts
```

---

# 12. Constants

Konstanta global.

```text
constants
│
├── incomeCategories.ts
├── expenseCategories.ts
├── routes.ts
└── colors.ts
```

---

# 13. Router

Konfigurasi Vue Router.

```text
router
│
└── index.ts
```

---

# 14. Composables

Reusable Composition API.

```text
composables
│
├── useCurrency.ts
├── useDate.ts
└── useTheme.ts
```

---

# 15. Layouts

Template layout halaman.

```text
layouts
│
├── MainLayout.vue
└── AuthLayout.vue
```

---

# 16. Plugins

Integrasi library eksternal.

```text
plugins
│
├── chart.ts
└── capacitor.ts
```

---

# 17. Hooks

Lifecycle helper.

```text
hooks
│
├── useLocalStorage.ts
└── useDebounce.ts
```

---

# 18. Theme

Konfigurasi tampilan.

```text
theme
│
├── variables.css
├── tailwind.css
└── dark.css
```

---

# 19. Recommended Final Structure

```text
src
│
├── assets
├── components
│
│   ├── base
│   ├── dashboard
│   ├── forms
│   ├── profile
│   ├── shared
│   ├── statistics
│   └── transaction
│
├── views
│
├── stores
│
├── services
│
├── types
│
├── utils
│
├── constants
│
├── composables
│
├── layouts
│
├── hooks
│
├── plugins
│
├── router
│
├── theme
│
├── App.vue
│
└── main.ts
```

---

# 20. Folder Principles

1. Feature Independent

2. Reusable Components

3. Type Safe

4. Scalable

5. Separation of Concerns

6. Minimal Coupling

7. Maintainable

8. Future SQLite Ready

9. Firebase Ready

10. Production Ready