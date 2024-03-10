import React, { useEffect, useState } from "react";
import Badge from "../Badge";
import ProductCard from "../Product/ProductCard";
import { getApprovedProducts, getProductByFilter } from "../../api/product";
import { IoIosSearch } from "react-icons/io";
import { message } from "antd";
import { useSelector } from "react-redux";

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
  const [input, setInput] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(null);

  const getAllProducts = async () => {
    try {
      const response = await getApprovedProducts();
      if (!response.success) {
        throw new Error(response.message);
      }
      setProducts(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await getProductByFilter("searchKey", input);
      if (!response.success) {
        throw new Error(response.message);
      }
      setProducts(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const categoryHandler = async (i) => {
    try {
      setCategoryIndex(i);
      const selectedCategory = Categories[i].value;
      const response = await getProductByFilter("category", selectedCategory);
      if (!response.success) {
        throw new Error(response.message);
      }
      setProducts(response.data);
    } catch (error) {
      message.error(error.message);
    }
  }

  const { user } = useSelector((state) => state.reducer.user);

  return (
    <div className="py-8 max-w-[70%] mx-auto min-h-screen">
      <h1 className="text-xl font-semibold text-center my-4">All Product</h1>
      <form onSubmit={searchSubmitHandler}>
        <div className="mt-8 bg-white md:w-[45%] 2xl:w-[38%] rounded-full border mx-auto mb-8">
          <div className="flex items-center justify-between h-10">
          <input
            type="text"
            placeholder="search"
            className=" rounded-full outline-none px-2 border-0 w-full mx-4"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <IoIosSearch className="text-2xl mr-2 cursor-pointer" />
          </button>
          {
            input &&
            <span className="mr-2 pr-2 text-sm text-red-500 font-medium cursor-pointer hover:underline" onClick={getAllProducts}>Clear</span>
          }
          </div>
        </div>
      </form>
      <div className="flex gap-4 justify-center">
        <Badge label="All" className={`cursor-pointer hover:bg-[#e4baba] ${categoryIndex == null  && "bg-[#f0a0a0]"}`} onClick={() => {
          getAllProducts();
          setCategoryIndex(null);
        }} />
        {Categories.map((category, i) => (
            <Badge label={category.label} key={i} className={`cursor-pointer hover:bg-[#e4baba] ${i == categoryIndex && "bg-[#f0a0a0]"}`} onClick={() => categoryHandler(i)} />
        ))}
      </div>
      <div className=" mx-16 my-8">
        <div className="flex flex-wrap">
          {products && products.length > 0 ? (
            products.map((product) => <ProductCard product={product} setProducts={setProducts} getAllProducts={getAllProducts} productSaved={user?.saved_products.includes(product._id) ? (true) : (false)} />)
          ) : (
            <h1 className=" mx-auto my-60">Product Not Found.</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
