import { useReducer } from "react";

import { createContext } from "react";


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart : () => {}, 
    
    
})

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
    isCartOpen : false,
    cartItems : [],
    cartCount : 0,
    cartTotal: 0,
}

export const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
            return {
                ...state,
                ...payload,
            };

        case CART_ACTION_TYPES.SET_IS_CART_OPEN : 
            return {
                ...state,
                isCartOpen : payload,
            };

        default : 
            throw new Error(`unhandled type of ${type} in cartReducer`);

    }
}

export const CartProvider = ({ children }) => {

    const [output_state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const {
        isCartOpen, cartItems, cartCount, CartTotal,
    } = output_state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch({
            type : CART_ACTION_TYPES.SET_CART_ITEMS,
            payload : {
                cartItems : newCartItems,
                cartCount : newCartCount,
                cartTotal : newCartTotal,
            }
        });
    };


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (productsToRemove) => {
        const newCartItems = removeItemsFromCart(cartItems, productsToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemToCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload : bool});
    };
     // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    

    // const addItemToCart = (productsToAdd) => {
    //     setCartItems(addCartItem(cartItems, productsToAdd));
    // }

    // const removeItemFromCart = (productsToRemove) => {
    //     setCartItems(removeItemsFromCart(cartItems, productsToRemove));
    // }

    // const clearItemFromCart = (cartItemToClear) => {
    //     setCartItems(clearCartItem(cartItems, cartItemToClear));
    // };

    



    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems,  removeItemToCart, clearItemToCart };


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}