import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../../store/cart/cart.types';
import { clearItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import {CheckoutItemContainer, ItemImageContainer, ItemName, ItemPrice, ItemQtyContainer, ItemQty, ItemArrow, ItemRemove , ItemImg} from './checkout-item.styles'

type CheckoutItemProps = {
    cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = memo(( {cartItem} ) => {
    
    
    const {name, imageUrl, price, quantity} = cartItem;
    
    const cartItems = useSelector(selectCartItems);
    

    const dispatch = useDispatch();

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems,cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems,cartItem));

    return (
        <CheckoutItemContainer>
            <ItemImageContainer>
                <ItemImg src={imageUrl} alt={`${name}`} />
            </ItemImageContainer>
            <ItemName>{name}</ItemName>
            <ItemQtyContainer>
                <ItemArrow onClick={removeItemHandler}>
                    &#10094;
                </ItemArrow>
                <ItemQty>{quantity}</ItemQty>
                <ItemArrow onClick={addItemHandler}>
                    &#10095;
                </ItemArrow>
            </ItemQtyContainer>
            <ItemPrice>{price}</ItemPrice>
            <ItemRemove onClick={clearItemHandler}>&#10005;</ItemRemove>
        </CheckoutItemContainer>
    );

})

export default CheckoutItem;