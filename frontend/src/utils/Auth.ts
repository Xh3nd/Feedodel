const AUTH_KEY = "feedodel_auth";

export function setAuthenticated(value: boolean) {
  if (value) {
    localStorage.setItem(AUTH_KEY, "1");
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function clearAuthenticated() {
  localStorage.removeItem(AUTH_KEY);
}
