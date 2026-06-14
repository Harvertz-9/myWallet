# 💰 MyWallet

A modern offline-first personal finance tracker built with Ionic Vue, TypeScript, Pinia, and TailwindCSS.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Android-green)
![Framework](https://img.shields.io/badge/Ionic-Vue-3880FF)
![License](https://img.shields.io/badge/license-MIT-yellow)

---

# 📖 Overview

MyWallet adalah aplikasi pencatatan keuangan pribadi yang memungkinkan pengguna untuk:

- Mencatat pemasukan.
- Mencatat pengeluaran.
- Melihat saldo secara real-time.
- Memantau kondisi keuangan melalui statistik.
- Mengelola transaksi secara offline.

Project ini dibuat sebagai personal project dan portfolio menggunakan:

- Ionic Vue
- TypeScript
- Pinia
- TailwindCSS
- Capacitor
- Chart.js

---

# ✨ Features

## Dashboard

- Total Balance
- Total Income
- Total Expense
- Recent Transactions

---

## Transaction Management

- Add Transaction
- Edit Transaction
- Delete Transaction
- Search Transaction
- Filter Transaction

---

## Statistics

- Expense Pie Chart
- Income vs Expense Chart
- Monthly Summary

---

## Profile

- Dark Mode
- Reset Data
- About Application

---

## Offline First

- LocalStorage (V1)
- SQLite (V2)

---

# 📱 Screenshots

Coming Soon

---

# 🛠 Tech Stack

| Layer | Technology |
|---------|------------|
| Framework | Ionic Vue |
| Language | TypeScript |
| State Management | Pinia |
| Styling | TailwindCSS |
| Native Runtime | Capacitor |
| Charts | Chart.js |
| Storage V1 | LocalStorage |
| Storage V2 | SQLite |
| Authentication V3 | Firebase |

---

# 📂 Project Structure

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
├── composables
├── layouts
├── hooks
├── plugins
├── router
├── theme
│
├── App.vue
└── main.ts
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/myWallet.git
```

---

## Enter Project

```bash
cd myWallet
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
ionic serve
```

Application:

```text
http://localhost:8100
```

---

# 📦 Build Android

Build web assets:

```bash
npm run build
```

Sync Capacitor:

```bash
npx cap sync
```

Run Android:

```bash
npx cap open android
```

---

# 🏗 Architecture

MyWallet follows Layered Architecture.

```text
Presentation Layer
        ↓
Components Layer
        ↓
Pinia Store
        ↓
Service Layer
        ↓
Storage Layer
```

---

# 🗂 Documentation

Project documentation is available inside:

```text
docs
```

### Product

- PRD.md
- ROADMAP.md

### Design

- DESIGN.md

### Architecture

- ARCHITECTURE.md
- FOLDER_STRUCTURE.md

### Components

- COMPONENTS.md

### Data

- DATABASE.md

### State Management

- STATE_MANAGEMENT.md

---

# 🔄 Development Roadmap

## Version 1.0

- [ ] Dashboard
- [ ] CRUD Transactions
- [ ] Statistics
- [ ] Dark Mode

---

## Version 2.0

- [ ] SQLite
- [ ] Export PDF
- [ ] Export Excel

---

## Version 3.0

- [ ] Multi Wallet
- [ ] Budget Planner

---

## Version 4.0

- [ ] Firebase Authentication
- [ ] Cloud Sync

---

## Version 5.0

- [ ] Notifications
- [ ] Multi Language

---

# 🎯 Project Goals

- Build a modern finance tracker.
- Learn Ionic Vue ecosystem.
- Implement scalable architecture.
- Create a portfolio-quality mobile application.

---

# 🔮 Future Features

- Budget Planner
- Financial Goals
- Multi Wallet
- Export PDF
- Export Excel
- Firebase Authentication
- Cloud Synchronization
- Backup & Restore
- Notifications
- Multi Language
- Material You Theme

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Bryan

Software Engineering Student

Built with ❤️ using Ionic Vue + TypeScript