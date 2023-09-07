// Define action type constants for various actions
export const Add_products = "Add_products"; // Add products action type
export const Add_cart = "Add_cart"; // Add to cart action type
export const Product_view = "product_view"; // Product view action type
export const Cart_items = "Cart_items"; // Cart items action type
export const update_cart = "update_cart"; // Update cart action type
export const delete_cart = "delete_cart"; // Delete cart action type

// Action creator function to add products
export function addproducts(products) {
  return {
    type: Add_products, // Set the action type to 'Add_products'
    products, // Provide the products data
  };
}

// Action creator function to add an item to the cart
export function addCart(cart) {
  return {
    type: Add_cart, // Set the action type to 'Add_cart'
    cart, // Provide the cart item data
  };
}

// Action creator function to set the product view
export function ProductToview(item) {
  return {
    type: Product_view, // Set the action type to 'Product_view'
    view: item, // Provide the viewed product data
  };
}

// Action creator function to get cart items
export function CartItems() {
  return {
    type: Cart_items, // Set the action type to 'Cart_items'
  };
}

// Action creator function to update the cart
export function updateCart(item) {
  return {
    type: update_cart, // Set the action type to 'update_cart'
    updatedItem: item, // Provide the updated cart item data
  };
}

// Action creator function to delete an item from the cart
export function DeleteCart(item) {
  return {
    type: delete_cart, // Set the action type to 'delete_cart'
    item, // Provide the item to be deleted from the cart
  };
}
