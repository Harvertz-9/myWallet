export const formatRupiah = (value: number): string => {
  if (isNaN(value)) return "Rp0";
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
  return formatted.replace(/\s/g, "");
};
