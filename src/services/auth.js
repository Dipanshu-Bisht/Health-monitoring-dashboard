const BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (name, email, password, age, gender) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, age, gender })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');

    return data;
  } catch (error) {
    throw error;
  }
};
