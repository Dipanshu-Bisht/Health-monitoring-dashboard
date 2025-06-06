import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    // Try to load user from localStorage on first render
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Keep user state in sync with localStorage (optional, for multi-tab support)
  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(email, password);
      setUser(res.user); // Update user state
      navigate("/dashboard");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (name, email, password, age, gender) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(name, email, password, age, gender);
      navigate("/login");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return { user, handleLogin, handleSignup, handleLogout, loading, error };
};