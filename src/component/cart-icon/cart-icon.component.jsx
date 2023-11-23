import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import {CartIconContainer,ShoppingIconIMG, ItemsCount} from './cart-icon.styles.jsx';


const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);//set with inverse value (true, false)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIconIMG/>
            <ItemsCount>{cartCount}</ItemsCount>
        </CartIconContainer>
    )
}

export default CartIcon;