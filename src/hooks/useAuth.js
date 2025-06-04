import { useState } from "react";
import { loginUser, registerUser } from "../services/api";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.token);
      setUser({ email, token: response.token });
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
      localStorage.setItem("token", response.token);
      setUser({ email, token: response.token });
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