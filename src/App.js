import React from 'react';
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Book from './components/Book';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';


const App = () => (
  <div>
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/book" element={<Book />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  </Router>
  </div>
);

export default App;
