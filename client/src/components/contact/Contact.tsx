import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="contact-section">
      <h1 className = "conhead">Contact us</h1>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="fullName">Full name *</label>
          <input type="text" id="fullName" placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number *</label>
          <input type="text" id="phone" placeholder="Enter your phone number" />
        </div>
        
        <div className="form-group">
          <label htmlFor="query">Enter your query *</label>
          <input type="text" id="query" placeholder="Type your query here..." />
        </div>
        <button type="submit" className="submit-btn">Get a consultation</button>
      </form>
      <div className="wavy-text">
      {"LET'S ".split("").map((char, index) => (
      <span key={`lets-${index}`}>{char}</span>
      ))}
      <span>&nbsp;</span> 
      <span>&nbsp;</span>
      {/* Adding a non-breaking space */}
      {"START".split("").map((char, index) => (
        <span key={`start-${index}`}>{char}</span>
      ))}
      </div>

    </section>
  );
};

export default Contact;
