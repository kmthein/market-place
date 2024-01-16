import { Button, Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { MdOutlineSell } from "react-icons/md";
import { sellProduct } from "../../api/product";
import { useForm } from "antd/es/form/Form";

const AddProduct = ({ setActiveKey }) => {
  const [form] = useForm();
  const onFinish = async (values) => {
    try {
      const response = await sellProduct(values);
      if(response.success) {
        message.success("Product is added successfully.");
        form.resetFields();
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
      <h1 className="text-lg font-semibold mb-4">What you want to sell?</h1>
      <Form layout="vertical" name="sell_product" onFinish={onFinish}>
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
        <Form.Item
          label="This product has"
          name="product_has"
        >
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
        <button type="submit" className="bg-[#4254b6] text-white hover:bg-[#374699] hover:-rotate-2 hover:text-gray-200 flex font-medium h-10 px-2 gap-1 items-center ml-auto rounded-md">
          <MdOutlineSell className="text-lg" />
          Sell
        </button>
      </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
