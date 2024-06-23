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

export const getCameras = async () => {
  return fetchWithToken(`${API_URL}/cameras`);
};

export const getUsers = async () => {
  return fetchWithToken(`${API_URL}/users`);
};

export const getUserById = async (id) => {
  return fetchWithToken(`${API_URL}/users/${id}`);
};

export const createUser = async (user) => {
  return fetchWithToken(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const updateUser = async (id, user) => {
  return fetchWithToken(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const deleteUser = async (id) => {
  return fetchWithToken(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
};

export const createCamera = async (camera) => {
  return fetchWithToken(`${API_URL}/cameras`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(camera),
  });
};

export const deleteCamera = async (id) => {
  return fetchWithToken(`${API_URL}/cameras/${id}`, {
    method: 'DELETE',
  });
};

export const startBloodyHell = async () => {
  return fetchWithToken(`${API_URL}/bloody-hell/start`, {
    method: 'POST',
  });
};

export const stopBloodyHell = async () => {
  return fetchWithToken(`${API_URL}/bloody-hell/stop`, {
    method: 'POST',
  });
};
