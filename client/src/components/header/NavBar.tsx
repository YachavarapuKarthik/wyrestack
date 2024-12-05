import { useState } from "react";
import logo from "../../assets/logo.png";
import LoginPopup from "../LoginPopup.tsx";
import SignupPopup from "../SignupPopup.tsx";

function NavBar() {
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);
  const [isSignupPopupVisible, setSignupPopupVisible] = useState(false);

  const showLoginPopup = () => {
    setLoginPopupVisible(true);
    setSignupPopupVisible(false); // Close signup popup if open
  };
  const hideLoginPopup = () => setLoginPopupVisible(false);

  const showSignupPopup = () => {
    setSignupPopupVisible(true);
    setLoginPopupVisible(false); // Close login popup if open
  };
  const hideSignupPopup = () => setSignupPopupVisible(false);

  return (
    <>
      <div className="navbar">
        <div className="navin">
          <img className="logo" src={logo} alt="Logo" />
          <div className="links">
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">Our Story</a>
            <a href="#">Courses</a>
            <a href="#">Contact</a>
            {/* Button to toggle the popup */}
            <button onClick={showLoginPopup} className="btn1">
              Login
            </button>

            <button onClick={showSignupPopup} className="btn1">
              Signup
            </button>
          </div>
        </div>
      </div>

      {/* Login Popup */}
      {isLoginPopupVisible && (
        <LoginPopup closePopup={hideLoginPopup} openSignup={showSignupPopup} />
      )}

      {/* Signup Popup */}
      {isSignupPopupVisible && (
        <SignupPopup closePopup={hideSignupPopup} openLogin={showLoginPopup} />
      )}
    </>
  );
}

export default NavBar;
