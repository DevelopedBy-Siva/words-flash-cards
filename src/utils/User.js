import { STORAGE_KEY } from "../assets/constants";

export function createUser(userName) {
  const user = userName.trim().toLowerCase();
  const obj = {
    user,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  sessionStorage.setItem(STORAGE_KEY, "user_created");
}

export function isUserPresent() {
  const item = localStorage.getItem(STORAGE_KEY);
  if (item) return true;
  return false;
}

export function getUser() {
  const item = localStorage.getItem(STORAGE_KEY);
  if (!item) return (window.location = "/");

  const { user } = JSON.parse(item);

  const response = {
    user,
    isNewUser: false,
  };
  const isNewUser = sessionStorage.getItem(STORAGE_KEY);
  if (isNewUser) {
    response.isNewUser = true;
  }

  return response;
}
