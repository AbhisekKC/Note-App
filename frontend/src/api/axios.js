import axios from "axios";

const url = import.meta.env.VITE_API_URL

// for users
export const userApi = axios.create({
    baseURL: `${url}/user`,
    withCredentials:true,
    headers:{
        'Content-type': 'application/json',
    }
});


// Interceptor: Intercepts every outgoing request to automatically inject the token
export const noteApi = axios.create({
  baseURL: `${url}/user/note`, // Swap with your actual base backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Intercepts every outgoing request to automatically inject the token
noteApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Must match the key used in your login form
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//for admin users
export const authApi = axios.create({
  baseURL: `${url}/admin`, // Swap with your actual base backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// for ai
export const aiApi = axios.create({
  baseURL: `${url}/ai`, // Swap with your actual base backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

aiApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Must match the key used in your login form
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
