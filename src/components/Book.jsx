import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Calculator from './Calculator';
import './book.css';

function Book() {
  const location = useLocation();
  const navigate = useNavigate();  // Add this line
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

  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phoneNumber: '',
    city: '',
    country: '',
    zip: '',
  });

  const handleExtrasChange = (extra) => {
    setExtras((prevExtras) => ({
      ...prevExtras,
      [extra]: !prevExtras[extra],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookNow = () => {
    const { roomType, checkInDate, checkOutDate, guests, nights, totalPrice } = bookingDetails;

  // Assuming you have a function or logic to save data to the database
  // You can make a fetch request to your backend endpoint
  // and pass formData to insert data into "Room" and "Guest" tables

  // For example, you can make a fetch request here
  fetch('http://localhost:3000/insert-room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room_type: roomType,
      no_of_persons: guests,
      room_rate: totalPrice, // You can adjust this based on your data
      arrival_date: checkInDate,
      departure_date: checkOutDate,
      nights_spent: nights,
      status: 'available',
    }),
  })
    .then((response) => response.json())
    .then((roomData) => {
      // Assuming you handle the response appropriately
      console.log(roomData);

      // Now, make a fetch request for inserting into the Guest table
      fetch('http://localhost:3000/insert-guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          surname: formData.surname,
          email: formData.email,
          phone_number: formData.phoneNumber,
          city: formData.city,
          country: formData.country,
          zip: formData.zip,
          room_type: roomType,
          extras: {}, // Adjust this based on your data
        }),
      })
        .then((guestResponse) => guestResponse.json())
        .then((guestData) => {
          // Assuming you handle the response appropriately
          console.log(guestData);


            navigate('/checkout');
            console.log('Navigate to /checkout');

            // Redirect logic can be added based on your actual navigation setup
          })
          .catch((error) => console.error('Error inserting guest data:', error));
      })
      .catch((error) => console.error('Error inserting room data:', error));
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
                  <form
          onSubmit={(e) => e.preventDefault()}
          style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}
        >
          <label style={{ display: 'block', margin: '10px 0' }}>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '5px' }}
            />
          </label>
          <label style={{ display: 'block', margin: '10px 0' }}>
            Surname:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '5px' }}
            />
          </label>
          <label style={{ display: 'block', margin: '10px 0' }}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '5px' }}
            />
          </label>
          <label style={{ display: 'block', margin: '10px 0' }}>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '5px' }}
            />
          </label>
          <label style={{ display: 'block', margin: '10px 0' }}>
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '5px' }}
            />
          </label>
          <label style={{ display: 'block', margin: '10px 0' }}>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '5px' }}
            />
          </label>
          <label style={{ display: 'block', margin: '10px 0' }}>
            ZIP:
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginTop: '5px' }}
            />
          </label>

          <button
            type="button"
            onClick={() => handleBookNow(formData)}
            style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
          >
            Book Now
          </button>
        </form>

        </div>
      </div>
    </div>
  );
}

export default Book;
