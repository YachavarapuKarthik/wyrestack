const Razorpay = require('razorpay');
require('dotenv').config()

const key_id = "rzp_test_c0OTRoJKDdTXYK"  // Replace with your actual Razorpay key_id
const key_secret = "DG20s7cQ7pKzVKOfTEs37voa";  // Replace with your actual Razorpay key_secret

const instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret
});

// Function to validate keys by creating a test order
async function validateKeys() {
  try {
    // Attempt to create a test order
    const order = await instance.orders.create({
      amount: 40000,  // Amount in paise (i.e., 500 paise = 5 INR)
      currency: "INR",
      payment_capture: 1
    });
    console.log("API keys are valid! Order created:", order);
  } catch (error) {
    // Handle error (invalid keys, incorrect request, etc.)
    console.error("Error validating API keys:", error);
  }
}

validateKeys();