import React, { useEffect, useState } from "react";
import Badge from "../Badge";
import ProductCard from "../Product/ProductCard";
import { getApprovedProducts } from "../../api/product";

const AllProduct = () => {
  const Categories = [
    {
      value: "clothing_and_fashion",
      label: "Clothing and Fashion",
    },
    {
      value: "electronics_and_gadgets",
      label: "Electronics and Gadgets",
    },
    {
      value: "home_and_furniture",
      label: "Home and Furniture",
    },
    {
      value: "beauty_and_personal_care",
      label: "Beauty and Personal Care",
    },
    {
      value: "books_and_media",
      label: "Books and Media",
    },
    {
      value: "sports_and_fitness",
      label: "Sports and Fitness",
    },
    {
      value: "toys_and_games",
      label: "Toys and Games",
    },
  ];

  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
        const response = await getApprovedProducts();
        if(!response.success) {
            throw new Error(response.message);
        }
        setProducts(response.data);
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  return (
    <div className="py-8 max-w-[70%] mx-auto">
      <h1 className="text-xl font-semibold text-center my-4">All Product</h1>
      <div className="flex gap-4 justify-center">
        {
            Categories.map((category, i) => (
                <Badge label={category.label} key={i} />
            ))
        }
      </div>
      <div className=" mx-16 my-8">
        <div className="flex flex-wrap">
            {
                products && products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard product={product} />
                    ))
                ) : (
                    <h1>Product Not Found.</h1>
                )
            }
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
