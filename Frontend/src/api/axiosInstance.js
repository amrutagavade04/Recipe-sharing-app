import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://recipe-sharing-app-bqlp.onrender.com",
});

export default axiosInstance;
