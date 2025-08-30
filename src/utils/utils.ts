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
    (now.getMonth() === dateOfBirth.getMonth() && now.getDate() < dateOfBirth.getDate())
  ) {
    currentAge -= 1;
  }

  return currentAge;
}
