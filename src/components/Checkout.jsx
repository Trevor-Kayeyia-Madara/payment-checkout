import React, { useState, useEffect } from 'react';
import { useLocation, Link  } from 'react-router-dom';
import './checkout.css';
import Calculator from './Calculator';

function Checkout() {
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState('');
  const { bookingDetails, extras, formData } = location.state || {};
  const [creditCardInfo, setCreditCardInfo] = useState({ cardType: '', bank: '', amount: 0 });
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate the total amount based on room and extras
    const calculatedTotalAmount = calculateTotalAmount(bookingDetails, extras);
    setTotalAmount(calculatedTotalAmount);
  }, [bookingDetails, extras]);

  const calculateTotalAmount = (bookingDetails, extras) => {
    // Implement your logic to calculate the total amount
    // For example, sum the room rate and extras costs
    const roomRate = bookingDetails?.roomRate || 0;
    const extrasTotal = Object.values(extras).reduce((total, cost) => total + cost, 0);

    return roomRate + extrasTotal;
  };

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleBookNow = async () => {
    try {
      const { guestFolioNumber } = formData || {};

      if (!guestFolioNumber) {
        console.error('GuestFolioNumber is not defined.');
        return;
      }

      const paymentInfo = {
        cardType: creditCardInfo.cardType,
        bank: creditCardInfo.bank,
        amount: totalAmount,
        guestFolioNumber: guestFolioNumber,
      };

      // Assuming you have an API endpoint for payment processing
      const paymentResponse = await fetch('http://localhost:3000/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentInfo),
      });

      if (paymentResponse.ok) {
        console.log('Payment processed successfully');
        // Continue with any additional logic or navigation after successful payment
      } else {
        console.error('Failed to process payment');
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error as needed
    }
  };

  if (!bookingDetails || !extras || !formData) {
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
              <Link to="/book"><span className='circle'>2</span> Book</Link>
            </li>
            <li>
              <Link to="/checkout"><span className='circle active'>3</span> Checkout</Link>
            </li>
            <li>
              <Link to="/thank-you"><span className='circle'>4</span> Thank You</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="checkout-container">
      <div className='checkout-aside'>
          <div className='checkout-data'>
            <img src={bookingDetails?.roomTypeImage} alt={bookingDetails?.roomType} />
            <h5 className='title'>YOUR RESERVATION</h5>
            <p>Property: {bookingDetails?.roomType}</p>
            <p>Check-in Date: {bookingDetails?.checkInDate}</p>
            <p>Check-out Date: {bookingDetails?.checkOutDate}</p>
            <p>Guests: {bookingDetails?.guests}</p>
            <p>Nights: {bookingDetails?.nights}</p>
         
          </div>
          <p><i>INCLUDED : 3 $ CITY TAX ( person * night )<br />
              INCLUDED : 22 % VAT ALREADY APPLIED
            </i></p>
          </div>
          <div className='checkout-content'>
          <div className='guest-info'>
            <h2>Guest Information</h2>
            <p>First Name: {formData.firstName}</p>
            <p>Surname: {formData.surname}</p>
            <p>Email: {formData.email}</p>
            <p>Phone Number: {formData.phoneNumber}</p>
            <p>City: {formData.city}</p>
            <p>Country: {formData.country}</p>
            <p>ZIP: {formData.zip}</p>
          </div>
          <div className='selected-extras'>
            <h2>Selected Extras</h2>
            <ul>
              {Object.entries(extras).map(([key, value]) => (
                <li key={key}>{value && key}</li>
              ))}
            </ul>
          </div>
          <Calculator bookingDetails={bookingDetails} extras={extras} />
          <div className='payment-selection'>
            <h2>Payment Selection</h2>
            <div className='payment-options'>
  <button className="payment-option" onClick={() => handlePaymentSelection('BANK_TRANSFER')}>
    Bank Transfer
  </button>
  <button className="payment-option" onClick={() => handlePaymentSelection('PAYPAL')}>
    PayPal
  </button>
  <button className="payment-option" onClick={() => handlePaymentSelection('CREDIT_CARD')}>
    Credit Card
  </button>
  <button className="payment-option" onClick={() => handlePaymentSelection('PAYMENT_ON_ARRIVAL')}>
    Payment on Arrival
  </button>
  <button className="payment-option" onClick={() => handlePaymentSelection('BOOKING_REQUEST')}>
    Booking Request
  </button>
</div>
{selectedPayment === 'CREDIT_CARD' && (
          <div className="credit-card-form">
            <label>
              Card Type:
              <input type="text" name="cardType" value={creditCardInfo.cardType} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cardType: e.target.value })} />
            </label>
            <label>
              Bank:
              <input type="text" name="bank" value={creditCardInfo.bank} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, bank: e.target.value })} />
            </label>
            {/* Amount will be autofilled from the total amount */}
          </div>
        )}
          </div>

          {/* Book Now button */}
          <button onClick={handleBookNow} disabled={!selectedPayment}>
            {selectedPayment === 'BANK_TRANSFER' ? 'Book Now' : 'Pay Now'}
          </button>
        </div>
        </div>
    </div>
  )
}

export default Checkout