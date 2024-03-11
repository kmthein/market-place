import React, { useEffect, useState } from "react";
import {
  deleteProduct,
  getProductDetail,
  getProducts,
} from "../../api/product";
import moment from "moment";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, setLoading } from "../../store/slices/uiSlice";
import { LineWave } from "react-loader-spinner";

const Products = ({
  activeKey,
  setActiveKey,
  setEditMode,
  setOldProductId,
}) => {
  const [products, setProducts] = useState();

  const { isProcessing } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const getProductsHandler = async () => {
    dispatch(setLoading());
    try {
      const response = await getProducts();
      if (response.success) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
    dispatch(endLoading());
  };

  useEffect(() => {
    getProductsHandler();
  }, [activeKey]);

  const editHandler = (id) => {
    setActiveKey("2");
    setEditMode(true);
    setOldProductId(id);
  };

  const deleteHandler = async (id) => {
    const response = await deleteProduct(id);
    try {
      if (response.success) {
        message.success(response.message);
        getProductsHandler();
        setActiveKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">My Products</h1>
      {isProcessing && (
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
      )}
      {products && products.length > 0 && !isProcessing && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Sell Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={product._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">
                    {product.category.replaceAll("_", " ")}
                  </td>
                  <td className="px-6 py-4">
                    {moment(product.createdAt).format("MMM Do YY")}
                  </td>
                  <td className="px-6 py-4">
                    {product.status == "pending" && (
                      <span className="bg-yellow-300 p-1 rounded-md text-black/80 text-sm">
                        pending
                      </span>
                    )}
                    {product.status == "approved" && (
                      <span className="bg-green-500 p-1 rounded-md text-black/80 text-sm">
                        approved
                      </span>
                    )}
                    {product.status == "rejected" && (
                      <span className="bg-red-400 p-1 rounded-md text-black/80 text-sm">
                        rejected
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex gap-3">
                    <a
                      onClick={() => editHandler(product._id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      onClick={() => deleteHandler(product._id)}
                      className="font-medium text-red-600 hover:text-red-400 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isProcessing && !products && (
        <div>
          <p className="text-center">Product not added yet.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
