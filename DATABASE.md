# MyWallet - Database Documentation

Version: 1.0

---

# 1. Overview

MyWallet menggunakan pendekatan Offline First.

Storage yang digunakan:

Version 1

- LocalStorage

Version 2

- SQLite

Tujuan:

- Menyimpan transaksi pengguna.
- Menyimpan preferensi aplikasi.
- Menyimpan data profil pengguna.
- Memastikan aplikasi tetap berjalan tanpa koneksi internet.

---

# 2. Storage Architecture

```text
UI
↓
Pinia Store
↓
Service Layer
↓
Storage
(LocalStorage / SQLite)
```

---

# 3. Entities

MyWallet memiliki tiga entity utama:

1. Transaction
2. Profile
3. Settings

---

# 4. Transaction Entity

Transaction merupakan data utama aplikasi.

## TypeScript Interface

```ts
export interface Transaction {
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

# 5. Transaction Fields

| Field | Type | Required | Description |
|---------|-----|----------|-------------|
| id | string | Yes | UUID transaksi |
| title | string | Yes | Nama transaksi |
| amount | number | Yes | Nominal uang |
| category | string | Yes | Kategori transaksi |
| type | income \| expense | Yes | Jenis transaksi |
| date | string | Yes | Tanggal transaksi |
| note | string | No | Catatan tambahan |
| createdAt | string | Yes | Waktu dibuat |
| updatedAt | string | Yes | Waktu diperbarui |

---

# 6. Transaction Example

```json
{
  "id": "a8d2f3",
  "title": "Makan Siang",
  "amount": 25000,
  "category": "Food",
  "type": "expense",
  "date": "2026-06-14",
  "note": "Ayam Geprek",
  "createdAt": "2026-06-14T09:00:00Z",
  "updatedAt": "2026-06-14T09:00:00Z"
}
```

---

# 7. Profile Entity

Data profil pengguna.

## Interface

```ts
export interface Profile {
    name: string
    photo?: string
}
```

---

# 8. Profile Fields

| Field | Type | Required |
|---------|-----|----------|
| name | string | Yes |
| photo | string | No |

---

# 9. Profile Example

```json
{
    "name": "Bryan",
    "photo": ""
}
```

---

# 10. Settings Entity

Digunakan untuk menyimpan konfigurasi aplikasi.

## Interface

```ts
export interface Settings {
    darkMode: boolean
}
```

---

# 11. Settings Example

```json
{
    "darkMode": false
}
```

---

# 12. LocalStorage Structure

## transactions

```json
[
  {
    "id": "",
    "title": "",
    "amount": 0,
    "category": "",
    "type": "",
    "date": "",
    "createdAt": "",
    "updatedAt": ""
  }
]
```

---

## profile

```json
{
    "name": "",
    "photo": ""
}
```

---

## settings

```json
{
    "darkMode": false
}
```

---

# 13. Storage Keys

| Key | Description |
|------|-------------|
| transactions | Menyimpan seluruh transaksi |
| profile | Menyimpan profil pengguna |
| settings | Menyimpan pengaturan aplikasi |

---

# 14. Income Categories

- Salary
- Bonus
- Freelance
- Investment
- Gift
- Others

---

# 15. Expense Categories

- Food
- Transportation
- Shopping
- Entertainment
- Education
- Health
- Bills
- Others

---

# 16. Validation Rules

## Title

- Required
- Maximum 50 characters

---

## Amount

- Required
- Must be greater than zero

---

## Category

- Required

---

## Type

Must be:

```ts
"income"
```

or

```ts
"expense"
```

---

## Date

Required.

---

# 17. SQLite Schema (Version 2)

## transactions

```sql
CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    note TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
```

---

## profiles

```sql
CREATE TABLE profiles (
    name TEXT NOT NULL,
    photo TEXT
);
```

---

## settings

```sql
CREATE TABLE settings (
    dark_mode INTEGER DEFAULT 0
);
```

---

# 18. Entity Relationship Diagram

```text
Profile
    │
    │
    └──── User Preferences
                 │
                 ↓
             Settings


Transactions
(independent entity)
```

---

# 19. Future Tables

Version 3

## wallets

```sql
CREATE TABLE wallets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    balance REAL NOT NULL
);
```

---

## budgets

```sql
CREATE TABLE budgets (
    id TEXT PRIMARY KEY,
    category TEXT,
    limit_amount REAL
);
```

---

Version 4

## goals

```sql
CREATE TABLE goals (
    id TEXT PRIMARY KEY,
    title TEXT,
    target_amount REAL,
    current_amount REAL
);
```

---

# 20. Database Principles

1. Offline First

2. Type Safe

3. UUID Based

4. Immutable IDs

5. Future SQLite Compatible

6. Easy Migration

7. Scalable Schema

8. Minimal Redundancy

9. Maintainable Structure

10. Strong Data Consistency