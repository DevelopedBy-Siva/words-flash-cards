export function isUsernameValid(val) {
  const name = val.trim();
  if (name.length === 0) return "Enter the name";
  if (name.length < 3) return "length cannot be less than 3";
  if (name.length > 18) return "length cannot be greater than 18";
  return null;
}
