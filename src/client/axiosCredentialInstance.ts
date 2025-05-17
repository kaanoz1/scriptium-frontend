import { SERVER_URL } from "@/util/utils";
import axios from "axios";

const axiosCredentialInstance = axios.create({
  baseURL: `${SERVER_URL}`,
  withCredentials: true,
});

export default axiosCredentialInstance;
