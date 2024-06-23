const API_URL = 'http://localhost:3000/api';

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    credentials: 'include',  // Включаем куки в запрос
  });

  return response.json();
};

export const checkAuth = async () => {
  const response = await fetch(`${API_URL}/auth/check`, {
    method: 'GET',
    credentials: 'include',  // Включаем куки в запрос
  });

  return response.ok;
};

const fetchWithToken = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = {};
  }

  options.credentials = 'include';  // Включаем куки в запрос

  const response = await fetch(url, options);
  return response.json();
};

export const getEvents = async () => {
  return fetchWithToken(`${API_URL}/events`);
};
