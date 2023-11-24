import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import {CartIconContainer, ItemsCount} from './cart-icon.styles.jsx';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';


const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);//set with inverse value (true, false)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <ItemsCount>{cartCount}</ItemsCount>
        </CartIconContainer>
    )
}

export default CartIcon;