import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import {CartDropdownContainer, EmptyMsg, CartItemsContainer} from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToChechoutHandler= () =>{
        navigate("/checkout");
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMsg>Your cart is empty</EmptyMsg>
                )}
               
            </CartItemsContainer>
           
            <Button onClick={goToChechoutHandler}>GO TO CHECKOUT</Button>
           
        </CartDropdownContainer>
    );
}

export default CartDropdown;