import React, { useEffect, useState } from 'react'
import { getSavedProduct } from '../../api/product'
import { message } from 'antd';
import ProductCard from '../../components/Product/ProductCard';

const Index = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await getSavedProduct();
            if(response.success) {
                setProducts(response.data);            
            }            
        } catch (error) {
        }
    }

    useEffect(() => {
        getProducts();
    }, [])
    

  return (
    <div className="max-w-[70%] mx-auto min-h-screen">
    <h1 className="text-xl font-semibold text-center my-4">Saved Product</h1>
    <div className=" mx-16 my-8">
      <div className="flex flex-wrap">
        {products && products.length > 0 ? (
          products.map((product, i) => <ProductCard product={product} key={i} saved={true} productSaved={true} getAllProducts={getProducts} />)
        ) : (
          <h1 className=" mx-auto my-60">Product Not Found.</h1>
        )}
      </div>
    </div>
  </div>
  )
}

export default Index