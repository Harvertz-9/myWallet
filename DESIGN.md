# MyWallet - Design Documentation

## Version

1.0

---

# 1. Design Philosophy

MyWallet dirancang dengan prinsip:

* Simple
* Clean
* Modern
* User Friendly
* Mobile First

Inspirasi desain:

* Money Manager
* Spendee
* Wallet by BudgetBakers

---

# 2. Design Goals

Tujuan desain:

* Mudah dipahami oleh pengguna baru.
* Menampilkan informasi keuangan secara jelas.
* Meminimalkan jumlah klik untuk setiap aktivitas.
* Memberikan pengalaman penggunaan yang nyaman.

---

# 3. Design Style

## UI Style

Modern Minimalist

Karakteristik:

* Rounded corners
* Soft shadow
* Large typography
* Plenty of white space
* Simple navigation

---

# 4. Color System

## Primary Color

Emerald

```css
#10B981
```

Digunakan untuk:

* Saldo
* Tombol utama
* Indicator positif

---

## Income Color

Green

```css
#22C55E
```

Digunakan untuk:

* Pemasukan
* Income chart

---

## Expense Color

Red

```css
#EF4444
```

Digunakan untuk:

* Pengeluaran
* Expense chart

---

## Background Color

Light Mode

```css
#F9FAFB
```

Dark Mode

```css
#111827
```

---

## Text Colors

Primary

```css
#111827
```

Secondary

```css
#6B7280
```

Disabled

```css
#9CA3AF
```

---

# 5. Typography

## Font Family

Default:

```css
Inter
```

Fallback:

```css
sans-serif
```

---

## Font Size

### Heading

32px

Weight:

700

---

### Sub Heading

24px

Weight:

600

---

### Title

18px

Weight:

600

---

### Body

16px

Weight:

400

---

### Caption

14px

Weight:

400

---

# 6. Border Radius

Card

```css
20px
```

Button

```css
16px
```

Input

```css
16px
```

Modal

```css
24px
```

---

# 7. Shadow

Card

```css
shadow-md
```

Floating Button

```css
shadow-lg
```

Modal

```css
shadow-xl
```

---

# 8. Spacing System

Small

8px

Medium

16px

Large

24px

Extra Large

32px

---

# 9. Navigation Structure

Bottom Tab Navigation

```text
Dashboard
Transactions
Statistics
Profile
```

---

# 10. Dashboard Page

## Purpose

Memberikan gambaran kondisi keuangan pengguna.

---

## Components

### Header

Berisi:

* Greeting
* Tanggal

---

### Balance Card

Menampilkan:

* Total saldo

Warna:

Emerald

---

### Summary Cards

Income Card

Berwarna hijau.

Expense Card

Berwarna merah.

---

### Recent Transactions

Menampilkan:

5 transaksi terbaru.

---

### Floating Action Button

Ikon:

*

Fungsi:

Tambah transaksi.

---

# 11. Transactions Page

## Components

### Search Bar

Mencari transaksi berdasarkan nama.

---

### Filter Chips

* Semua
* Income
* Expense

---

### Transaction List

Menampilkan:

* Icon kategori
* Nama transaksi
* Nominal
* Tanggal

---

### Swipe Action

Kiri:

Edit

Kanan:

Delete

---

# 12. Statistics Page

## Components

### Pie Chart

Distribusi kategori pengeluaran.

---

### Bar Chart

Perbandingan:

Income vs Expense

---

### Monthly Summary

Menampilkan:

* Total pemasukan
* Total pengeluaran
* Sisa saldo

---

# 13. Profile Page

## Components

### User Card

Menampilkan:

* Foto
* Nama pengguna

---

### Settings

* Dark Mode
* About App
* Reset Data

---

# 14. Forms

## Add Transaction Modal

Fields:

### Title

Text Input

---

### Amount

Number Input

---

### Type

Segment Button

Income

Expense

---

### Category

Dropdown

---

### Date

Date Picker

---

### Save Button

Primary Button

---

# 15. Buttons

## Primary Button

Background:

Emerald

Text:

White

Radius:

16px

---

## Secondary Button

Background:

Gray

Text:

Black

---

## Danger Button

Background:

Red

Text:

White

---

# 16. Cards

Card Radius

20px

Padding

16px

Shadow

Medium

---

# 17. Icons

Library:

Ionicons

---

Income

```text
arrow-down-circle
```

---

Expense

```text
arrow-up-circle
```

---

Statistics

```text
pie-chart
```

---

Profile

```text
person-circle
```

---

Wallet

```text
wallet
```

---

# 18. Empty State

No Transactions

Illustration

Text:

"No transactions yet"

Button:

"Add Transaction"

---

# 19. Loading State

Skeleton Loader

Digunakan pada:

* Dashboard
* Transaction List
* Statistics

---

# 20. Error State

Text

```text
Something went wrong
```

Button

```text
Try Again
```

---

# 21. Dark Mode

Background

```css
#111827
```

Card

```css
#1F2937
```

Primary Text

```css
#F9FAFB
```

Secondary Text

```css
#9CA3AF
```

---

# 22. Responsive Design

Minimum Width

320px

Target Width

360px - 430px

---

# 23. Accessibility

Minimum Touch Area

44px

Color Contrast

WCAG AA

Large Typography

Enabled

---

# 24. Animation

Duration

200ms

---

Transitions

Fade

Slide Up

Scale

---

Floating Button

Scale Animation

---

Cards

Fade In

---

# 25. Future Design Improvements

* Multi Wallet Support
* Theme Customization
* Custom Accent Color
* Dynamic Icons
* Material You Support
* Tablet Layout
* Landscape Mode

---

# 26. Design Principles

1. Simplicity First

2. Consistency

3. Minimal Cognitive Load

4. Accessibility

5. Performance

6. Mobile First

7. Visual Hierarchy

8. Readability

9. Responsive Layout

10. Delightful User Experience
