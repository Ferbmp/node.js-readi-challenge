import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "@/app/utils/axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import authService from "@/app/services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter();

  const verifyToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");

      return;
    }

    try {
      const user = await authService.fetchCurrentUser(token);
      setUser(user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      router.push("/");
    } catch (error) {
      logout();
      console.error("Token inválido ou erro de verificação:", error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        toast.success(`Login realizado com sucesso!`);

        router.push("/");
      }
    } catch (error) {
      console.error("Erro de login:", error);
      toast.error(`Erro ao fazer login: ${error.response.data.message}`);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    router.push("/login");
  };

  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
