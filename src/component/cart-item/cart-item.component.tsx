import { FC, memo } from 'react';
import { CartItemContainer, ItemImg, ItemDetails, ItemName, ItemPrice } from './cart-item.styles';
import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
    cartItem: TCartItem;
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CartItemContainer>
            <ItemImg src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
                <ItemName>{name}</ItemName>
                <ItemPrice>
                    {quantity} X ${price}
                </ItemPrice>
            </ItemDetails>
            
            
        </CartItemContainer>
    );
});

export default CartItem;