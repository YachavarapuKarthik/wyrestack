import { useState } from "react";
import logo from "../../assets/logo.png";
import LoginPopup from "../LoginPopup.tsx";
import SignupPopup from "../SignupPopup.tsx";
import userAvatar from "../../assets/user-avatar.png"; 

function NavBar() {
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);
  const [isSignupPopupVisible, setSignupPopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks login state

  const showLoginPopup = () => setLoginPopupVisible(true);
  const hideLoginPopup = () => setLoginPopupVisible(false);

  const showSignupPopup = () => setSignupPopupVisible(true);
  const hideSignupPopup = () => setSignupPopupVisible(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true); // Mark user as authenticated
    hideLoginPopup();
    hideSignupPopup();
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Mark user as logged out
  };

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

            {/* Conditional rendering of buttons or user avatar */}
            {!isAuthenticated ? (
              <>
                <button onClick={showLoginPopup} className="btn1">
                  Login
                </button>
                <button onClick={showSignupPopup} className="btn1">
                  Signup
                </button>
              </>
            ) : (
              <div className="user-avatar-container">
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="user-avatar"
                  onClick={() => alert("Profile Menu Clicked!")} // Add functionality for profile menu
                />
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Popup */}
      {isLoginPopupVisible && (
        <LoginPopup
          closePopup={hideLoginPopup}
          openSignup={showSignupPopup}
          onAuthSuccess={handleAuthSuccess} // Pass success handler
        />
      )}

      {/* Signup Popup */}
      {isSignupPopupVisible && (
        <SignupPopup
          closePopup={hideSignupPopup}
          openLogin={showLoginPopup}
          onAuthSuccess={handleAuthSuccess} // Pass success handler
        />
      )}
    </>
  );
}

export default NavBar;
