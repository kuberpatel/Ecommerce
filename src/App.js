// Import necessary components and libraries
import Nav from "./Component/Nav";
import ProductDetail from "./Component/ProductDetail";
import AddProduct from "./Component/AddProduct";
import CartItems from "./Component/CartItems";
import ProductItemList from "./Component/ProductItemList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addproducts } from "./actions/index";
import customFetch from "./apiCall";
import { useEffect } from "react";

function App() {
  // Use Redux to select the product detail item from the state
  let productDetailItem = useSelector((state) => state.itemToDisplay);

  // Define the URL for fetching initial data
  const url = "https://my-json-server.typicode.com/jaiswalaryan/data/db";

  // Access the dispatch function from Redux
  const dispatch = useDispatch();

  // Use useEffect to fetch and initialize data when the component mounts
  useEffect(() => {
    // Make a custom HTTP fetch request to get initial data
    let response = customFetch(url, {
      method: "GET",
    });
    response.then((data) => {
      // Modify the data and store it in local storage for later use
      let modifiedData = data.products.map((item) => {
        item.edit = true; // Add an 'edit' property to each item
        return item;
      });
      window.localStorage.setItem("products", JSON.stringify(modifiedData));
      // Retrieve and dispatch the products from local storage to Redux
      let products = JSON.parse(window.localStorage.getItem("products"));
      dispatch(addproducts(products));
    });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="App">
      <BrowserRouter>
        {/* Render the navigation component */}
        <Nav />
        <Routes>
          {/* Define routes for different views */}
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route
            // Use a dynamic route to display product details based on the selected item
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
