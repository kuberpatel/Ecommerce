// Import necessary libraries and components
import React, { useState } from "react"; // Import React and useState
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from react-redux
import { addproducts } from "../actions"; // Import addproducts action from "../actions"

export default function Sort() {
  // Define and initialize state variables
  const [flag, setflag] = useState(false); // State variable to track sorting state
  const products = useSelector((state) => state.products); // Get product data from the Redux store
  const dispatchSort = useDispatch(); // Get the dispatch function for sorting
  const dispatchCancel = useDispatch(); // Get the dispatch function for cancelling sorting

  // Function to handle sorting by price
  function handleSort() {
    // Sort the product data by price
    let sortedData = products.sort((a, b) => a.price - b.price);
    dispatchSort(addproducts([...sortedData])); // Dispatch the addproducts action with sorted data
    setflag(true); // Set the sorting flag to true
  }

  // Function to cancel sorting and revert to original order
  function cancelSort() {
    // Retrieve the original product data from local storage
    let products = JSON.parse(window.localStorage.getItem("products"));
    dispatchCancel(addproducts([...products])); // Dispatch the addproducts action with original data
    setflag(false); // Set the sorting flag to false
  }

  return (
    <div className="align-self-end">
      <div
        className="bg-white p-2 rounded-5  d-flex justify-content-around"
        style={style}
      >
        <span className="fw-bold " onClick={() => handleSort()}>
          Sort by Price
        </span>
        {flag && (
          <span>
            {/* Render a cancel icon if sorting is active */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/561/561189.png"
              alt="error"
              width={"20rem"}
              onClick={() => cancelSort()} // Call cancelSort function when clicked
              style={{ cursor: "pointer" }}
            />
          </span>
        )}
      </div>
    </div>
  );
}

const style = {
  width: "9rem",
  cursor: "pointer",
};
