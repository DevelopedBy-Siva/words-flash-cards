import { STORAGE_KEY } from "../assets/contants";

export function createUser(userName) {
  const user = userName.trim().toLowerCase();
  const obj = {
    user,
  };
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
      setTimeout(resolve, 3000);
    } catch (ex) {
      reject(ex);
    }
  });
}
