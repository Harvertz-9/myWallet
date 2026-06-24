import { computed, reactive } from "vue";
import { useLanguageStore } from "../stores/languageStore";
import { storageService } from "../services/storageService";

export type Lang = "id" | "en";

const translations: Record<Lang, Record<string, string>> = {
  id: {
    // ===== Dashboard =====
    "dashboard.greeting_morning": "Selamat Pagi",
    "dashboard.greeting_afternoon": "Selamat Siang",
    "dashboard.greeting_evening": "Selamat Sore",
    "dashboard.greeting_night": "Selamat Malam",
    "dashboard.empty_title": "Belum Ada Transaksi",
    "dashboard.empty_desc": "Tap tombol + di bawah untuk menambahkan transaksi pertama Anda.",
    "dashboard.toast_add_success": "Transaksi berhasil ditambahkan.",
    "dashboard.toast_add_fail": "Gagal menyimpan transaksi",
    "dashboard.toast_update_success": "Transaksi berhasil diperbarui.",
    "dashboard.toast_update_fail": "Gagal memperbarui transaksi",

    // ===== Transactions =====
    "transactions.header_subtitle": "Kelola Keuangan",
    "transactions.header_title": "Riwayat Transaksi",
    "transactions.search_placeholder": "Cari transaksi...",
    "transactions.filter_all": "Semua",
    "transactions.filter_income": "Pemasukan",
    "transactions.filter_expense": "Pengeluaran",
    "transactions.filter_period": "Filter Periode",
    "transactions.empty_title": "Tidak ada transaksi",
    "transactions.empty_desc": "Tidak ada transaksi yang cocok dengan pencarian atau filter Anda.",
    "transactions.delete_title": "Hapus Transaksi?",
    "transactions.delete_msg": "Catatan transaksi ini akan dihapus secara permanen dari penyimpanan lokal Anda.",
    "transactions.toast_update_success": "Transaksi berhasil diperbarui.",
    "transactions.toast_update_fail": "Gagal memperbarui transaksi",
    "transactions.toast_delete_success": "Transaksi berhasil dihapus.",
    "transactions.toast_delete_fail": "Gagal menghapus transaksi",

    // ===== Statistics =====
    "statistics.header_subtitle": "Grafik & Ringkasan",
    "statistics.header_title": "Statistik Keuangan",
    "statistics.filter_label": "Tampilkan Periode",
    "statistics.showing": "Menampilkan",
    "statistics.reset": "Reset",
    "statistics.total_income": "Total Masuk",
    "statistics.total_expense": "Total Keluar",
    "statistics.balance": "Sisa Saldo",
    "statistics.empty_title": "Data Statistik Kosong",
    "statistics.empty_desc": "Tambahkan transaksi terlebih dahulu di Dashboard untuk memantau grafik analisis keuangan Anda.",
    "statistics.no_data_title": "Tidak Ada Data",
    "statistics.no_data_desc": "Tidak ada transaksi pada periode yang dipilih. Coba pilih periode yang lain.",
    "statistics.show_all": "Tampilkan Semua Data",

    // ===== Profile =====
    "profile.header_subtitle": "Pengaturan Aplikasi",
    "profile.header_title": "Profil & Kustomisasi",
    "profile.customize": "Kustomisasi Profil",
    "profile.login_since": "Login sejak",
    "profile.logout_title": "Keluar Akun",
    "profile.logout_desc": "Sesi login akan diakhiri",
    "profile.logout_btn": "Logout",
    "profile.logout_confirm_title": "Keluar dari Akun?",
    "profile.logout_confirm_msg": "Anda akan keluar dari akun ini. Data transaksi Anda tetap tersimpan dan dapat diakses kembali setelah login.",
    "profile.reset_title": "Reset Seluruh Data",
    "profile.reset_desc": "Hapus riwayat transaksi & profil",
    "profile.reset_btn": "Hapus",
    "profile.reset_confirm_title": "Reset Seluruh Data?",
    "profile.reset_confirm_msg": "Tindakan ini akan menghapus semua riwayat transaksi keuangan dan mereset profil Anda kembali ke setelan pabrik. Tindakan ini tidak dapat dibatalkan.",
    "profile.toast_reset_success": "Data berhasil direset.",
    "profile.toast_reset_fail": "Gagal mereset data.",

    // ===== Language =====
    "language.title": "Bahasa Aplikasi",
    "language.desc": "Ganti bahasa tampilan",
    "language.id": "Indonesia",
    "language.en": "English",

    // ===== Change Password =====
    "password.title": "Keamanan Akun",
    "password.desc": "Ubah kata sandi login",
    "password.btn": "Ubah",
    "password.modal_title": "Ubah Password",
    "password.old": "Password Lama",
    "password.old_placeholder": "Masukkan password lama",
    "password.new": "Password Baru",
    "password.new_placeholder": "Masukkan password baru (min. 6)",
    "password.confirm": "Konfirmasi Password",
    "password.confirm_placeholder": "Ulangi password baru",
    "password.save": "Simpan Password",
    "password.saving": "Menyimpan...",
    "password.error_old_required": "Password lama wajib diisi",
    "password.error_new_required": "Password baru wajib diisi",
    "password.error_new_min": "Password baru minimal 6 karakter",
    "password.error_confirm_required": "Konfirmasi password wajib diisi",
    "password.error_confirm_mismatch": "Konfirmasi password tidak cocok",
    "password.toast_success": "Password berhasil diubah.",
    "password.toast_fail": "Password lama tidak sesuai.",

    // ===== Edit Profile =====
    "edit_profile.title": "Kustomisasi Profil",
    "edit_profile.avatar_label": "Foto Profil",
    "edit_profile.camera": "Kamera",
    "edit_profile.gallery": "Galeri",
    "edit_profile.emoji": "Emoji",
    "edit_profile.emoji_label": "Atau Pilih Avatar Emoji",
    "edit_profile.name_label": "Nama Lengkap",
    "edit_profile.name_placeholder": "Masukkan nama lengkap Anda",
    "edit_profile.occupation_label": "Pekerjaan / Status",
    "edit_profile.occupation_placeholder": "e.g. Mahasiswa / Personal Finance",
    "edit_profile.bio_label": "Bio Singkat",
    "edit_profile.bio_placeholder": "Tulis bio atau catatan finansial Anda...",
    "edit_profile.bio_counter": "karakter",
    "edit_profile.save": "Simpan Perubahan",
    "edit_profile.saving": "Menyimpan...",
    "edit_profile.error_name_empty": "Nama lengkap tidak boleh kosong",
    "edit_profile.error_name_min": "Nama lengkap minimal 2 karakter",
    "edit_profile.toast_success": "Profil berhasil diperbarui.",
    "edit_profile.toast_fail": "Gagal menyimpan profil.",

    // ===== Tabs =====
    "tab.dashboard": "Dashboard",
    "tab.transactions": "Transaksi",
    "tab.statistics": "Statistik",
    "tab.profile": "Profil",

    // ===== Time Filter =====
    "time.all": "Semua Waktu",
    "time.this_month": "Bulan Ini",
    "time.last_3_months": "3 Bulan Terakhir",
    "time.last_6_months": "6 Bulan Terakhir",
    "time.this_year": "Tahun Ini",
    "time.last_year": "Tahun Lalu",

    // ===== Days =====
    "day.0": "Minggu",
    "day.1": "Senin",
    "day.2": "Selasa",
    "day.3": "Rabu",
    "day.4": "Kamis",
    "day.5": "Jumat",
    "day.6": "Sabtu",

    // ===== Auth =====
    "auth.login_title": "Masuk ke Akun",
    "auth.login_subtitle": "Kelola keuanganmu dengan mudah",
    "auth.email": "Alamat Email",
    "auth.password": "Kata Sandi",
    "auth.login_btn": "Masuk",
    "auth.logging_in": "Memproses...",
    "auth.no_account": "Belum punya akun?",
    "auth.register_link": "Daftar Sekarang",
    "auth.register_title": "Buat Akun Baru",
    "auth.register_subtitle": "Mulai perjalanan finansialmu",
    "auth.name": "Nama Lengkap",
    "auth.confirm_password": "Konfirmasi Kata Sandi",
    "auth.register_btn": "Daftar",
    "auth.registering": "Mendaftar...",
    "auth.has_account": "Sudah punya akun?",
    "auth.login_link": "Masuk di sini",

    // ===== Shared =====
    "shared.confirm": "Konfirmasi",
    "shared.cancel": "Batal",
    "shared.close": "Tutup",
    "shared.save": "Simpan",
    "shared.delete": "Hapus",
    "shared.edit": "Edit",
  },

  en: {
    // ===== Dashboard =====
    "dashboard.greeting_morning": "Good Morning",
    "dashboard.greeting_afternoon": "Good Afternoon",
    "dashboard.greeting_evening": "Good Evening",
    "dashboard.greeting_night": "Good Night",
    "dashboard.empty_title": "No Transactions Yet",
    "dashboard.empty_desc": "Tap the + button below to add your first transaction.",
    "dashboard.toast_add_success": "Transaction added successfully.",
    "dashboard.toast_add_fail": "Failed to save transaction",
    "dashboard.toast_update_success": "Transaction updated successfully.",
    "dashboard.toast_update_fail": "Failed to update transaction",

    // ===== Transactions =====
    "transactions.header_subtitle": "Manage Finances",
    "transactions.header_title": "Transaction History",
    "transactions.search_placeholder": "Search transactions...",
    "transactions.filter_all": "All",
    "transactions.filter_income": "Income",
    "transactions.filter_expense": "Expense",
    "transactions.filter_period": "Filter Period",
    "transactions.empty_title": "No transactions",
    "transactions.empty_desc": "No transactions match your search or filter criteria.",
    "transactions.delete_title": "Delete Transaction?",
    "transactions.delete_msg": "This transaction record will be permanently deleted from your local storage.",
    "transactions.toast_update_success": "Transaction updated successfully.",
    "transactions.toast_update_fail": "Failed to update transaction",
    "transactions.toast_delete_success": "Transaction deleted successfully.",
    "transactions.toast_delete_fail": "Failed to delete transaction",

    // ===== Statistics =====
    "statistics.header_subtitle": "Charts & Summary",
    "statistics.header_title": "Financial Statistics",
    "statistics.filter_label": "Show Period",
    "statistics.showing": "Showing",
    "statistics.reset": "Reset",
    "statistics.total_income": "Total Income",
    "statistics.total_expense": "Total Expense",
    "statistics.balance": "Balance",
    "statistics.empty_title": "No Statistics Data",
    "statistics.empty_desc": "Add transactions first from Dashboard to monitor your financial analysis charts.",
    "statistics.no_data_title": "No Data",
    "statistics.no_data_desc": "No transactions for the selected period. Try selecting another period.",
    "statistics.show_all": "Show All Data",

    // ===== Profile =====
    "profile.header_subtitle": "App Settings",
    "profile.header_title": "Profile & Customization",
    "profile.customize": "Customize Profile",
    "profile.login_since": "Logged in since",
    "profile.logout_title": "Sign Out",
    "profile.logout_desc": "Your login session will end",
    "profile.logout_btn": "Logout",
    "profile.logout_confirm_title": "Sign Out?",
    "profile.logout_confirm_msg": "You will be signed out of this account. Your transaction data remains saved and can be accessed again after logging in.",
    "profile.reset_title": "Reset All Data",
    "profile.reset_desc": "Delete transaction history & profile",
    "profile.reset_btn": "Delete",
    "profile.reset_confirm_title": "Reset All Data?",
    "profile.reset_confirm_msg": "This action will delete all financial transaction history and reset your profile to factory settings. This action cannot be undone.",
    "profile.toast_reset_success": "Data reset successfully.",
    "profile.toast_reset_fail": "Failed to reset data.",

    // ===== Language =====
    "language.title": "App Language",
    "language.desc": "Change display language",
    "language.id": "Indonesia",
    "language.en": "English",

    // ===== Change Password =====
    "password.title": "Account Security",
    "password.desc": "Change login password",
    "password.btn": "Change",
    "password.modal_title": "Change Password",
    "password.old": "Current Password",
    "password.old_placeholder": "Enter current password",
    "password.new": "New Password",
    "password.new_placeholder": "Enter new password (min. 6)",
    "password.confirm": "Confirm Password",
    "password.confirm_placeholder": "Re-enter new password",
    "password.save": "Save Password",
    "password.saving": "Saving...",
    "password.error_old_required": "Current password is required",
    "password.error_new_required": "New password is required",
    "password.error_new_min": "New password must be at least 6 characters",
    "password.error_confirm_required": "Confirm password is required",
    "password.error_confirm_mismatch": "Passwords do not match",
    "password.toast_success": "Password changed successfully.",
    "password.toast_fail": "Current password is incorrect.",

    // ===== Edit Profile =====
    "edit_profile.title": "Customize Profile",
    "edit_profile.avatar_label": "Profile Photo",
    "edit_profile.camera": "Camera",
    "edit_profile.gallery": "Gallery",
    "edit_profile.emoji": "Emoji",
    "edit_profile.emoji_label": "Or Choose Emoji Avatar",
    "edit_profile.name_label": "Full Name",
    "edit_profile.name_placeholder": "Enter your full name",
    "edit_profile.occupation_label": "Occupation / Status",
    "edit_profile.occupation_placeholder": "e.g. Student / Personal Finance",
    "edit_profile.bio_label": "Short Bio",
    "edit_profile.bio_placeholder": "Write your bio or financial notes...",
    "edit_profile.bio_counter": "characters",
    "edit_profile.save": "Save Changes",
    "edit_profile.saving": "Saving...",
    "edit_profile.error_name_empty": "Full name cannot be empty",
    "edit_profile.error_name_min": "Full name must be at least 2 characters",
    "edit_profile.toast_success": "Profile updated successfully.",
    "edit_profile.toast_fail": "Failed to save profile.",

    // ===== Tabs =====
    "tab.dashboard": "Dashboard",
    "tab.transactions": "Transactions",
    "tab.statistics": "Statistics",
    "tab.profile": "Profile",

    // ===== Time Filter =====
    "time.all": "All Time",
    "time.this_month": "This Month",
    "time.last_3_months": "Last 3 Months",
    "time.last_6_months": "Last 6 Months",
    "time.this_year": "This Year",
    "time.last_year": "Last Year",

    // ===== Days =====
    "day.0": "Sunday",
    "day.1": "Monday",
    "day.2": "Tuesday",
    "day.3": "Wednesday",
    "day.4": "Thursday",
    "day.5": "Friday",
    "day.6": "Saturday",

    // ===== Auth =====
    "auth.login_title": "Sign In",
    "auth.login_subtitle": "Manage your finances easily",
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.login_btn": "Sign In",
    "auth.logging_in": "Processing...",
    "auth.no_account": "Don't have an account?",
    "auth.register_link": "Register Now",
    "auth.register_title": "Create Account",
    "auth.register_subtitle": "Start your financial journey",
    "auth.name": "Full Name",
    "auth.confirm_password": "Confirm Password",
    "auth.register_btn": "Register",
    "auth.registering": "Registering...",
    "auth.has_account": "Already have an account?",
    "auth.login_link": "Sign in here",

    // ===== Shared =====
    "shared.confirm": "Confirm",
    "shared.cancel": "Cancel",
    "shared.close": "Close",
    "shared.save": "Save",
    "shared.delete": "Delete",
    "shared.edit": "Edit",
  },
};

