import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setAuth = (jwt) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
};

export const clearAuth = () => {
  delete api.defaults.headers.common['Authorization'];
};

const maybeJwt = localStorage.getItem('jwt');
if (maybeJwt) {
  setAuth(maybeJwt);
}
