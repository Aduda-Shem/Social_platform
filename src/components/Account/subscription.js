import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPaypal, FaMobile } from 'react-icons/fa';

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
    <div className="max-w-md mx-auto p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => handlePaymentMethodChange('paypal')}
            className="mr-2"
          />
          <FaPaypal className="text-3xl" /> PayPal
        </label>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="mpesa"
            checked={paymentMethod === 'mpesa'}
            onChange={() => handlePaymentMethodChange('mpesa')}
            className="mr-2"
          />
          <FaMobile className="text-3xl" /> M-Pesa
        </label>
      </div>

      {paymentMethod && !isPaymentSuccessful && (
        <div>
          <h3 className="text-xl font-bold mb-2">Enter Payment Details</h3>
          <input
            type="text"
            placeholder={`Enter ${paymentMethod === 'mpesa' ? 'M-Pesa number' : 'PayPal details'}`}
            value={paymentDetails}
            onChange={handlePaymentDetailsChange}
            className="p-2 border rounded mb-2"
          />
          <button
            onClick={handlePaymentSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      )}

      {isPaymentSuccessful && (
        <p className="text-green-500 font-bold mt-4">Congratulations! You are a premium user!</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default Subscription;
