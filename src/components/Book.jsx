import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './book.css';

function Book() {
  const location = useLocation();
  const bookingDetails = location.state && location.state.bookingDetails;

  const [extras, setExtras] = useState({
    vat: 22, // VAT in percentage
  });

  const calculateTotalPrice = () => {
    const basePrice = bookingDetails.totalPrice || 0;
    const vat = (extras.vat / 100) * basePrice;

    return basePrice + vat;
  };

  useEffect(() => {
    // Update the total price whenever bookingDetails or extras change
    // You can also include other dependencies if needed
    calculateTotalPrice();
  }, [bookingDetails, extras]);

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }
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
              <img src={bookingDetails.roomTypeImage} alt={bookingDetails.roomType} />
              <h5 className='title'>YOUR RESERVATION</h5>
              <p>Property: {bookingDetails.roomType}</p>
              <p>Check-in Date: {bookingDetails.checkInDate}</p>
              <p>Check-out Date: {bookingDetails.checkOutDate}</p>
              <p>Guests: {bookingDetails.guests}</p>
              <p>Nights: {bookingDetails.nights}</p>
              <p>Total Price: ${calculateTotalPrice().toFixed(2)}</p>
           </div>
          </div>
        </div>
        <p><i>NOT INCL : 3 $ CITY TAX ( person * night )<br />
INCLUDED : 22 % VAT ALREADY APPLIED
</i></p>
    </div>
  )
}

export default Book