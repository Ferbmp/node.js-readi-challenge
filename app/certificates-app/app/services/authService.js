import axios from "../utils/axios";
const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post("/users/login", { email, password });
      return response.data;
    } catch (error) {
      console.error("Erro de login:", error.response);
      throw error;
    }
  },

  fetchCurrentUser: async (token) => {
    try {
      const response = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Token inválido ou erro de verificação:", error);
      throw error;
    }
  },
};

export default authService;
