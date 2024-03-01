import React from 'react';
import './Header.css'; // Import the CSS file

function Header() {
  return (
    <header className="header">
      <div className="logo">Your Logo</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button type="button">Search</button>
      </div>
      <div className="user-icon">User Icon</div>
    </header>
  );
}

export default Header;