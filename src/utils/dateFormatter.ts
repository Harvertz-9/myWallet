export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  // Check if dateString is just YYYY-MM-DD
  // In Javascript, parsing "YYYY-MM-DD" as a date treats it as UTC, which can cause timezone shifts.
  // Replacing dashes with slashes or appending time can resolve this.
  const parts = dateString.split("-");
  let date: Date;
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // months are 0-based
    const day = parseInt(parts[2], 10);
    date = new Date(year, month, day);
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export const formatDateTime = (dateTimeString: string): string => {
  if (!dateTimeString) return "";
  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return dateTimeString;

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
