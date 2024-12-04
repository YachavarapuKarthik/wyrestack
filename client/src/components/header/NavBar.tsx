import  { useState } from "react";
import logo from "../../assets/logo.png";
import LoginPopup from "../LoginPopUp";

function NavBar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
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
            {/* Button to toggle the popup */}
            <button onClick={toggleModal} className="btn1">
              Let's Get Started
            </button>
          </div>
        </div>
      </div>

      {/* LoginPopup Component */}

      <LoginPopup isOpen={isModalOpen} togglePopup={toggleModal} />
    </>
  );
};

export default NavBar;
