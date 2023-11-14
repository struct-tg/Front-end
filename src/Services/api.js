import axios from "axios";

const api = axios.create({
    /* Digite aqui o seu endereço de IPv4. O caminho é: Front-end/src/services/api.js */
    baseURL: "http://192.168.155.1:3000/"
})

export default api;