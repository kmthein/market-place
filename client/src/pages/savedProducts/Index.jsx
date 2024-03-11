import React, { useEffect, useState } from "react";
import { getSavedProduct } from "../../api/product";
import { message } from "antd";
import ProductCard from "../../components/Product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, setLoading } from "../../store/slices/uiSlice";
import { LineWave } from "react-loader-spinner";

const Index = () => {
  const [products, setProducts] = useState([]);

  const { isProcessing } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const getProducts = async () => {
    dispatch(setLoading());
    try {
      const response = await getSavedProduct();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {}
    dispatch(endLoading());
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="max-w-[70%] mx-auto min-h-screen">
      <h1 className="text-xl font-semibold text-center my-4">Saved Product</h1>
      <div className=" mx-16 my-8">
        {isProcessing ? (
          <div className="flex justify-center pt-8">
            <LineWave
              visible={true}
              height="100"
              width="100"
              color="#f0a0a0"
              ariaLabel="line-wave-loading"
              wrapperStyle={{}}
              wrapperClass=""
              firstLineColor=""
              middleLineColor=""
              lastLineColor=""
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {products && products.length > 0 ? (
              products.map((product, i) => (
                <ProductCard
                  product={product}
                  key={i}
                  saved={true}
                  productSaved={true}
                  getAllProducts={getProducts}
                />
              ))
            ) : (
              <h1 className=" mx-auto my-60">Product Not Found.</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
