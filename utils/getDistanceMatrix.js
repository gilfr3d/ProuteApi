import axios from 'axios';

async function getDistanceMatrix(origin, destination, apiKey) {
  const apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json';
  const params = {
    origins: origin,
    destinations: destination,
    key: apiKey,
  };

  try {
    const response = await axios.get(apiUrl, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
    throw new Error('Error fetching distance matrix');
  }
}

export { getDistanceMatrix };