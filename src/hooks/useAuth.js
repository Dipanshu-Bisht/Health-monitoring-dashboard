import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginUser(email, password);
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
      const res = await registerUser(name, email, password, age, gender);
      navigate("/login");
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleSignup, loading, error };
};
