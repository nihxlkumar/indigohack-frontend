import axios from '../api/axios';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },
  create: async (data) => {
    try {
      const response = await axios.post("/auth/create", data);
      return response.data;
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  },
};

export default AuthService;
