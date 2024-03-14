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
import { getAllDeals, savedNewDeal } from "../../api/deal";
import { formatDistanceToNow } from "date-fns";
import { pushNotification } from "../../api/notification";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [deals, setDeals] = useState([]);
  const { id } = useParams();

  const { isProcessing } = useSelector((state) => state.ui);

  const { user } = useSelector((state) => state.reducer.user);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const getDetailById = async () => {
    setIsLoading(true);
    try {
      const response = await getProductById(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      setProduct(response.data);
    } catch (error) {
      message.error(error.message);
    }
    setIsLoading(false);
  };

  const getDealsHandler = async () => {
    try {
      const response = await getAllDeals(id);
      if (!response.success) {
        throw new Error(response.message);
      }
      setDeals(response.data);
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    getDetailById();
    getDealsHandler();
  }, []);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const dealSubmitHandler = async (values) => {
    dispatch(setLoading());
    values.product_id = product._id;
    values.seller_id = product.seller._id;
    values.dealer_id = user._id;
    try {
      const response = await savedNewDeal(values);
      if(!response.success) {
        throw new Error(response.message);
      }
      message.success(response.message);
      await pushNotification({
        title: "New Deal Made",
        message: `Hi ${product.seller.name}, your ${product.name} was made a deal by ${user.name}.`,
        owner_id: product.seller._id,
        product_id: product._id
      })
      // form.resetFields();
    } catch (error) {
      message.error(error.message);
    }
    dispatch(endLoading());
  }

  return (
    <>
      {isLoading ? (
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
                <h1 className="text-2xl font-semibold">{product?.name}</h1>
                <p className="mt-2 pb-6 text-gray-700">
                  {product?.description}
                </p>
              </div>
              <TiArrowBackOutline
                className="text-3xl cursor-pointer"
                onClick={() => navigate(-1)}
              />
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
            {
              !user && (
                <div>
                  <h1 className="text-xl font-semibold mt-4">Make Deal</h1>
                  <p className="mt-3"><Link to="/login" className="underline">Login</Link> or <Link to="/register" className="underline">Register</Link> to deal this product.</p>
                </div>
              )
            }
            {user && user._id != product?.seller?._id && (
              <div>
                <h1 className="text-xl font-semibold mt-4">Make Deal</h1>
                <Form
                  initialValues={{
                    remember: true,
                  }}
                  layout="vertical"
                  onFinish={dealSubmitHandler}
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
            )}
            <hr />
            <div className="mb-6">            
              <h1 className="text-xl font-semibold mt-4">Recent Deals</h1>
            {
              deals && deals.length > 0 ? (
              deals.map((deal, i) => (
                <div className="" key={i}>
                <div className=" rounded-lg bg-[#f5f4f4] mt-4 px-4 py-3">
                  <h3 className="font-semibold mt-2">{deal.dealer_id.name}</h3>
                  <span className=" text-gray-500 text-sm">{formatDistanceToNow(deal.createdAt)} ago</span>
                  <p className="my-1">{deal.message}</p>
                </div>
            </div>
              ))
              ) : (
                <div className=" pb-4">
                <p className="mt-2 text-gray-500 text-md">There isn't any deal yet.</p>
                </div>
              )
            }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
