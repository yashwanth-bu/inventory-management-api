import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, getCurrentUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 Check session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (data) => {
    await loginUser(data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
