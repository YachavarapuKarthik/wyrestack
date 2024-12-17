import { useState, useEffect } from "react";
import logo from "../../assets/logo_dark.png"
import LoginPopup from "../LoginPopup.tsx";
import SignupPopup from "../SignupPopup.tsx";
import userAvatar from "../../assets/user-avatar.png"; 
import Cookies from "js-cookie"; // Import js-cookie
import "../css/NavBar.css"

function NavBar() {
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);
  const [isSignupPopupVisible, setSignupPopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks login state

  useEffect(() => {
    const userToken = Cookies.get("userToken"); // Check if the user token is available in cookies
    if (userToken) {
      setIsAuthenticated(true); // User is authenticated
    }
  }, []);

  const showLoginPopup = () => setLoginPopupVisible(true);
  const hideLoginPopup = () => setLoginPopupVisible(false);

  const showSignupPopup = () => setSignupPopupVisible(true);
  const hideSignupPopup = () => setSignupPopupVisible(false);

  const handleAuthSuccess = (email: string, token: string) => {
    setIsAuthenticated(true); // Mark user as authenticated
    Cookies.set("userToken", token, { expires: 7 }); // Save token in cookies for 7 days
    Cookies.set("userEmail", email, { expires: 7 }); // Optionally save email
    hideLoginPopup();
    hideSignupPopup();
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Mark user as logged out
    Cookies.remove("userToken"); // Remove token from cookies
    Cookies.remove("userEmail"); // Optionally remove email
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
                <button onClick={showLoginPopup} className="button">
                <div className="blob1"></div>
                <div className="blob2"></div>
                <div className="inner">Realism</div>
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
