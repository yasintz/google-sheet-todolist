export function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function formatDate(date: Date) {
  return new Date(date).toJSON().slice(0, 10);
}
