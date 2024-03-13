import React from "react";
import NoImgAvaiable from "../../images/no_image.jpg";
import Badge from "../Badge";
import { IoBookmarkOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { saveProduct, unsaveProduct } from "../../api/product";
import { message } from "antd";
import { GoBookmarkSlash } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { saveProductAction, unsaveProductAction } from "../../store/slices/userSlice";

const ProductCard = ({ product, saved = false, setProducts, productSaved = false, getAllProducts }) => {
  const dispatch = useDispatch();

  const productStatusHandler = async (type, id) => {
    try {
      let response;
      if(type == "save") {
        response = await saveProduct(id);
        dispatch(saveProductAction(response.data));
      } else {
        response = await unsaveProduct(id);
        dispatch(unsaveProductAction(response.data));
        productSaved = true;
        if(saved) {
          getAllProducts();
        }
      }
      if (!response.success) {
        throw new Error(response.message);
      }
      message.success(response.message);
    } catch (error) {
      message.error(error.message);
    }
  };

  const { user } = useSelector((state) => state.reducer.user);
  
  return (
    <div className=" w-[23%] px-2 mb-5 product_card py-4 rounded-md hover:-translate-y-1 hover:bg-[#ffffff] duration-150">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.images[0] || NoImgAvaiable}
          alt={product.name}
          className=" w-full h-[200px] object-contain mb-5"
        />
      </Link>
      <div className="mt-3">
        <div className="mb-2">
          <Badge label={product.category?.replaceAll("_", " ")} />
        </div>
        <div className="flex justify-between items-center">
          <Link to={`/products/${product._id}`}>
            <h2 className="font-medium">{product.name}</h2>
          </Link>
          {user &&
            (saved ? (
              <GoBookmarkSlash
                className="text-2xl cursor-pointer hover:text-gray-500 duration-150"
                onClick={() => productStatusHandler("unsave", product._id)}
              />
            ) : (
              !productSaved ?
              <IoBookmarkOutline
                className="text-2xl cursor-pointer hover:text-gray-500 duration-150"
                onClick={() => productStatusHandler("save", product._id)}
              /> :
              <GoBookmarkSlash
              className="text-2xl cursor-pointer hover:text-gray-500 duration-150"
              onClick={() => productStatusHandler("unsave", product._id)}
            /> 
            ))}
        </div>
        <span className="mt-3 font-medium">${product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
