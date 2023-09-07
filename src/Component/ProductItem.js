// Import necessary libraries and components
import React from "react"; // Import React
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from react-redux
import BasicRating from "./BasicRating"; // Import the BasicRating component
import { ProductToview, addproducts } from "../actions"; // Import ProductToview and addproducts actions from "../actions"
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { addCart, CartItems } from "../actions"; // Import addCart and CartItems actions from "../actions"
import { useState } from "react"; // Import useState from React
import customFetch from "../apiCall"; // Import customFetch function from "../apiCall"
import { ToastContainer } from "react-toastify"; // Import the ToastContainer component from react-toastify
import { showToastMessage } from "../Notification/notify"; // Import the showToastMessage function from "../Notification/notify"
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the ToastContainer

export default function ProductItem({ item }) {
  // Define and initialize state variables
  const [addedItem, setaddedItem] = useState(true);
  const [title, settitle] = useState(item.title);
  const [price, setprice] = useState(item.price);
  const [rating, setrating] = useState(item.rating);
  const [description, setdescription] = useState(item.description);

  // Get data from the Redux store
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchProduct = useDispatch();

  // Function to handle click on a product item
  function handleClick(item) {
    dispatch(ProductToview(item)); // Dispatch the ProductToview action
    navigate(`/productdetails/${item.id}`);
  }

  // Function to handle adding an item to the cart
  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatchCart(addCart(item)); // Dispatch the addCart action
      dispatchTotal(CartItems()); // Dispatch the CartItems action
      setaddedItem(false);
      showToastMessage("Item Added to Cart", "success"); // Show a success toast message
    } else {
      navigate("/cart");
    }
  }

  // Function to handle editing a product item
  function handleEdit(item) {
    item.edit = false;
    dispatchProduct(addproducts([...products])); // Dispatch the addproducts action
  }

  // Function to make a delete request for a product
  function handleDelelteProduct(item) {
    let url = `https://my-json-server.typicode.com/jaiswalaryan/data/products/${item.id}`;
    let result = customFetch(url, { method: "DELETE" });

    let index = products.indexOf(item);
    products.splice(index, 1);
    dispatchProduct(addproducts([...products])); // Dispatch the addproducts action
    showToastMessage("Item deleted", "warning"); // Show a warning toast message
  }

  // Function to cancel editing mode
  function handleCancel(item) {
    item.edit = true;
    dispatchProduct(addproducts([...products])); // Dispatch the addproducts action
  }

  // Function to make a put request after clicking the save button in edit mode
  function handleSave(item) {
    let url = `https://my-json-server.typicode.com/jaiswalaryan/data/products/${item.id}`;
    let result = customFetch(url, {
      body: {
        ...item,
        title,
        price,
        rating,
        description,
        edit: true,
      },
      method: "PUT",
    });
    result.then((data) => {
      let index = products.indexOf(item);
      products[index] = data;

      dispatchProduct(addproducts([...products])); // Dispatch the addproducts action
      showToastMessage("Edit successful", "success"); // Show a success toast message
    });
  }

  return (
    //   container
    <div className="d-flex container-sm bg-white px-1 py-5 mt-4 flex-column flex-lg-row gap-3">
      {/* Left section */}
      <ToastContainer /> {/* Toast container for displaying messages */}
      <div className="d-flex container-sm gap-5">
        <img
          src={item.thumbnail}
          alt=""
          width={"200rem"}
          onClick={() => handleClick(item)} // Call handleClick function when clicked
        />
        {/* Right-part Content */}
        <div className="d-flex flex-column gap-2">
          {item.edit ? (
            <span>{item.title}</span>
          ) : (
            <input
              type="text"
              value={title}
              className="w-50"
              onChange={(e) => settitle(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <span>{item.price}</span>
          ) : (
            <input
              type="text"
              value={price}
              className="w-50"
              onChange={(e) => setprice(e.target.value)}
            ></input>
          )}
          {item.edit ? (
            <BasicRating value={item.rating} />
          ) : (
            <div>
              <h5>Ratings:</h5>
              <input
                type="number"
                max={"5"}
                min={"0"}
                value={rating}
                step={"0.5"}
                onChange={(e) => setrating(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      {/* Right section */}
      <div className="p-2">
        {item.edit ? (
          <span>{item.description}</span>
        ) : (
          <div className="form-floating">
            <textarea
              className="form-control"
              value={description}
              id="floatingTextarea"
              style={{ width: "20rem", height: "5rem" }}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      {/* Footer section */}
      <div className="align-self-end d-flex align-items-center gap-4 flex-lg-grow-1 p-1">
        {item.edit ? (
          <button
            type="button"
            className="btn btn-primary"
            style={{
              width: "9rem",
              backgroundColor: "var(--nav)",
            }}
            onClick={() => handleCart(item)} // Call handleCart function when clicked
          >
            {addedItem ? "Add to Cart" : "Go to Cart "}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => handleCancel(item)} // Call handleCancel function when clicked
          >
            Cancel
          </button>
        )}

        {item.edit ? (
          <>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/128/10336/10336582.png"
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(item)} // Call handleEdit function when clicked
              />
            </span>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/128/9068/9068885.png"
                alt="error"
                width={"30rem"}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelelteProduct(item)} // Call handleDelelteProduct function when clicked
              />
            </span>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => handleSave(item)} // Call handleSave function when clicked
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
