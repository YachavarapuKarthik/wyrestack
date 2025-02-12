import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="contact-section">
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
