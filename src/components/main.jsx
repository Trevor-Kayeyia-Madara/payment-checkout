// MainComponent.js

import React, { useState, useEffect } from 'react';
import RoomSelection from './room';
import ExtrasSelection from './extra';
import Calculator from './calculator';
import { fetchRooms } from '../assets/roomApi';
import { fetchExtras } from '..assets/extrasApi';

const MainComponent = () => {
  const [rooms, setRooms] = useState([]);
  const [extras, setExtras] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  useEffect(() => {
    // Fetch rooms and extras when the component mounts
    const fetchData = async () => {
      try {
        const roomsData = await fetchRooms();
        const extrasData = await fetchExtras();

        setRooms(roomsData);
        setExtras(extrasData);
      } catch (error) {
        // Handle error fetching data
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <RoomSelection rooms={rooms} onRoomSelect={(room) => setSelectedRoom(room)} />
      <ExtrasSelection extras={extras} onExtrasSelect={(selected) => setSelectedExtras(selected)} />
      <Calculator selectedRoom={selectedRoom} selectedExtras={selectedExtras} />
    </div>
  );
};

export default MainComponent;
