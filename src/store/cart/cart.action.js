import { CART_ACTION_TYPE } from "./cart.types";
import { createAction } from '../../utils/reducer/reducer.utils'


const addCartItem = (cartItems, productToAdd) => {
    // check if items contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    // if found, inmcrement qty
    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    }
    // return the new array with modified cartItems/ new Item
    return [...cartItems, {...productToAdd, quantity: 1}];
}


const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    // check if Quantity is equal to 1, if it is remove that item from cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    //return back cartItems with maching cart item with reduce quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === cartItemToRemove.id
                ? {...cartItem, quantity: cartItem.quantity - 1}
                : cartItem
        );
    }
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = (Boolean) => 
    createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, Boolean)



export  const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};