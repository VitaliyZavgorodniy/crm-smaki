import apiFactory from './api';
import { API_PREFIX, API_URL } from './config';

const api = apiFactory({
    apiUrl  : API_URL,
    prefix  : API_PREFIX,
    onError : error => console.log('Connection error: ', error)
});

export default api;
