import { CartItemContainer, ItemImg, ItemDetails, ItemName, ItemPrice } from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
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
};

export default CartItem;