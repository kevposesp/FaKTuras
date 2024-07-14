import axios from "axios";
import coreConfig from "../config";

export const httpClient = axios.create({
    baseURL: coreConfig.EXPRESS_URL
});

const setToken = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem("jwt")) {
        httpClient.defaults.headers.common['x-access-token'] = localStorage.getItem("jwt");
    } else {
        httpClient.defaults.headers.common['x-access-token'] = '';
    }
    localStorage.getItem("jwt")
};

const expressApiService = {
    get(path) {
        setToken();
        return httpClient.get(path)
            .catch((error) => {
                throw error;
            });
    },
    post(path, body) {
        setToken();
        return httpClient.post(path, body)
            .catch((error) => {
                throw error;
            });
    },
    put(path, body) {
        setToken();
        return httpClient.put(path, body)
            .catch((error) => {
                throw error;
            });
    },
    delete(path) {
        setToken();
        return httpClient.delete(path)
            .catch((error) => {
                throw error;
            });
    }
};

export default expressApiService;