import { useState } from "react";
import { createContext } from "react";

const addCartItem = (cartItems, productsToAdd) => {
    // find if cart items contains productsToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productsToAdd.id)
    // if found, increment the quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productsToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }
    // return new array with modified cartItems/ new cart item
    return [...cartItems, { ...productsToAdd, quantity: 1 }];
}

const removeItemsFromCart = (cartItems, productsToRemove) => {


    const toRemoveItem = cartItems.find((cartItem) => cartItem.id === productsToRemove.id);

    return cartItems.map((cartItem) => cartItem.id === toRemoveItem.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);

}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart : () => {}, 
    
    
})

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    

    const addItemToCart = (productsToAdd) => {
        setCartItems(addCartItem(cartItems, productsToAdd));
    }

    const removeItemFromCart = (productsToRemove) => {
        setCartItems(removeItemsFromCart(cartItems, productsToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    



    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, removeItemFromCart, clearItemFromCart };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}