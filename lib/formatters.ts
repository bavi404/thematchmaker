/** Shared string formatters — single source of truth */

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatLabel(value: string): string {
  return value
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }
): string {
  return new Date(iso).toLocaleDateString("en-US", options);
}

export function formatMaritalStatus(
  status: `${string}-${string}` | string
): string {
  return formatLabel(status);
}
