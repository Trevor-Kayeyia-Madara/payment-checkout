import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Calculator from './Calculator';
import './book.css';

function Book() {
  const location = useLocation();

  const bookingDetails = location.state && location.state.bookingDetails;

  const [extras, setExtras] = useState({
    laundry: false,
    satelliteTV: false,
    carRental: false,
    seaView: false,
    breakfast: false,
    wifi: false,
    cleaningFee: true, // Default checked
  });

  const handleExtrasChange = (extra) => {
    setExtras((prevExtras) => ({
      ...prevExtras,
      [extra]: !prevExtras[extra],
    }));
  };

  const calculateTotalPrice = () => {
    let extrasPrice = 0;

    if (bookingDetails) {
      if (extras.laundry) extrasPrice += 10 * (bookingDetails.guests || 0) * (bookingDetails.nights || 0);
      if (extras.satelliteTV) extrasPrice += 10 * (bookingDetails.guests || 0) * (bookingDetails.nights || 0);
      if (extras.carRental) extrasPrice += 30 * (bookingDetails.nights || 0);
      if (extras.seaView) extrasPrice += 10 * (bookingDetails.nights || 0);
      if (extras.breakfast) extrasPrice += 10 * (bookingDetails.guests || 0) * (bookingDetails.nights || 0);
      if (extras.wifi) extrasPrice += 100 * (bookingDetails.nights || 0);
    }

    return extrasPrice;
  };

  return (
    <div className='book'>
      <div className="hero">
        <h1>SEARCH</h1>
        <nav>
          <ul>
            <li>
              <Link to="/search"><span className=' circle'>1</span> Search</Link>
            </li>
            <li>
              <Link to="/book"><span className='circle  active'>2</span> Book</Link>
            </li>
            <li>
              <Link to="/checkout"><span className='circle'>3</span> Checkout</Link>
            </li>
            <li>
              <Link to="/thank-you"><span className='circle'>4</span> Thank You</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='book-container'>
        <div className='book-aside'>
          <div className='book-data'>
            <img src={bookingDetails?.roomTypeImage} alt={bookingDetails?.roomType} />
            <h5 className='title'>YOUR RESERVATION</h5>
            <p>Property: {bookingDetails?.roomType}</p>
            <p>Check-in Date: {bookingDetails?.checkInDate}</p>
            <p>Check-out Date: {bookingDetails?.checkOutDate}</p>
            <p>Guests: {bookingDetails?.guests}</p>
            <p>Nights: {bookingDetails?.nights}</p>
         
          </div>
          <p><i>NOT INCL : 3 $ CITY TAX ( person * night )<br />
              INCLUDED : 22 % VAT ALREADY APPLIED
          </i></p>
        </div>
        <div className='book-content'>
          <div className='extras'>
            <h2>Extra Services</h2>
            <label>
              <input type='checkbox' checked={extras.laundry} onChange={() => handleExtrasChange('laundry')} />
              Laundry: $10 (Guest/Night)
            </label>
            <label>
              <input type='checkbox' checked={extras.satelliteTV} onChange={() => handleExtrasChange('satelliteTV')} />
              Satellite TV: $10 (Guest/Night)
            </label>
            <label>
              <input type='checkbox' checked={extras.carRental} onChange={() => handleExtrasChange('carRental')} />
              Car Rental: $30 (Room/Night)
            </label>
            <label>
              <input type='checkbox' checked={extras.seaView} onChange={() => handleExtrasChange('seaView')} />
              Sea View: $10 (Room/Night)
            </label>
            <label>
              <input type='checkbox' checked={extras.breakfast} onChange={() => handleExtrasChange('breakfast')} />
              Breakfast: $10 (Guest/Night)
            </label>
            <label>
              <input type='checkbox' checked={extras.wifi} onChange={() => handleExtrasChange('wifi')} />
              Wifi: $100 (Room/Night)
            </label>
            <label>
              <input type='checkbox' checked={extras.cleaningFee} disabled />
              Cleaning Fee: $10 (Room/Trip)
            </label>
          </div>
          <Calculator bookingDetails={bookingDetails} extras={extras} />
          {/* The rest of your content */}
        </div>
      </div>
    </div>
  );
}

export default Book;
