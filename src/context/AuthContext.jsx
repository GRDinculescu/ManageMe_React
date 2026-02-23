import { createContext, useContext, useEffect, useMemo, useState } from "react";
import usersData from "../data/users.json";
import productsData from "../data/products.json";

const AuthContext = createContext(null);
const USERS_STORAGE_KEY = "users";
const PRODUCTS_STORAGE_KEY = "products";

// Authentication based on local JSON data, insecure, but enough
// Is a context, that mean that you can acces the user everywere
export function AuthProvider({ children }) { 
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("authUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [users, setUsers] = useState(() => {
    if (typeof window === "undefined") return usersData.users || [];
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData.users || []));
    return usersData.users || [];
  });

  const [products, setProducts] = useState(() => {
    if (typeof window === "undefined") return productsData.products || [];
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsData.products || []));
    return productsData.products || [];
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const login = (identifier, password) => {
    const normalizedId = identifier.trim().toLowerCase();

    const match = users.find((candidate) => {
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
      users,
      products,
      setUsers,
      setProducts,
      isAuthenticated: Boolean(user),
      role: user?.role || null,
    }),
    [user, users, products]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
