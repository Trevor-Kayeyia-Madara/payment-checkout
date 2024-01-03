import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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

const Search = () => <h2>Search Page</h2>;
const Book = () => <h2>Book Page</h2>;
const Checkout = () => <h2>Checkout Page</h2>;
const ThankYou = () => <h2>Thank You Page</h2>;

const Path = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/book" element={<Book />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  </Router>
);

export default Path;
