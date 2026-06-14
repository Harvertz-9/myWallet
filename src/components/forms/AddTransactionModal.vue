<template>
  <BaseModal
    :is-open="isOpen"
    title="Tambah Transaksi"
    @close="onClose"
  >
    <form
      class="space-y-5"
      @submit.prevent="handleSubmit"
    >
      <!-- Type Switcher (Segment) -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
          Jenis Transaksi
        </label>
        <ion-segment
          :value="type"
          color="primary"
          @ionChange="handleTypeChange"
        >
          <ion-segment-button value="income">
            <ion-label class="font-semibold">Pemasukan</ion-label>
          </ion-segment-button>
          <ion-segment-button value="expense">
            <ion-label class="font-semibold">Pengeluaran</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>

      <!-- Title Input -->
      <BaseInput
        v-model="title"
        label="Nama Transaksi"
        placeholder="E.g. Makan Siang, Gaji Bulanan"
        :maxlength="50"
        :error="errors.title"
      />

      <!-- Amount Input -->
      <AmountInput
        v-model="amount"
        label="Nominal"
        :error="errors.amount"
      />

      <!-- Category Select -->
      <CategorySelect
        v-model="category"
        :type="type"
        :error="errors.category"
      />

      <!-- Date Input -->
      <BaseInput
        v-model="date"
        type="date"
        label="Tanggal"
        :error="errors.date"
      />

      <!-- Note Input (Optional) -->
      <BaseInput
        v-model="note"
        label="Catatan Tambahan (Opsional)"
        placeholder="Catatan kecil..."
      />

      <div class="pt-4 flex gap-3">
        <BaseButton
          variant="secondary"
          class="flex-1"
          @click="onClose"
        >
          Batal
        </BaseButton>
        <BaseButton
          type="submit"
          variant="primary"
          class="flex-1"
        >
          Simpan
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";
import BaseModal from "../base/BaseModal.vue";
import BaseInput from "../base/BaseInput.vue";
import BaseButton from "../base/BaseButton.vue";
import AmountInput from "./AmountInput.vue";
import CategorySelect from "./CategorySelect.vue";
import { Transaction } from "../../types/transaction";
import { generateUUID } from "../../utils/uuidGenerator";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "save", transaction: Transaction): void;
  (e: "close"): void;
}>();

// Form States
const type = ref<"income" | "expense">("expense");
const title = ref("");
const amount = ref(0);
const category = ref("");
// Default date YYYY-MM-DD
const date = ref(new Date().toLocaleDateString("en-CA")); // CA returns YYYY-MM-DD
const note = ref("");

// Validation Errors
const errors = ref({
  title: "",
  amount: "",
  category: "",
  date: "",
});

// Reset category when type changes
const handleTypeChange = (e: any) => {
  type.value = e.detail.value;
  category.value = "";
  errors.value.category = "";
};

const resetForm = () => {
  type.value = "expense";
  title.value = "";
  amount.value = 0;
  category.value = "";
  date.value = new Date().toLocaleDateString("en-CA");
  note.value = "";
  errors.value = {
    title: "",
    amount: "",
    category: "",
    date: "",
  };
};

const validate = (): boolean => {
  let isValid = true;
  errors.value = {
    title: "",
    amount: "",
    category: "",
    date: "",
  };

  if (!title.value.trim()) {
    errors.value.title = "Tolong isi nama transaksi";
    isValid = false;
  } else if (title.value.length > 50) {
    errors.value.title = "Nama transaksi maksimal 50 karakter";
    isValid = false;
  }

  if (amount.value <= 0) {
    errors.value.amount = "Nominal harus lebih dari 0";
    isValid = false;
  }

  if (!category.value) {
    errors.value.category = "Pilih kategori terlebih dahulu";
    isValid = false;
  }

  if (!date.value) {
    errors.value.date = "Tanggal tidak boleh kosong";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (!validate()) return;

  const now = new Date().toISOString();
  const newTransaction: Transaction = {
    id: generateUUID(),
    title: title.value.trim(),
    amount: amount.value,
    category: category.value,
    type: type.value,
    date: date.value,
    note: note.value.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  emit("save", newTransaction);
  resetForm();
};

const onClose = () => {
  resetForm();
  emit("close");
};

// Reset form fields when opened
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      resetForm();
    }
  }
);
</script>
