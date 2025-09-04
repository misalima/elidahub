// Formats a Brazilian phone number from international (+55) to (99) 99999-9999
export function formatPhoneDisplay(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");
  // Remove country code if present
  const local = digits.startsWith("55") ? digits.slice(2) : digits;
  if (local.length !== 11) return phone; // fallback if not valid
  return `(${local.slice(0,2)}) ${local.slice(2,7)}-${local.slice(7)}`;
}
