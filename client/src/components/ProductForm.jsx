import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tabs,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import {
  MdOutlineAddCircleOutline,
  MdOutlineProductionQuantityLimits,
  MdOutlineSell,
} from "react-icons/md";
import { getProductDetail, sellProduct, updateProduct } from "../api/product";
import UploadImage from "./UploadImage";
import SubmitButton from "./SubmitButton";
import { useDispatch } from "react-redux";
import { endLoading, setLoading } from "../store/slices/uiSlice";

const ProductForm = ({ setActiveKey, editMode, oldProductId }) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);
  const [productId, setProductId] = useState(null);

  const [productActiveKey, setProductActiveKey] = useState("1");

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(setLoading());
    try {
      let response;
      let msg;
      if (editMode) {
        values.sellerId = sellerId;
        values._id = productId;
        response = await updateProduct(values);
        msg = "Product updated successfully.";
      } else {
        response = await sellProduct(values);
        msg = "Product is added successfully.";
      }
      if (response.success) {
        message.success(msg);
        form.resetFields();
        setActiveKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(endLoading());
  };

  const getProductDetailHandler = async () => {
    const response = await getProductDetail(oldProductId);
    const {
      name,
      description,
      price,
      category,
      used_for,
      product_has,
      seller,
      _id,
    } = response.productDoc;
    setSellerId(seller);
    setProductId(_id);
    const modifiedProduct = {
      name,
      description,
      price,
      category,
      used_for,
      product_has,
    };
    form.setFieldsValue(modifiedProduct);
  };

  useEffect(() => {
    if (editMode) {
      getProductDetailHandler();
    } else {
      form.resetFields();
    }
  }, [editMode]);

  const items = [
    {
      key: "1",
      label: "Product Details",
      children: (
        <div>
          <h1 className="text-lg font-semibold mb-4">
            {editMode ? "Edit your product" : "What you want to sell?"}
          </h1>
          <Form
            layout="vertical"
            name="sell_product"
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your product name!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your product description!",
                },
              ]}
              hasFeedback
            >
              <TextArea rows={4} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input your product price!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Choose a category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Category must be choose!",
                    },
                  ]}
                  hasFeedback
                >
                  <Select
                    defaultValue=""
                    style={{}}
                    options={[
                      {
                        value: "clothing",
                        label: "Clothing",
                      },
                      {
                        value: "electronics",
                        label: "Electronics",
                      },
                      {
                        value: "home_and_furniture",
                        label: "Home and Furniture",
                      },
                      {
                        value: "books_and_stationery",
                        label: "Books and Stationery",
                      },
                      {
                        value: "health_and_beauty",
                        label: "Health and Beauty",
                      },
                      {
                        value: "sports_and_outdoors",
                        label: "Sports and Outdoors",
                      },
                      {
                        value: "toys_and_games",
                        label: "Toys and Games",
                      },
                      {
                        value: "automotive",
                        label: "Automotive",
                      },
                      {
                        value: "jewelry_and_accessories",
                        label: "Jewelry and Accessories",
                      },
                      {
                        value: "art_and_collectibles",
                        label: "Art and Collectibles",
                      },
                      {
                        value: "pet_supplies",
                        label: "Pet Supplies",
                      },
                      {
                        value: "food_and_drink",
                        label: "Food and Drink",
                      },
                      // Add more categories as needed
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Used for"
                  name="used_for"
                  rules={[
                    {
                      required: true,
                      message: "Product's used time must write!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="eg - 3 months" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="This product has" name="product_has">
              <Checkbox.Group
                options={[
                  {
                    label: "Warranty",
                    value: "warranty",
                  },
                  {
                    label: "Accessories",
                    value: "accessories",
                  },
                  {
                    label: "Voucher",
                    value: "voucher",
                  },
                ]}
                defaultValue={[""]}
              />
            </Form.Item>
            <Form.Item>
              {editMode ? (
                <SubmitButton
                >
                  <MdOutlineSell className="text-lg" />
                  Update
                </SubmitButton>
              ) : (
                <SubmitButton>
                  <MdOutlineSell className="text-lg" />
                  Sell
                </SubmitButton>
              )}
            </Form.Item>
          </Form>
        </div>
      ),
    },
    editMode
      ? {
          key: "2",
          label: "Product Images",
          children: <UploadImage oldProductId={oldProductId} setActiveKey={setActiveKey} />,
        }
      : null,
  ];

  const onChange = (key) => {
    setProductActiveKey(key);
  };

  return (
    <>
      <Tabs
        productActiveKey={productActiveKey}
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default ProductForm;
