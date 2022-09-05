import axios from "axios";

const api = axios.create({
    baseURL: 'https://app-api-instagram.herokuapp.com'
});

export default api;