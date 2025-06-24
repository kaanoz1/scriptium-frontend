import axios from "axios";

const SERVER_URL = "http://192.168.1.2:5227"; //TODO: Remove

const axiosNoCredentialInstance = axios.create({
  baseURL: `${SERVER_URL}`,
});

export default axiosNoCredentialInstance;
