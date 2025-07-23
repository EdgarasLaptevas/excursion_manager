import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [roles, setRoles] = useState(() => {
    try {
      const stored = localStorage.getItem("roles");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [userId, setUserId] = useState(() => {
    const stored = localStorage.getItem("userId");
    return stored ? Number(stored) : null;
  });

  const isLoggedIn = !!token;

  const login = (data) => {
    setToken(data.token);
    setRoles(data.roles || []);
    setUserId(data.userId || null);

    localStorage.setItem("token", data.token);
    localStorage.setItem("roles", JSON.stringify(data.roles) || []);
    localStorage.setItem("userId", String(data.userId) || "");
  };

  const logout = () => {
    setToken(null);
    setRoles([]);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
  };

  const value = useMemo(
    () => ({
      token,
      roles,
      userId,
      isLoggedIn,
      login,
      logout,
    }),
    [token, roles, userId, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}