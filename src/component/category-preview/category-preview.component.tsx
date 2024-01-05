
import { FC } from 'react';
import { CategoryItem } from '../../store/categories/category.types';
import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, CategorytitleContainer, CategoryTitle, PreviewContainer } from './category-preview.styles';

type CategoryPreviewProps ={
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({title, products}) => {

    return (
        <CategoryPreviewContainer>
            <CategorytitleContainer>
                <CategoryTitle to={title.toLowerCase()}>{title.toUpperCase()}</CategoryTitle>
            </CategorytitleContainer>
            <PreviewContainer>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </PreviewContainer>
        </CategoryPreviewContainer>
    )

}

export default CategoryPreview;