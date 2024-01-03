import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';


const Home = () => (
  <div className="home">
  
    <div className="hero">
      <h1>Search, Book, Checkout</h1>
      <nav>
        <ul>
          <li>
            <Link to="/search">1. Search</Link>
          </li>
          <li>
            <Link to="/book">2. Book</Link>
          </li>
          <li>
            <Link to="/checkout">3. Checkout</Link>
          </li>
          <li>
            <Link to="/thank-you">4. Thank You</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);
export default Home;

