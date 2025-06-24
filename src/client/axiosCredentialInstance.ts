import axios from "axios";

const SERVER_URL = "http://192.168.1.2:5227"; //TODO: Remove

const axiosCredentialInstance = axios.create({
  baseURL: `${SERVER_URL}`,
  withCredentials: true,
});

export default axiosCredentialInstance;
