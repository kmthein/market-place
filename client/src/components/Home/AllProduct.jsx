import React, { useEffect, useState } from "react";
import Badge from "../Badge";
import ProductCard from "../Product/ProductCard";
import { getApprovedProducts, getProductByFilter } from "../../api/product";
import { IoIosSearch } from "react-icons/io";
import { Pagination, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, setLoading } from "../../store/slices/uiSlice";
import { LineWave } from "react-loader-spinner";

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
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { isProcessing } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const getAllProducts = async (page = 1, perPage = 8) => {
    dispatch(setLoading());
    try {
      const response = await getApprovedProducts(page, perPage);
      if (!response.success) {
        throw new Error(response.message);
      }
      setProducts(response.data);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
    } catch (error) {}
    dispatch(endLoading());
  };

  useEffect(() => {
    getAllProducts(1, 8);
  }, []);

  const searchSubmitHandler = async (e) => {
    dispatch(setLoading());
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
    dispatch(endLoading());
  };

  const categoryHandler = async (i) => {
    dispatch(setLoading());
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
    dispatch(endLoading());
  };

  const handlePagination = (page, perPage) => {
    getAllProducts(page, perPage)
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
            {input && (
              <span
                className="mr-2 pr-2 text-sm text-red-500 font-medium cursor-pointer hover:underline"
                onClick={getAllProducts}
              >
                Clear
              </span>
            )}
          </div>
        </div>
      </form>
      <div className="flex gap-4 justify-center">
        <Badge
          label="All"
          className={`cursor-pointer hover:bg-[#e4baba] ${
            categoryIndex == null && "bg-[#f0a0a0]"
          }`}
          onClick={() => {
            getAllProducts();
            setCategoryIndex(null);
          }}
        />
        {Categories.map((category, i) => (
          <Badge
            label={category.label}
            key={i}
            className={`cursor-pointer hover:bg-[#e4baba] ${
              i == categoryIndex && "bg-[#f0a0a0]"
            }`}
            onClick={() => categoryHandler(i)}
          />
        ))}
      </div>
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
        <div className=" mx-16 my-8">
          <div className="flex flex-wrap gap-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  product={product}
                  setProducts={setProducts}
                  getAllProducts={getAllProducts}
                  productSaved={
                    user?.saved_products.includes(product._id) ? true : false
                  }
                />
              ))
            ) : (
              <h1 className=" mx-auto my-60">Product Not Found.</h1>
            )}
          </div>
          {
            categoryIndex == null && input == null && (
              <div className=" flex justify-center">
                <Pagination current={currentPage} total={totalPages * 8} onChange={handlePagination} />
              </div>
            )
          }
        </div>
      )}
    </div>
  );
};

export default AllProduct;
