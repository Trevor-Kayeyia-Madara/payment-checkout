// extrasApi.js

const EXTRAS_API_URL = 'https://www.legrandforestdreams.com/nd-booking-pages/nd-booking-page/';

export const fetchExtras = async () => {
  try {
    const response = await fetch(EXTRAS_API_URL);
    const data = await response.json();
    return data.extras; // Adjust the data structure based on the actual API response
  } catch (error) {
    console.error('Error fetching extras:', error);
    throw error;
  }
};
