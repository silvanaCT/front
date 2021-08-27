import axios from "axios";

const api = axios.create({
  baseURL: "https://shrouded-dusk-91038.herokuapp.com",
});

export default api;