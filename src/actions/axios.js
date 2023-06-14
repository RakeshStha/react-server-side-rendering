import axios from 'axios';
import { Config } from '../Config';

export const api = axios.create({
    baseURL: Config.BaseUrl,
})

api.interceptors.request.use(
  config => {
        config.headers['X-RapidAPI-Key'] = Config.rapidKey;
        config.headers['X-RapidAPI-Host'] = Config.rapidHost;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const success = (type, payload) => {
    return {type: type, payload}
}

export const failure = (type, payload) => {
    return {type: type, payload}
}

export const processing = (type, payload) => {
    return {type: type, payload}
}