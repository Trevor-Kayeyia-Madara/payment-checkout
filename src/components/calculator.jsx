// Calculator.js

import React from 'react';

const Calculator = ({ selectedRoom, selectedExtras }) => {
  const calculateTotal = () => {
    const roomPrice = selectedRoom ? selectedRoom.price : 0;
    const extrasTotal = selectedExtras.reduce((total, extra) => total + extra.price, 0);
    return roomPrice + extrasTotal;
  };

  return (
    <div>
      <h2>Calculator</h2>
      <p>Selected Room: {selectedRoom ? `${selectedRoom.name} - $${selectedRoom.price}` : 'None'}</p>
      <p>Selected Extras:</p>
      <ul>
        {selectedExtras.map((extra) => (
          <li key={extra.id}>{extra.name} - ${extra.price}</li>
        ))}
      </ul>
      <p>Total: ${calculateTotal()}</p>
    </div>
  );
};

export default Calculator;
