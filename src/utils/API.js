import axios from 'axios';
import { getAccessTokenFromLocalStorage } from './functions';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

const requestInterpreter = (config) => {
    const accessToken = getAccessTokenFromLocalStorage();
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
}

axiosInstance.interceptors.request.use(requestInterpreter)

export default axiosInstance;
