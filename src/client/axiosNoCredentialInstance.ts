import { SERVER_URL } from "@/util/utils";
import axios from "axios";

const axiosNoCredentialInstance = axios.create({
  baseURL: `${SERVER_URL}`,
});

export default axiosNoCredentialInstance;
