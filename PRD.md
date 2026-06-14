# MyWallet - Product Requirements Document (PRD)

**Version:** 1.0
**Status:** Planning
**Platform:** Android Mobile Application
**Project Type:** Personal Finance Tracker
**Technology Stack:** Ionic Vue, TypeScript, Pinia, TailwindCSS, Capacitor, Chart.js

---

# 1. Product Overview

MyWallet adalah aplikasi pencatatan keuangan pribadi yang membantu pengguna mencatat pemasukan dan pengeluaran, memantau saldo secara real-time, serta menganalisis kondisi keuangan melalui statistik dan visualisasi grafik.

Aplikasi dirancang sederhana, modern, mudah digunakan, dan dapat berjalan secara offline.

---

# 2. Problem Statement

Banyak orang tidak memiliki pencatatan keuangan yang terstruktur sehingga sulit mengetahui:

* Total pemasukan.
* Total pengeluaran.
* Sisa saldo saat ini.
* Pengeluaran terbesar.
* Kondisi keuangan bulanan.

MyWallet hadir untuk membantu pengguna mengelola keuangan dengan lebih mudah dan terorganisir.

---

# 3. Goals

## Business Goals

* Menjadi project portfolio.
* Mengimplementasikan teknologi Ionic Vue.
* Menunjukkan kemampuan pengembangan mobile apps.

## User Goals

* Mencatat transaksi harian.
* Memantau saldo secara real-time.
* Melihat riwayat transaksi.
* Mengetahui pola pengeluaran.
* Mengelola keuangan secara lebih baik.

---

# 4. Target User

## Primary User

### Mahasiswa

Usia:

18 - 25 tahun

Kebutuhan:

* Mengatur uang bulanan.
* Memantau pengeluaran.
* Mengetahui sisa saldo.

---

## Secondary User

### Karyawan

Usia:

22 - 40 tahun

Kebutuhan:

* Mengelola gaji.
* Mencatat pengeluaran rutin.
* Membuat laporan keuangan pribadi.

---

# 5. User Persona

## Bryan

**Umur:** 20 Tahun

**Profesi:** Mahasiswa

### Goals

* Mengontrol pengeluaran.
* Mengetahui kondisi keuangan.
* Memiliki riwayat transaksi yang rapi.

### Pain Points

* Sulit mengingat pengeluaran.
* Tidak mengetahui total pengeluaran.
* Tidak memiliki pencatatan keuangan.

---

# 6. User Flow

```text
Dashboard
    ↓
Tambah Transaksi
    ↓
Data Disimpan
    ↓
Saldo Diperbarui
    ↓
Riwayat Transaksi
    ↓
Statistik Keuangan
```

---

# 7. Navigation Structure

Bottom Navigation:

1. Dashboard
2. Transactions
3. Statistics
4. Profile

---

# 8. Features

## Dashboard

### Description

Halaman utama yang menampilkan ringkasan kondisi keuangan.

### Functional Requirements

* Menampilkan total saldo.
* Menampilkan total pemasukan.
* Menampilkan total pengeluaran.
* Menampilkan transaksi terbaru.
* Memperbarui data secara otomatis.

---

## Transactions

### Description

Halaman untuk mengelola transaksi pengguna.

### Functional Requirements

* Menambah transaksi.
* Mengedit transaksi.
* Menghapus transaksi.
* Mencari transaksi.
* Memfilter transaksi.
* Mengurutkan transaksi terbaru.

### Filter

* Semua
* Pemasukan
* Pengeluaran

---

## Statistics

### Description

Halaman analisis keuangan.

### Functional Requirements

* Menampilkan pie chart kategori pengeluaran.
* Menampilkan grafik pemasukan vs pengeluaran.
* Menampilkan total transaksi per kategori.

---

## Profile

### Description

Halaman pengaturan aplikasi.

### Functional Requirements

* Dark mode.
* Reset seluruh data.
* Informasi aplikasi.

---

# 9. Categories

## Income Categories

* Gaji
* Bonus
* Freelance
* Investasi
* Hadiah
* Lainnya

## Expense Categories

* Makanan
* Transportasi
* Belanja
* Hiburan
* Pendidikan
* Kesehatan
* Tagihan
* Lainnya

---

# 10. Data Model

## Transaction

```ts
interface Transaction {
  id: string
  title: string
  amount: number
  category: string
  type: "income" | "expense"
  date: string
  createdAt: string
  updatedAt: string
}
```

---

# 11. Validation Rules

## Title

* Wajib diisi.
* Maksimal 50 karakter.

## Amount

* Wajib diisi.
* Nilai harus lebih besar dari 0.

## Category

* Wajib dipilih.

## Type

* Wajib dipilih.

## Date

* Tidak boleh kosong.

---

# 12. Non Functional Requirements

## Performance

* Waktu loading kurang dari 2 detik.

## Availability

* Berjalan secara offline.

## Usability

* Mudah digunakan.
* UI responsif.

## Compatibility

* Android 8 ke atas.

## Security

* Data tersimpan secara lokal.

---

# 13. Local Storage Structure

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

# 14. Error Messages

| Condition            | Message                        |
| -------------------- | ------------------------------ |
| Title kosong         | Tolong isi nama transaksi      |
| Amount <= 0          | Nominal harus lebih dari 0     |
| Category kosong      | Pilih kategori terlebih dahulu |
| Gagal menyimpan data | Gagal menyimpan transaksi      |

---

# 15. Success Messages

* Transaksi berhasil ditambahkan.
* Transaksi berhasil diperbarui.
* Transaksi berhasil dihapus.
* Data berhasil direset.

---

# 16. Folder Structure

```text
src
│
├── assets
├── components
├── views
│     ├── DashboardPage.vue
│     ├── TransactionsPage.vue
│     ├── StatisticsPage.vue
│     └── ProfilePage.vue
│
├── stores
│     ├── transactionStore.ts
│     ├── profileStore.ts
│     └── themeStore.ts
│
├── types
│     └── transaction.ts
│
├── services
├── utils
├── router
└── theme
```

---

# 17. Tech Stack

| Layer             | Technology   |
| ----------------- | ------------ |
| Framework         | Ionic Vue    |
| Language          | TypeScript   |
| State Management  | Pinia        |
| Styling           | TailwindCSS  |
| Native Bridge     | Capacitor    |
| Chart             | Chart.js     |
| Storage V1        | LocalStorage |
| Storage V2        | SQLite       |
| Authentication V3 | Firebase     |

---

# 18. Future Roadmap

## Version 2

* SQLite Database
* Export PDF
* Export Excel
* Budget Planner

## Version 3

* Firebase Authentication
* Cloud Synchronization
* Backup & Restore

## Version 4

* Notification Reminder
* Financial Goals
* Multi Wallet
* Multi Language

---

# 19. Success Metrics

* User dapat menambahkan transaksi tanpa error.
* Saldo diperbarui secara otomatis.
* Data tersimpan secara lokal.
* Statistik dapat ditampilkan dengan benar.
* Aplikasi berjalan secara offline.
* APK dapat diinstal pada perangkat Android.
* UI responsif dan mudah digunakan.
