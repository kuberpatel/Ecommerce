// Import the 'toast' component from 'react-toastify'
import { toast } from "react-toastify";

// Define a function 'showToastMessage' that takes a 'message' and 'type' as arguments
export const showToastMessage = (message, type) => {
  // Use the 'toast' function to display a toast message with the provided 'message' and 'type'
  // Position the toast message at the top-right corner of the screen
  toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
