/* eslint-disable react-hooks/exhaustive-deps */
// Calculator.js
import React, { useEffect, useState } from 'react';

const Calculator = ({ bookingDetails, extras }) => {
  const [totalExtrasPrice, setTotalExtrasPrice] = useState(10); // Default for cleaning fee
  const [totalPrice, setTotalPrice] = useState(bookingDetails?.totalPrice || 0);

  useEffect(() => {
    // Update the total price whenever extras or booking details change
    const updatedTotalPrice = calculateTotalPrice();
    setTotalPrice(updatedTotalPrice);
  }, [extras, bookingDetails]);

  const calculateTotalPrice = () => {
    let extrasPrice = 0;

    if (bookingDetails) {
      if (extras.laundry) extrasPrice += 10;
      if (extras.satelliteTV) extrasPrice += 10;
      if (extras.carRental) extrasPrice += 30;
      if (extras.seaView) extrasPrice += 10;
      if (extras.breakfast) extrasPrice += 10;
      if (extras.wifi) extrasPrice += 100;
    }

    // Include cleaning fee in the total extras price if cleaning fee is checked
    if (extras.cleaningFee) {
      extrasPrice += 10; // Adjust the calculation if needed
    }

    setTotalExtrasPrice(extrasPrice);

    if (bookingDetails && bookingDetails.totalPrice !== undefined) {
      return bookingDetails.totalPrice + extrasPrice;
    }

    return 0; // Return a default value if totalPrice is not available
  };

  return (
    <div>
      <p>Total Extras Price: ${totalExtrasPrice.toFixed(2)}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default Calculator;
