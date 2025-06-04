import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    // Load user from localStorage on initialization
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(email, password);
      const userData = { email, token: response.token };
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const handleSignup = async (name, email, password, age, gender) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(name, email, password, age, gender);
      const userData = { name, email, age, gender, token: response.token };
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return { handleLogin, handleSignup, loading, user, error };
};