// Import action type constants from "../actions"
import {
  Add_products,
  Add_cart,
  Product_view,
  Cart_items,
  update_cart,
  delete_cart
} from "../actions";

// Define the initial state for the Redux store
let initialState = {
  products: [],       // Array to store product data
  cart: [],           // Array to store cart items
  itemToDisplay: "",  // Variable to store the item to display
  totalCart: 0,       // Variable to store the total cart items
};

// Define the products reducer function
export default function products(state = initialState, actions) {
  switch (actions.type) {
    case Add_products:
      // Update the products state with the provided products data
      return {
        ...state,
        products: actions.products,
      };

    case Add_cart:
      // Check if the cart already contains the item
      let flag = state.cart.indexOf(actions.cart);
      if (flag !== -1) {
        // If the item is already in the cart, increment its quantity
        actions.cart.qty += 1;
        return {
          ...state,
        };
      } else {
        // If the item is not in the cart, add it to the cart array
        return {
          ...state,
          cart: [actions.cart, ...state.cart],
        };
      }

    case Product_view:
      // Set the itemToDisplay to the provided view item
      return {
        ...state,
        itemToDisplay: actions.view,
      };

    case Cart_items:
      // Calculate the total number of items in the cart
      let { cart } = state;
      let total = cart.reduce((total, item) => {
        return (total += item.qty);
      }, 0);
      // Update the totalCart state with the calculated total
      return {
        ...state,
        totalCart: total,
      };

    case update_cart:
      // Find the index of the updated item in the cart
      let index = state.cart.indexOf(actions.updatedItem);
      let updatedCart = null;
      if (index !== -1) {
        // If the item is found, update it in the cart array
        state.cart[index] = actions.updatedItem;
        updatedCart = state.cart;
      }
      // Update the cart state with the updated cart array
      return {
        ...state,
        cart: [...updatedCart],
      };

    case delete_cart:
      // Find the position of the item to delete in the cart
      let position = state.cart.indexOf(actions.item);
      // Remove the item from the cart array
      state.cart.splice(position, 1);
      // Update the cart state without the deleted item
      return {
        ...state,
      }

    default:
      // Return the current state if no matching action type is found
      return state;
  }
}
