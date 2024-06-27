import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { useEffect } from "react";
const Header = ({ currentUser, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Hide the dropdown when clicking outside of the user info
  const handleClickOutside = (event) => {
    if (!event.target.closest(".user-info")) {
      setShowDropdown(false);
    }
  };

  // Add event listener to the document when the component mounts
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Remove event listener when the component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!currentUser) {
      setShowDropdown(false); // Hide dropdown if user logs out
    }
  }, [currentUser]);

  return (
    <header className="app-header">
      <div className="app-title">
        <h1>Photo Search & Management</h1>
      </div>

      {currentUser && (
        <>
          <nav className="app-nav">
            <ul>
              <li>
                <Link to="/photo-search">Search</Link>
              </li>
              <li>
                <Link to="/collections">My Collections</Link>
              </li>
            </ul>
          </nav>

          <div className="user-info">
            <span onClick={toggleDropdown}>
              {currentUser.username}
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              )}
            </span>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
