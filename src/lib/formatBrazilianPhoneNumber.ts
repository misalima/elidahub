// Formats a Brazilian phone number to international format (+55).
// Expects input as a string with only digits (e.g., '11987654321' for São Paulo).
// Returns '+5511987654321' or throws an error if invalid.

export function formatBrazilianPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Brazilian numbers: 2 digits DDD + 9 digits (mobile)
  if (digits.length !== 11) {
    throw new Error('O número de telefone deve conter DDD (2 dígitos) e número (9 dígitos), totalizando 11 dígitos.');
  }
  return `+55${digits}`;
}
