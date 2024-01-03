import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';


const Home = () => (
  <div className="home">
  
    <div className="hero">
      <h1>SEARCH</h1>
      <nav>
        <ul>
          <li>
            <Link to="/search"><span className='circle'>1</span> Search</Link>
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
  </div>
);
export default Home;

