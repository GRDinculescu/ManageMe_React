import { createContext, useContext, useEffect, useMemo, useState } from "react";
import usersData from "../data/users.json";

const AuthContext = createContext(null);

// Authentication based on local JSON data, insecure, but enough
// Is a context, that mean that you can acces the user everywere
export function AuthProvider({ children }) { 
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  const login = (identifier, password) => {
    const normalizedId = identifier.trim().toLowerCase();

    const match = usersData.users.find((candidate) => {
      const { username, email, name } = candidate;
      return (
        username?.toLowerCase() === normalizedId ||
        email?.toLowerCase() === normalizedId ||
        name.toLowerCase() === normalizedId
      );
    });

    if (!match) {
      return { success: false, message: "Usuario no encontrado" };
    }

    if (match.password && match.password !== password) {
      return { success: false, message: "Contraseña incorrecta" };
    }

    const sessionUser = {
      id: match.id,
      name: match.name,
      username: match.username,
      email: match.email,
      role: match.rol,
    };

    setUser(sessionUser);
    return { success: true, user: sessionUser };
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
      role: user?.role || null,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
