import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component.jsx';


import {ProductCardContainer, ProductImg, ProductFooter, ProductName, ProductPrice, AddCartButton} from './product-card.styles.jsx';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl} = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems,product));
 
    return (
        <ProductCardContainer>
            <ProductImg src={imageUrl} alt={`${name}`}/>
            <ProductFooter>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </ProductFooter>
            <AddCartButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</AddCartButton>
        </ProductCardContainer>
    );


}

export default ProductCard;