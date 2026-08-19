import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { registerUnauthorizedHandler } from "../api/client";

const AuthContext = createContext(null);

const SESSION_LENGTH = 30 * 60 * 1000;

function isExpired() {
  const exp = localStorage.getItem("token_exp");
  if (!exp) return true;
  return Date.now() > Number(exp);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved && !isExpired()) {
      setUser(JSON.parse(saved));
    } else if (saved) {
      logout();
    }
    setLoading(false);
  }, [logout]);

  useEffect(() => {
    registerUnauthorizedHandler(() => logout());
  }, [logout]);

  async function login(username, password) {
    const res = await fetch(
    `https://auth-react-devjoint.onrender.com/users?username=${username}&password=${password}`

    );
    const found = await res.json();

    if (!found.length) {
      throw new Error("Wrong username or password");
    }

    const token = btoa(`${username}:${Date.now()}`);
    const expiresAt = Date.now() + SESSION_LENGTH;

    localStorage.setItem("token", token);
    localStorage.setItem("token_exp", String(expiresAt));
    localStorage.setItem("user", JSON.stringify({ username }));

    setUser({ username });
  }

  useEffect(() => {
    window.__expireSession = () => {
      localStorage.setItem("token_exp", "0");
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}