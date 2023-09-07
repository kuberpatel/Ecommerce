// Import necessary libraries and functions
import React, { useState } from "react"; // Import React and useState
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Define the functional component Nav
export default function Nav() {
  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Get the 'totalCart' value from the Redux store using useSelector
  let total = useSelector((state) => state.totalCart);

  return (
    // Navbar component with Bootstrap styles
    <nav
      className="navbar navbar-expand-lg p-4 align-items-center"
      style={style.nav}
    >
      <div className="container-fluid">
        {/* E-commerce brand */}
        <a className="navbar-brand fs-3" href="#" style={style.navHead}>
          E-commerce
        </a>
        {/* Navbar toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* Link to the "Products" page */}
              <Link to="/" className="nav-link active text-light" href="#">
                Products
              </Link>
            </li>
            <li className="nav-item">
              {/* Link to the "Add a product" page */}
              <Link to="/addproducts" className="nav-link active text-light">
                Add a product
              </Link>
            </li>
          </ul>
          {/* Cart and notification icons */}
          <div className="d-flex gap-5 position-relative">
            {/* Cart icon */}
            <img
              src="https://cdn-icons-png.flaticon.com/128/2838/2838694.png"
              alt="error"
              width={"40rem"}
              onClick={() => navigate("/cart")}
              style={{ cursor: "pointer" }}
            />
            {/* Display the total number of items in the cart if 'total' is greater than 0 */}
            {total ? (
              <p
                className="bg-white rounded-circle position-absolute d-flex align-items-center justify-content-center"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  top: "21%",
                  left: "20%",
                }}
              >
                {total}
              </p>
            ) : (
              ""
            )}
            {/* Notification icon */}
            <img
              src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
              alt="error"
              width={"40rem"}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Define CSS styles for the navigation component
const style = {
  nav: {
    backgroundColor: "var(--nav)",
  },
  navHead: {
    fontFamily: "var(--fontStyle)",
    color: "white",
  },
};

// #9375b7 
