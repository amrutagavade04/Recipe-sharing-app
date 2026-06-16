import axiosInstance from "./axiosInstance";

export const registerUser = (data) => {
  return axiosInstance.post("/api/user/register", data);
};

export const loginUser = (data) => {
  return axiosInstance.post("/api/user/login", data);
};