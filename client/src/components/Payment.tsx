import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [amount, setAmount] = useState<number>(100); // Amount in INR
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); // To display the success message

  const handlePayment = async () => {
    if (!(window as any).Razorpay) {
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
        key: 'rzp_test_bOwceQRO4AM94Q', // Replace with your Razorpay key
        amount: orderAmount, // Amount in paise
        currency: currency,
        name: 'Wyrestack technologies',
        description: 'Payment for Order',
        order_id: orderId, // Order ID received from backend
        handler: async function (response: any) {
          const { payment_id } = response;

          try {
            // Notify backend about payment success
            await axios.post('http://localhost:5000/payment/payment-success', {
              order_id: orderId,
              payment_id: payment_id,
              user_email: email,
              user_name: name,
            });

            // Show success message
            setSuccessMessage('Payment successful and transaction recorded!');
            alert("payment sucess")
          } catch (backendError) {
            console.error(backendError);
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: 'hsl(209, 84.00%, 53.50%)',
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

      {successMessage && <div style={{ color: 'green', marginTop: '20px' }}>{successMessage}</div>}
    </div>
  );
};

export default Payment;
