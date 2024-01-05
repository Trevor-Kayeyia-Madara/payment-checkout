import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const { bookingDetails, extras, formData } = location.state || {};

  if (!bookingDetails || !extras || !formData) {
    // Handle the case where state is not available
    return <p>No booking details found. Please go back and complete the booking.</p>;
  }



  return (
    <div className='checkout'>
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
    </div>
  )
}

export default Checkout