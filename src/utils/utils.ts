/**
 * Function that returns the current age of an athlete
 *
 * @param dateOfBirth - The birth date of the athlete. Must be a Date instance
 * @returns The age as a number
 */
export function getCompAge(dateOfBirth: Date): number {
  const yearOfBirth = dateOfBirth.getFullYear();
  const now = new Date();

  let currentAge = now.getFullYear() - yearOfBirth;

  // If birthday hasn't occurred yet this year, subtract 1
  if (
    now.getMonth() < dateOfBirth.getMonth() ||
    (now.getMonth() === dateOfBirth.getMonth() &&
      now.getDate() < dateOfBirth.getDate())
  ) {
    currentAge -= 1;
  }

  return currentAge;
}

export function formatTimeDifference(isoString: string): string {
  const now = new Date();
  const past = new Date(isoString);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "há poucos segundos";
  if (minutes < 60)
    return `há ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  if (hours < 24) return `há ${hours} ${hours === 1 ? "hora" : "horas"}`;
  return `há ${days} ${days === 1 ? "dia" : "dias"}`;
}

export function formatDateTime(
  isoString: string,
  type: "day" | "hour"
): string {
  const date = new Date(isoString);

  if (type === "day") {
    // Returns something like "2025-11-01"
    return date.toISOString().split("T")[0];
  }

  if (type === "hour") {
    // Returns something like "14:43"
    return date.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // remove AM/PM
    });
  }

  throw new Error("Invalid type. Use 'day' or 'hour'.");
}
