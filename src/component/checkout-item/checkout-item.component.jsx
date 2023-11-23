import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {CheckoutItemContainer, ItemImageContainer, ItemName, ItemPrice, ItemQtyContainer, ItemQty, ItemArrow, ItemRemove , ItemImg} from './checkout-item.styles.jsx'

const CheckoutItem = ( {cartItem} ) => {
    const {name, imageUrl, price, quantity} = cartItem;

    const { clearItemFromCart, addItemToCart, removeItemToCart} = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

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

}

export default CheckoutItem;