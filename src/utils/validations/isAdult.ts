import { ddmmyyyyToISOString } from "../helpers/convertDate";

function getAge(dateString: string) {
  const today = new Date();
  const birthDate = new Date(ddmmyyyyToISOString(dateString));
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const isAdult = (value: string) => getAge(value) >= 18;

export const isFuture = (value: string) =>
  new Date(ddmmyyyyToISOString(value)) > new Date();
