const BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? token : ''
  };
};

export const addHealthLog = async (logData) => {
  const response = await fetch(`${BASE_URL}/health/add-log`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(logData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add log');
  return data;
};

export const getHealthLogs = async () => {
  const response = await fetch(`${BASE_URL}/health/logs`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch logs');
  return data;
};

export const updateHealthLog = async (logId, updatedData) => {
  const response = await fetch(`${BASE_URL}/health/update-log/${logId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updatedData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update log');
  return data;
};

export const deleteHealthLog = async (logId) => {
  const response = await fetch(`${BASE_URL}/health/delete-log/${logId}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete log');
  return data;
};
