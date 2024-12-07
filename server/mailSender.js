const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json()); // To parse incoming JSON requests

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'neuron.ai.india@gmail.com', 
    pass: 'qpjpgfrhzguarihz', // Use an app password, not your real email password
  },
});

// const to = "mounikapalaparthi12@gmail.com";
const to = "pkowsik2004@gmail.com"
const subject = "Mail from Karthikkkkkk";
const message = "Reply Hi if you receive this email";

// ** Function to send email **
async function sendEmail() {
  try {
    const mailOptions = {
      from: 'neuron.ai.india@gmail.com', // Sender's email
      to, // Receiver's email
      subject, // Email subject
      text: message, // Plain text message
      // html: `<p>${message}</p>` // Optionally send as HTML
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
  }
}

// Start the server
const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  // Call the sendEmail function when the server starts
  await sendEmail();
});
