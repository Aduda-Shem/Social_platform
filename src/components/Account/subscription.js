import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subscription = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentDetailsChange = (event) => {
    setPaymentDetails(event.target.value);
  };

  const handlePaymentSubmit = () => {
    if (paymentDetails) {
      toast.success(`Payment successful via ${paymentMethod}`);
      setIsPaymentSuccessful(true);
    } else {
      toast.error('Please enter valid payment details.');
    }
  };

  return (
    <div>
      <h2>Payment Method</h2>
      <div>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => handlePaymentMethodChange('paypal')}
          />
          PayPal
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="mpesa"
            checked={paymentMethod === 'mpesa'}
            onChange={() => handlePaymentMethodChange('mpesa')}
          />
          M-Pesa
        </label>
      </div>

      {paymentMethod && !isPaymentSuccessful && (
        <div>
          <h3>Payment Details</h3>
          <input
            type="text"
            placeholder={`Enter ${paymentMethod === 'mpesa' ? 'M-Pesa number' : 'PayPal details'}`}
            value={paymentDetails}
            onChange={handlePaymentDetailsChange}
          />
          <button onClick={handlePaymentSubmit}>Submit</button>
        </div>
      )}

      {isPaymentSuccessful && <p>You are a premium user!</p>}

      <ToastContainer />
    </div>
  );
};

export default Subscription;
