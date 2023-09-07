// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main CSS file
import './index.css';

// Import the main App component
import App from './App';

// Import the Redux store and the products reducer
import products from './reducers/index';

// Import Material-UI components (assuming you are using Material-UI)
import "@mui/material"

// Import Redux createStore and Provider
import { createStore } from 'redux';
import { Provider } from 'react-redux'

// Create the Redux store using the products reducer
const store = createStore(products)

// Create a root for ReactDOM to render the app into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped with the Redux Provider
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
