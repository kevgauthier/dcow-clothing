import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import CheckoutItem from '../../component/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, TotalContainer } from './checkout.styles.jsx'


const Checkout = () => {
    
    const cartItems = useSelector(selectCartItems);
    const cartTotal  = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => {
                return (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                );
            })}
            <TotalContainer>Total: ${cartTotal}</TotalContainer>
            
        </CheckoutContainer>
    );
}

export default Checkout;