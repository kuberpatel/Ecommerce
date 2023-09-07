// Import necessary libraries and components
import React from "react"; // Import React
import ProductItem from "./ProductItem"; // Import the ProductItem component
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import Sort from "./Sort"; // Import the Sort component

export default function ProductItemList({}) {
  // Get the product data from the Redux store
  const data = useSelector((state) => state.products);

  // Check if the data is empty
  if (data.length === 0) {
    // Display a loading spinner if data is empty
    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="spinner-border"
          style={{ width: "8rem", height: "8rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else {
    // Display the product list if data is available
    return (
      <div className="d-flex flex-column container-sm mt-4">
        <Sort /> {/* Render the Sort component */}
        {/* Map through the data and render each ProductItem component */}
        {data.map((item) => (
          <ProductItem item={item} key={item.title} />
        ))}
      </div>
    );
  }
}
