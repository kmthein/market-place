import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { useParams } from "react-router-dom";
import { message } from "antd";
import NoImgAvaiable from "../../images/no_image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, setLoading } from "../../store/slices/uiSlice";
import { LineWave } from "react-loader-spinner";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();

  const { isProcessing } = useSelector(state => state.ui);

  const dispatch = useDispatch();

  const getDetailById = async () => {
    dispatch(setLoading());
    try {
      const response = await getProductById(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      setProduct(response.data);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(endLoading());
  };

  useEffect(() => {
    getDetailById();
  }, []);

  return (
    <>
    {
      isProcessing ? (
        <div className="flex justify-center items-center h-[80vh]">
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
        <div className="xl:mx-[200px] flex gap-[100px]">
        {product && (
          <div className="w-[50%]">
            <div className="mt-20 w-full rounded-lg">
              {product?.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className=" h-96 object-contain object-center mx-auto"
                />
              ) : (
                <img src={NoImgAvaiable} className=" h-96 object-contain object-center mx-auto" />
              )}
            </div>
            <div className={`flex items-center gap-3 mt-3 img_scroll pb-3`}>
              {product.images && product?.images.length > 0 ? (
                product.images.map((image, index) => (
                  <img
                    src={image}
                    alt=""
                    className={`w-28 h-28 object-contain border rounded-lg ${
                      selectedImage == index && "border-4"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))
              ) : (
                <p className=" text-red-500 mt-2 font-medium">This product does not included images.</p>
              )}
            </div>
          </div>
        )}
        <div className=" w-[80%]">
          <h1 className="text-2xl font-semibold mt-20 ">{product?.name}</h1>
          <p className="mt-2 pb-6 text-gray-700">{product?.description}</p>
          <hr />
          <h1 className="text-xl font-semibold mt-4">Information</h1>
          <div className="mt-2 flex justify-between">
            <span className="font-medium">Category</span>
            <span>{product?.category?.replaceAll("_", " ")}</span>
          </div>
          <div className="mt-2 pb-6 flex justify-between">
            <span className="font-medium">Used For</span>
            <span>{product?.used_for}</span>
          </div>
          <hr />
          <h1 className="text-xl font-semibold mt-4">Details</h1>
          <div className="pb-6">
          {product?.product_has &&
            product.product_has.map((p, i) => (
              <div className="mt-2 flex justify-between" key={i}>
                <span className="font-medium">{p}</span>
                <span>Include</span>
              </div>
            ))}
          </div>
          <hr />
          <h1 className="text-xl font-semibold mt-4">Seller Information</h1>
          <div className="mt-2 flex justify-between">
            <span className="font-medium">Name</span>
            <span>{product?.seller?.name}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="font-medium">Email</span>
            <span>{product?.seller?.email}</span>
          </div>
        </div>
      </div>
      )
    }
    </>
  );
};

export default ProductDetail;
