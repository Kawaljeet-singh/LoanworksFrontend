export const convertDateToStringForForm = (
  date: string | Date,
  isMonthOnly?: boolean
) => {
  if (!date) return "";
  let d = date;
  if (typeof date === "string") d = new Date(date);
  else d = date;
  const month = d.getMonth() < 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const year = d.getFullYear();

  return isMonthOnly ? `${year}-${month}` : `${day}/${month}/${year}`;
};

export const ddmmyyyyToISOString = (dateString: string) => {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return "";
  const parts = dateString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month - 1, day + 1);
  return date.toISOString();
};
