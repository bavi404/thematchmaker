const AUTH_STORAGE_KEY = "matchmaker_auth";
const REMEMBER_USERNAME_KEY = "matchmaker_remember_username";

export const MOCK_CREDENTIALS = {
  username: "admin",
  password: "cupid123",
} as const;

export interface AuthSession {
  isLoggedIn: boolean;
  username: string;
  loggedInAt: string;
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
  return getSession() !== null;
}

export function getRememberedUsername(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(REMEMBER_USERNAME_KEY) ?? "";
}
