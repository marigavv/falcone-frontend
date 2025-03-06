import axios from 'axios';

const API_BASE_URL = 'https://findfalcone.geektrust.com'; // UNIVERSAL API URL

export const fetchPlanets = async () => {
  const response = await axios.get(`${API_BASE_URL}/planets`);
  return response.data;
};

export const fetchVehicles = async () => {
  const response = await axios.get(`${API_BASE_URL}/vehicles`);
  return response.data;
};

export const fetchToken = async () => {
  const response = await axios.post(`${API_BASE_URL}/token`, {}, {
    headers: { Accept: 'application/json' },
  });
  return response.data.token;
};

export const findFalcone = async (token, planetNames, vehicleNames) => {
  const response = await axios.post(`${API_BASE_URL}/find`, {
    token,
    planet_names: planetNames,
    vehicle_names: vehicleNames,
  }, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  return response.data;
};