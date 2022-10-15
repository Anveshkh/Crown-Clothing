import './category.styles.scss'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CategoriesContext } from '../../contexts/categories.context'
import ProductCard from '../../components/product-card/product-card.components'

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);
    console.log(category);
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    // return (
    //     <div className="category-container">
    //         {console.log(categoriesMap)}
    //         {console.log(category)}
    //         {console.log(categoriesMap[category])}
    //         {products && products.map((product) => {
    //             return <ProductCard key={product.id} product={product} />
    //         })}
    //     </div>
    // )





    return (
        <>
            <h2 className='category-title'>{category}</h2>
            <div className='category-container'>
                {products && products.map((product) => {
                    return <ProductCard key={product.id} product={product} />
                })}

            </div>
        </>

    )
};

export default Category