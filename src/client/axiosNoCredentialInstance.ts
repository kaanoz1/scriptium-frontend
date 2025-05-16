import { SERVER_URL } from "@/util/utils";
import axios from "axios";

const axiosNoCredentialInstance = axios.create({
  baseURL: `${SERVER_URL}`,
  validateStatus: () => true,
});

export default axiosNoCredentialInstance;
