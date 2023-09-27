import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.9.254:3000/"
})

export default api;