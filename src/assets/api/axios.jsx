// axios.js
import axios from 'axios';
import apiConfig, { headers } from './apiConfig';

const instance = axios.create(apiConfig);

// Add interceptors
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const history = useHistory();

        // Check if the error status is 401 (Unauthorized) or 403 (Forbidden)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Redirect to the login page
            history.push('/login');
        }

        // Handle other error cases here if needed

        return Promise.reject(error);
    }
);

export default instance;