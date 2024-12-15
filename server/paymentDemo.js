const Razorpay = require("razorpay");
const dotenv = require("dotenv");

// Load environment variables (your Razorpay keys should be stored here)
dotenv.config();

// Initialize Razorpay instance with API credentials
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,  // Add your Razorpay key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET  // Add your Razorpay key secret
});

// Function to create an order
const createOrder = async () => {
  try {
    // Create an order with a specific amount
    const order = await instance.orders.create({
      amount: 50000, // Amount in paise (50000 paise = 500 INR)
      currency: "INR",
      receipt: "order_rcptid_11",  // Unique receipt ID
      payment_capture: 1,  // 1 for automatic payment capture, 0 for manual capture
    });
    console.log("Order created successfully:", order);
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

// Function to initiate the payment (once the order is created)
const initiatePayment = async () => {
  try {
    const order = await createOrder();
    if (order) {
      // Here, you can initiate the payment using Razorpay Checkout integration
      // For now, we just log the order details
      console.log("Order details:", order);
    }
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
};

// Run the payment initiation
initiatePayment();
