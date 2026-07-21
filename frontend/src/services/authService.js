import apiClient from "./apiClient";

async function login(username, password) {
  const response = await apiClient.post("/api/auth/public/login", {
    username,
    password,
  });

  return response.data;
}

async function register(userData) {
  const response = await apiClient.post("/api/auth/public/register", userData);

  return response.data;
}

const authService = {
  login,
  register,
};

export default authService;
