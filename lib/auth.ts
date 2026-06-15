import { SESSION_COOKIE_NAME } from "./auth/constants";

const AUTH_STORAGE_KEY = "matchmaker_auth";
const REMEMBER_USERNAME_KEY = "matchmaker_remember_username";

export { SESSION_COOKIE_NAME } from "./auth/constants";

export const MOCK_CREDENTIALS = {
  username: "admin",
  password: "cupid123",
} as const;

export interface AuthSession {
  isLoggedIn: boolean;
  username: string;
  loggedInAt: string;
}

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function setSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE_NAME}=1; path=/; max-age=${SESSION_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function clearSessionCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

export function login(
  username: string,
  password: string,
  rememberMe: boolean
): { success: true } | { success: false; error: string } {
  if (typeof window === "undefined") {
    return { success: false, error: "Authentication unavailable." };
  }

  const normalizedUsername = username.trim().toLowerCase();
  if (
    normalizedUsername !== MOCK_CREDENTIALS.username ||
    password !== MOCK_CREDENTIALS.password
  ) {
    return { success: false, error: "Invalid username or password." };
  }

  const session: AuthSession = {
    isLoggedIn: true,
    username: MOCK_CREDENTIALS.username,
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  setSessionCookie();

  if (rememberMe) {
    localStorage.setItem(REMEMBER_USERNAME_KEY, MOCK_CREDENTIALS.username);
  } else {
    localStorage.removeItem(REMEMBER_USERNAME_KEY);
  }

  return { success: true };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  clearSessionCookie();
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AuthSession;
    return session.isLoggedIn ? session : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  if (getSession() !== null) return true;
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${SESSION_COOKIE_NAME}=`);
}

export function getRememberedUsername(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(REMEMBER_USERNAME_KEY) ?? "";
}
