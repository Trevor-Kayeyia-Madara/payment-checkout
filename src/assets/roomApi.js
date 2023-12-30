// roomApi.js

const ROOM_API_URL = 'https://www.legrandforestdreams.com/nd-booking-pages/nd-booking-search/';

export const fetchRooms = async () => {
  try {
    const response = await fetch(ROOM_API_URL);
    const data = await response.json();
    return data.rooms; // Adjust the data structure based on the actual API response
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
