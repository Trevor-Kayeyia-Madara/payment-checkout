// RoomSelection.js

import React, { useState } from 'react';

const RoomSelection = ({ rooms, onRoomSelect }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    onRoomSelect(room);
  };

  return (
    <div>
      <h2>Room Selection</h2>
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            onClick={() => handleRoomSelect(room)}
            className={selectedRoom === room ? 'selected' : ''}
          >
            {room.name} - ${room.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomSelection;
