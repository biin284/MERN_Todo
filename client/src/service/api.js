import axios from "axios";

const api = axios.create({ baseURL : "https://mern-todo-tgff.onrender.com/api" });
export default api;