import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component.jsx';


import {ProductCardContainer, ProductImg, ProductFooter, ProductName, ProductPrice, AddCartButton} from './product-card.styles.jsx';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl} = product;

    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);
 
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