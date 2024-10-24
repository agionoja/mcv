export function getRelativeTime(date: Date): string {
  const now = new Date();
  const givenDate = new Date(date);

  // Difference in time (milliseconds)
  const diffTime: number = Math.abs(now.getTime() - givenDate.getTime());

  // Convert to days
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Convert to weeks
  const diffWeeks: number = Math.floor(diffDays / 7);

  // Calculate months difference
  const diffMonths: number =
    now.getMonth() -
    givenDate.getMonth() +
    12 * (now.getFullYear() - givenDate.getFullYear());

  // Calculate years difference
  const diffYears: number = now.getFullYear() - givenDate.getFullYear();

  if (diffDays < 7) {
    return `Last ${diffDays} day${diffDays > 1 ? "s" : ""}`;
  } else if (diffWeeks < 4) {
    return `Last ${diffWeeks} week${diffWeeks > 1 ? "s" : ""}`;
  } else if (diffMonths < 1) {
    return "Last month";
  } else if (diffMonths <= 3) {
    return `Last ${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
  } else if (diffYears <= 1) {
    return "Last year";
  } else {
    return `More than ${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }
}
