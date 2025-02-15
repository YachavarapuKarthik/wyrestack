import { useState, useEffect } from "react";
import logo from "../../assets/logo_dark.png";
import LoginPopup from "../LoginPopup.tsx";
import SignupPopup from "../SignupPopup.tsx";
import userAvatar from "../../assets/user-avatar.png";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';

function NavBar() {
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);
  const [isSignupPopupVisible, setSignupPopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const showLoginPopup = () => setLoginPopupVisible(true);
  const hideLoginPopup = () => setLoginPopupVisible(false);

  const showSignupPopup = () => setSignupPopupVisible(true);
  const hideSignupPopup = () => setSignupPopupVisible(false);

  const handleAuthSuccess = (email: string, token: string) => {
    setIsAuthenticated(true);
    Cookies.set("userToken", token, { expires: 7 });
    Cookies.set("userEmail", email, { expires: 7 });
    hideLoginPopup();
    hideSignupPopup();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    Cookies.remove("userToken");
    Cookies.remove("userEmail");
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="nav-container">
        <div className="navbar">
          <div className="navin">
          <Link to="/" >
            <img className="logo" src={logo} alt="Logo" />
          </Link>
            <div
              className={`hamburger ${isMenuOpen ? "open" : "close"}`}
              onClick={toggleMenu}
            >
              <input type="checkbox" checked={isMenuOpen} onChange={toggleMenu} />
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                <path className="line" d="M7 16 27 16" />
              </svg>
            </div>
            <div className={`links ${isMenuOpen ? "expanded" : ""}`}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/services" onClick={closeMenu}>Services</Link>
            <Link to="/courses" onClick={closeMenu}>Courses</Link>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
              {!isAuthenticated ? (
                <button
                  onClick={() => { closeMenu(); showLoginPopup(); }}
                  className="button"
                >
                  <div className="inner">Login</div>
                </button>
              ) : (
                <div className="user-avatar-container">
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="user-avatar"
                    onClick={() => alert("Profile Menu Clicked!")}
                  />
                  <button
                    className="logout-btn"
                    onClick={() => { closeMenu(); handleLogout(); }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoginPopupVisible && (
        <LoginPopup
          closePopup={hideLoginPopup}
          openSignup={showSignupPopup}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
      {isSignupPopupVisible && (
        <SignupPopup
          closePopup={hideSignupPopup}
          openLogin={showLoginPopup}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}

export default NavBar;
