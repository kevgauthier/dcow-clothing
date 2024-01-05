import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CategoryItem } from '../../store/categories/category.types';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';


import {ProductCardContainer, ProductImg, ProductFooter, ProductName, ProductPrice, AddCartButton} from './product-card.styles';

type ProductCardProps = {
    product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
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