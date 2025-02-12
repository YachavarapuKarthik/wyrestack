import React from "react";
import logo from "../../assets/logo_dark.png"

function Footer() {
  return (
    <footer className="footer">
    

      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <img className = "footer-logo" src={logo}/>
          <p className="footer-text">
            A Modern Bank Card For A Modern World And Advanced And Up-To-Date
            Services For Your Convenience
          </p>
        </div>

        {/* Center Section */}
        <div className="footer-center">
          <div className="quick-access">
            <h4>Quick Access</h4>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Careers</li>
              <li>Learn</li>
              <li>Branches</li>
              <li>FAQ</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <p className="newsletter-text">
            To Know The Latest News And Updates, Enter Your Email So That We Can
            Contact You
          </p>
          <div className="newsletter">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="newsletter-input"
            />
            <button className="newsletter-button">Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="#"><i className="fab fa-telegram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-whatsapp"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Block Design */}
      <div className="footer-bottom-blocks"></div>

      {/* Footer Bottom Text */}
      <div className="footer-bottom">
        <p>Copyright © 2023 Square Card. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
