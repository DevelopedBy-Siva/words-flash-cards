import { STORAGE_KEY } from "../assets/constants";

export function isUserPresent() {
  const item = localStorage.getItem(STORAGE_KEY);
  if (!item) return false;
  return item;
}
