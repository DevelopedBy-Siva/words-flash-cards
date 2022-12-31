import { STORAGE_KEY } from "../assets/constants";

export function createUser(userName) {
  const user = userName.trim().toLowerCase();
  const obj = {
    user,
  };
  localStorage.removeItem(STORAGE_KEY);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}
