import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="contact-section">
      <h1>Contact us</h1>
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
          <label htmlFor="course">Select a course *</label>
          <select id="course">
            <option>Web design & UX/UI</option>
            <option>Full-stack Development</option>
            <option>Data Science</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">Get a consultation</button>
      </form>
      <div className="wavy-text">
        {"LET'S START".split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>

    </section>
  );
};

export default Contact;
