// 18/10/2025

export function formatDate(date?: string | Date | null): string {
  if (!date) return "—";

  try {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (isNaN(parsedDate.getTime())) return "Data inválida";

    return new Intl.DateTimeFormat("pt-BR").format(parsedDate);
  } catch {
    return "Data inválida";
  }
}