// Dynamic translations cache
export const dynamicTranslations = reactive<Record<string, Record<string, string>>>({
  id: {},
  en: {},
});

// Load cache from localStorage immediately on module load
try {
  const cachedEn = storageService.getItem<Record<string, string> | null>("dynamic_translations_en", null);
  if (cachedEn) {
    dynamicTranslations.en = cachedEn;
  }
} catch (e) {
  console.error("Failed to load translation cache from localStorage", e);
}

/**
 * Fetch dynamic translations from Google Translate API
 */
export async function fetchDynamicTranslations(targetLang: Lang): Promise<void> {
  if (targetLang === "id") return;

  // Check if cache already loaded in memory
  if (Object.keys(dynamicTranslations[targetLang]).length > 0) {
    return;
  }

  // Check storage cache
  const cached = storageService.getItem<Record<string, string> | null>(`dynamic_translations_${targetLang}`, null);
  if (cached && Object.keys(cached).length > 0) {
    dynamicTranslations[targetLang] = cached;
    return;
  }

  const idTextMap = translations.id;
  const keys = Object.keys(idTextMap);
  const values = keys.map(key => idTextMap[key]);

  // Join the text values with a newline.
  const joinedText = values.join("\n");

  const url = "https://translate.googleapis.com/translate_a/single";
  const params = new URLSearchParams({
    client: "gtx",
    sl: "id",
    tl: targetLang,
    dt: "t",
    q: joinedText,
  });

  const response = await fetch(`${url}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Google Translate API returned status ${response.status}`);
  }

  const data = await response.json();
  if (!data || !Array.isArray(data[0])) {
    throw new Error("Invalid response format from Google Translate");
  }

  const translationMap = new Map<string, string>();
  for (const segment of data[0]) {
    if (Array.isArray(segment) && typeof segment[0] === "string" && typeof segment[1] === "string") {
      const translated = segment[0].replace(/\n$/, "").trim();
      const original = segment[1].replace(/\n$/, "").trim();
      translationMap.set(original, translated);
    }
  }

  const result: Record<string, string> = {};
  keys.forEach((key, index) => {
    const originalText = idTextMap[key];
    const trimmedOriginal = originalText.trim();

    if (translationMap.has(trimmedOriginal)) {
      result[key] = translationMap.get(trimmedOriginal)!;
    } else {
      // Fallback 1: index-based matching
      const segment = data[0][index];
      if (segment && Array.isArray(segment) && typeof segment[0] === "string") {
        result[key] = segment[0].replace(/\n$/, "").trim();
      } else {
        // Fallback 2: static translations or original text
        result[key] = translations[targetLang]?.[key] || originalText;
      }
    }
  });

  // Save to reactive state
  dynamicTranslations[targetLang] = result;
  
  // Save to cache
  storageService.setItem(`dynamic_translations_${targetLang}`, result);
}

/**
 * Composable for i18n translation.
 * Usage: const { t } = useI18n();
 */
export function useI18n() {
  const languageStore = useLanguageStore();

  const t = (key: string): string => {
    const lang = languageStore.currentLang;
    if (lang === "id") {
      return translations["id"]?.[key] || key;
    }
    return dynamicTranslations[lang]?.[key] || translations[lang]?.[key] || translations["id"]?.[key] || key;
  };

  const currentLang = computed(() => languageStore.currentLang);

  return { t, currentLang };
}

