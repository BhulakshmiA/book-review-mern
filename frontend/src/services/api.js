import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your Express backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach JWT token to headers before sending
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle 401 Unauthorized errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear the token if the server rejects the request
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Note: In a production app, you would redirect to /login here
        }
        return Promise.reject(error);
    }
);

export default api;