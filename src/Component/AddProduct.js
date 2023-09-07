// Importing React and useState from react library
import React from "react";
import { useState } from "react";

// Importing styled-components library for styling
import styled from "styled-components";

// Importing customFetch function from apiCall file
import customFetch from "../apiCall";

// Importing addproducts action from actions file
import { addproducts } from "../actions";

// Importing useSelector and useDispatch hooks from react-redux library
import { useSelector, useDispatch } from "react-redux";

// Importing useNavigate hook from react-router-dom library
import { useNavigate } from "react-router-dom";

// Importing ToastContainer component from react-toastify library
import { ToastContainer } from "react-toastify";
// Importing css for react-toastify library
import "react-toastify/dist/ReactToastify.css";

// Importing showToastMessage function from notify file in Notification folder
import { showToastMessage } from "../Notification/notify";

// Creating a Container component using styled-components library
const Container = styled.div`
  width: 50%;
  margin: auto;
  @media only screen and (max-width: 976px) {
    width: 90%;
  }
  @media only screen and (max-width: 576px) {
    width: 100%;
    margin: 0;
  }
`;

// Exporting AddProduct component as default export
export default function AddProduct() {
  // Using useSelector hook to get products state from redux store
  const products = useSelector((state) => state.products);
  
  // Using useDispatch hook to get dispatch function to dispatch actions to redux store
  const dispatch = useDispatch();
  
  // Using useNavigate hook to get navigate function to navigate between routes
  const navigate = useNavigate();
  
  // Using useState hook to create state variables for form inputs
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [thumbnail, setthumbmail] = useState("");
  const [rating, setrating] = useState("");

  // URL for api call to add product
  let url = "https://my-json-server.typicode.com/jaiswalaryan/data/products";
  
  // Function to handle form submit
  function handleSubmit(e) {
    // Preventing default form submit behavior
    e.preventDefault();
    
    // Making api call using customFetch function with url and options as arguments
    let result = customFetch(url, {
      body: {
        id: Date.now(),
        title: name,
        price,
        category,
        thumbnail,
        rating,
        description,
        edit: true,
      },
      method: "POST",
    });
    
    // Handling api call result using then method of promise returned by customFetch function
    result.then((data) => {
      // Dispatching addproducts action with new product data and existing products as arguments
      dispatch(addproducts([data, ...products]));
      
      // Navigating to home page using navigate function
      navigate("/");
    });
    
    // Showing toast message using showToastMessage function with message and type as arguments
    showToastMessage("Product Added Successful", "success");
    
    // Resetting form input state variables to empty strings
    setname("");
    setcategory("");
    setdescription("");
    setrating("");
    setthumbmail("");
    setprice("");
  }
  
  return (
    // Rendering Container component with form and input elements inside it
    <Container className="bg-light border border-1 border-dark mt-4 p-3 ">
      <ToastContainer />
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-2"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Descriptions"
          onChange={(e) => setdescription(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Price"
          onChange={(e) => setprice(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="category"
          onChange={(e) => setcategory(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="Thumbnail image Url"
          onChange={(e) => setthumbmail(e.target.value)}
        />
        <input
          type="text"
          className="p-2"
          placeholder="ratings"
          onChange={(e) => setrating(e.target.value)}
        />
        
        // Rendering submit button with styling and event handler attached to it 
        <button
          type="submit"
          className="btn btn-primary align-self-end mt-4"
          style={{
            width: "9rem",
            backgroundColor: "var(--nav)",
          }}
        >
          Add to Cart
        </button>
      </form>
    </Container>
  );
}
