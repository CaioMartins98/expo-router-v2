import axios from "axios";

const api = axios.create({
  baseURL: "https://nodejs-crud-97u8.onrender.com/",
});

export default api;
