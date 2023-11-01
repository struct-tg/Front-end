import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.155.1:3000/"
})

export default api;