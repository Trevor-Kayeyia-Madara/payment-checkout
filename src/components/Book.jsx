import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './book.css';

function Book() {
    // Use the useLocation hook to get the state passed during navigation
  const location = useLocation();
  const bookingDetails = location.state && location.state.bookingDetails;

  if (!bookingDetails) {
    // Handle the case where bookingDetails is not available
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
      <div>
          <p>Property: {bookingDetails.roomType}</p>
          <p>Check-in Date: {bookingDetails.checkInDate}</p>
          <p>Check-out Date: {bookingDetails.checkOutDate}</p>
          <p>Guests: {bookingDetails.guests}</p>
          <p>Nights: {bookingDetails.nights}</p>
          <p>Total Price: {bookingDetails.totalPrice}</p>
        </div>
    </div>
  )
}

export default Book