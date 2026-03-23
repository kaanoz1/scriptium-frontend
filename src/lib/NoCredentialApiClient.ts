import axios from 'axios';
import {EnvGuard} from "@/util/EnvGuard";

export const noCredentialsApiClient = axios.create({
    baseURL: EnvGuard.ApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
    validateStatus: () => true,
});