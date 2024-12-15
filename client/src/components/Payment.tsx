import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState<number>(100);  // Amount in INR, needs to be in paise (100 INR = 10000 paise)
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => alert('Failed to load Razorpay script');
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      alert('Razorpay script is not loaded properly!');
      return;
    }

    try {
      // Send request to your backend to create an order
      const { data } = await axios.post('http://localhost:5000/payment/create-order', {
        amount: amount * 100, // Amount in paise
        currency: 'INR',
      });

      const { orderId, amount: orderAmount, currency } = data;

      // Razorpay payment options
      const options = {
        key: 'your_test_key_id',  // Replace with your Razorpay key
        amount: orderAmount,  // Amount in paise
        currency: currency,
        name: 'Your Business Name',
        description: 'Payment for Order',
        order_id: orderId,  // Order ID received from backend
        handler: async function (response: any) {
          const { payment_id } = response;

          // Send payment success details to the backend
          await axios.post('http://localhost:5000/payment/payment-success', {
            order_id: orderId,
            payment_id: payment_id,
            user_email: email,
            user_name: name,
          });

          alert('Payment successful and transaction recorded!');
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: '#F37254',
        },
      };

      // Open Razorpay checkout
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Error initiating payment:', err);
      alert('Failed to initiate payment!');
    }
  };

  return (
    <div>
      <h2>Payment Form</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(Number(e.target.value))} 
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
