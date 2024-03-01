import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
        <h1>OIIIII</h1>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
    </nav>
  );
}

export default Navbar;