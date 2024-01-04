import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 import villa from './images/sultan.jpg';
 import dyke from './images/dyke collage.jpg';
import './search.css';

function Search() {
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('1');
  const [selectedNights, setSelectedNights] = useState('1');
  const [maxNightPrice, setMaxNightPrice] = useState(50);

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleCheckInDateChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutDateChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleGuestsChange = (event) => {
    setSelectedGuests(event.target.value);
  };

  const handleNightsChange = (event) => {
    setSelectedNights(event.target.value);
  };

  const handleMaxNightPriceChange = (event) => {
    setMaxNightPrice(parseInt(event.target.value, 10));
  };

  const handleBookNow = (property, price) => {
    const bookingData = {
      property,
      checkInDate,
      checkOutDate,
      guests: selectedGuests,
      nights: selectedNights,
      totalPrice: price,
    };

    const apiUrl = 'https://your-backend-api.com/bookings';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Booking response:', data);
        // Handle the response from the server, e.g., show a thank-you message
      })
      .catch(error => {
        console.error('Error booking:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };

  return (
    <div className='search'>
      <div className="hero">
        <h1>SEARCH</h1>
        <nav>
          <ul>
            <li>
              <Link to="/search"><span className=' circle active'>1</span> Search</Link>
            </li>
            <li>
              <Link to="/book"><span className='circle'>2</span> Book</Link>
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
      <div className='search-container'>
        <aside className="search-aside">
          <label>
            Branch:
            <select value={selectedBranch} onChange={handleBranchChange}>
              <option value="All Branches">All Branches</option>
              <option value="Beach House">Beach House</option>
              <option value="Hotel Room">Hotel Room</option>
            </select>
          </label>

          <label>
            Check-in Date:
            <input type="date" value={checkInDate} onChange={handleCheckInDateChange} />
          </label>

          <label>
            Check-out Date:
            <input type="date" value={checkOutDate} onChange={handleCheckOutDateChange} />
          </label>

          <label>
            Guests:
            <select value={selectedGuests} onChange={handleGuestsChange}>
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guest</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guest</option>
              <option value="6">6 Guests</option>
              <option value="7">7 Guest</option>
              <option value="8">8 Guests</option>
              <option value="9">9 Guest</option>
              <option value="10">10 Guests</option>
              <option value="11">11 Guest</option>
              <option value="12">12 Guests</option>
              <option value="13">13 Guest</option>
              <option value="14">14 Guests</option>
              <option value="15">15 Guest</option>
              <option value="16">16 Guests</option>
              <option value="17">17 Guest</option>
              <option value="18">18 Guests</option>
            </select>
          </label>

          <label>
            Nights:
            <select value={selectedNights} onChange={handleNightsChange}>
              <option value="1">1 Night</option>
              <option value="2">2 Nights</option>
              <option value="3">3 Night</option>
              <option value="4">4 Nights</option>
              <option value="5">5 Night</option>
              <option value="6">6 Nights</option>
              <option value="7">7 Night</option>
              <option value="8">8 Nights</option>
            </select>
          </label>
        </aside>
        <div className='search-content'>
          <div className="search-progress-bar">
            <label>Max Night Price:</label>
            <input
              type="range"
              value={maxNightPrice}
              min="1"
              max="700"
              step="1"
              onChange={handleMaxNightPriceChange}
            />
            <div className="progress-label">
              <span>${maxNightPrice}</span>
            </div>
          </div>

          {/* Card for Villa Sultan */}
          <div className="search-card">
            <img src={villa} alt="Villa Sultan" />
            <div className="card-details">
              <h2>Villa Sultan</h2>
              <p>Beach House</p>
              <div className="icons">
                <div className="user-icon">8 Guests</div>
                <div className="size-icon">40ft</div>
              </div>
              <button onClick={() => handleBookNow('Villa Sultan', 200)}>Book Now for $200</button>
            </div>
          </div>

          {/* Card for Dyke Cottage */}
          <div className="search-card">
            <img src={dyke} alt="Dyke Cottage" />
            <div className="card-details">
              <h2>Dyke Cottage</h2>
              <p>Beach House</p>
              <div className="icons">
                <div className="user-icon">8 Guests</div>
                <div className="size-icon">40ft</div>
              </div>
              <button onClick={() => handleBookNow('Dyke Cottage', 200)}>Book Now for $200</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
