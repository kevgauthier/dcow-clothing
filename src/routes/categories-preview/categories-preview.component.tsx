import { useSelector } from 'react-redux'; 
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
import Spinner from '../../component/spinner/spinner.component';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return ( 
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                })
            )}
        </>
    );
};

export default CategoriesPreview;