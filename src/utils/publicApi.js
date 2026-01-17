import axios from "axios";

const publicAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default publicAPI;
