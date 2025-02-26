import axios from "axios";

const axiosInstance=axios.create()

// axiosInstance.defaults.baseURL="http://localhost:8001"
axiosInstance.defaults.baseURL="https://portfolio-builder-backend-ochre.vercel.app"
axiosInstance.defaults.withCredentials=true

export default axiosInstance