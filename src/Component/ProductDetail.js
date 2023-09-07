// Import necessary libraries and components
import React from "react"; // Import React
import BasicRating from "./BasicRating"; // Import the BasicRating component
import { addCart, CartItems } from "../actions"; // Import the addCart and CartItems functions from the "../actions" module
import { useDispatch } from "react-redux"; // Import the useDispatch function from react-redux
import { ToastContainer } from "react-toastify"; // Import the ToastContainer component from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the ToastContainer
import { showToastMessage } from "../Notification/notify"; // Import the showToastMessage function from "../Notification/notify"

export default function ProductDetail({ item }) {
  const dispatchCart = useDispatch(); // Get the dispatch function for addCart
  const dispatchTotal = useDispatch(); // Get the dispatch function for CartItems

  // Function to handle the click event when adding an item to the cart
  function handleClick(item) {
    if (!item.qty) {
      item.qty = 1;
      dispatchCart(addCart(item)); // Dispatch the addCart action
      dispatchTotal(CartItems()); // Dispatch the CartItems action
      showToastMessage("Item Added to Cart", "success"); // Show a success toast message
    } else {
      dispatchCart(addCart(item)); // Dispatch the addCart action
      dispatchTotal(CartItems()); // Dispatch the CartItems action
      showToastMessage("Item Added to Cart", "success"); // Show a success toast message
    }
  }

  return (
    // Container for the product details
    <div className="container-sm d-flex flex-lg-row  flex-column mt-4 gap-5">
      {/* Left side */}
      <ToastContainer /> {/* Toast container for displaying messages */}
      {item.images ? (
        // If the item has images, display a carousel
        <div
          className=" border border-1 "
          style={{ width: "100%", objectFit: "cover" }}
        >
          <div
            id="carouselExampleDark"
            className="carousel carousel-dark slide"
            style={{ height: "100%" }}
            data-bs-ride="carousel"
          >
            {/* Carousel indicators */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            {/* Carousel images */}
            <div className="carousel-inner">
              {item.images[0] && (
                <div className="carousel-item active" data-bs-interval="10000">
                  <img
                    src={item.images[0]}
                    className="d-block w-100 "
                    alt="error"
                    style={{ height: "38rem" }}
                  />
                </div>
              )}
              {item.images[1] && (
                <div className="carousel-item" data-bs-interval="2000">
                  <img
                    src={item.images[1]}
                    className="d-block w-100"
                    alt="error"
                    style={{ height: "38rem" }}
                  />
                </div>
              )}

              {item.images[2] && (
                <div className="carousel-item">
                  <img
                    src={item.images[2]}
                    className="d-block w-100"
                    alt="error"
                    style={{ height: "38rem" }}
                  />
                </div>
              )}
            </div>
            {/* Carousel control buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      ) : (
        // If there are no images, display a thumbnail
        <img src={item.thumbnail} alt="error" id="detailAddedImage" />
      )}

      {/* Right side */}
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          <span>{item.title}</span>
          <span>
            <BasicRating value={item.rating} /> {/* Display the rating using BasicRating component */}
          </span>
          <div className="d-flex gap-3 ">
            <span className="text-success">
              <span className="text-danger">Price:</span>Rs{item.price}
            </span>
            <span className="text-danger">
              Discount:
              <span className="text-success">
                {item.discountPercentage ? item.discountPercentage : ""}%
              </span>
            </span>
          </div>
          <span className="text-danger">
            Category:<span className="text-success">{item.category}</span>
          </span>
        </div>
        <div className="d-flex flex-column gap-3">
          <span className="text-danger">
            {" "}
            Stocks:
            <span className="text-success">{item.stock ? item.stock : ""}</span>
          </span>
          <span>{item.description}</span>
        </div>

        <div className="align-self-end">
          {/* Add to Cart button */}
          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: "9rem",
              backgroundColor: "var(--nav)",
            }}
            onClick={() => handleClick(item)} // Call handleClick function when clicked
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
