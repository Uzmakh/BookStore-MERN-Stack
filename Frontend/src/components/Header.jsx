import React from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/book-favicon.png";

const Header = () => {
  return (
    <header>
          <Link to="/" className="logo">
              <img src={logo} alt="ReactJs" /> BookApp
          </Link>
            <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
  )
}
export default Header;