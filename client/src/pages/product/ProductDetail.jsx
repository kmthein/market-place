import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Input, message } from "antd";
import NoImgAvaiable from "../../images/no_image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, setLoading } from "../../store/slices/uiSlice";
import { LineWave } from "react-loader-spinner";
import SubmitButton from "../../components/SubmitButton";
import { TiArrowBackOutline } from "react-icons/ti";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();

  const { isProcessing } = useSelector((state) => state.ui);

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

  const navigate = useNavigate();

  return (
    <>
      {isProcessing ? (
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
                  <img
                    src={NoImgAvaiable}
                    className=" h-96 object-contain object-center mx-auto"
                  />
                )}
              </div>
              <div className={`flex items-center gap-3 mt-8 img_scroll pb-3`}>
                {product.images && product?.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <img
                      src={image}
                      key={index}
                      alt=""
                      className={`w-28 h-28 object-contain border rounded-lg ${
                        selectedImage == index && "border-4"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))
                ) : (
                  <p className=" text-red-500 mt-2 font-medium">
                    This product does not included images.
                  </p>
                )}
              </div>
            </div>
          )}
          <div className=" w-[80%]">
            <div className="flex mt-20 justify-between">
              <div className=" w-[95%]">
                <h1 className="text-2xl font-semibold">
                  {product?.name}
                </h1>
                <p className="mt-2 pb-6 text-gray-700">
                  {product?.description}
                </p>
              </div>
               <TiArrowBackOutline className="text-3xl cursor-pointer" onClick={() => navigate(-1)} />
            </div>

            <hr />
            <h1 className="text-xl font-semibold mt-4">Information</h1>
            <div className="mt-2 flex justify-between">
              <span className="font-medium">Price</span>
              <span>${product?.price}</span>
            </div>
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
              {product.product_has == "" && (
                <p className="pt-2 text-gray-500 text-md">
                  Details not included.
                </p>
              )}
            </div>
            <hr />
            <h1 className="text-xl font-semibold mt-4">Seller Information</h1>
            <div className="mt-2 flex justify-between">
              <span className="font-medium">Name</span>
              <span>{product?.seller?.name}</span>
            </div>
            <div className="mt-2 pb-6 flex justify-between">
              <span className="font-medium">Email</span>
              <span>{product?.seller?.email}</span>
            </div>
            <hr />
            <h1 className="text-xl font-semibold mt-4">Make Deal</h1>
            <Form
              initialValues={{
                remember: true,
              }}
              layout="vertical"
              onFinish={() =>
                message.success("You deal was sent successfully.")
              }
            >
              <Form.Item
                name="message"
                label="Text"
                className="mt-2"
                rules={[
                  {
                    required: true,
                    message: "Message must contains.",
                  },
                  {
                    min: 3,
                    message: "Message must be at least 3 characters.",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Write something..." />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                className="mt-2"
                rules={[
                  {
                    required: true,
                    message: "Phone number must contains.",
                  },
                  {
                    min: 6,
                    message: "Phone number must be valid.",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Phone number..." />
              </Form.Item>
              <div className="flex justify-end pb-8">
                <SubmitButton>Submit</SubmitButton>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
