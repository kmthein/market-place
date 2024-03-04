import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Form, Tabs } from "antd";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Users from "./Users";
import Products from "./Products";
import General from "./General";
import { getAllProducts } from "../../api/admin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [editMode, setEditMode] = useState(false);
  const [oldProductId, setOldProductId] = useState(null);

  const [products, setProducts] = useState([]);

  const [form] = Form.useForm();
  const onChange = (key) => {
    setActiveKey(key);
    setEditMode(false);
  };

  const getAllProductsHandler = async () => {
    try {
      const response = await getAllProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const {user} = useSelector((state) => state.reducer.user);

  const navigate = useNavigate();

  const isAdmin = () => {
    if(user.role != "admin") {
        navigate("/");
    }
  }
  
  useEffect(() => {
    isAdmin();
    getAllProductsHandler();
  }, [activeKey])

  const items = [
    {
      key: "1",
      label: "Manage Products",
      children: <Products products={products} />,
      icon: <MdOutlineProductionQuantityLimits className=" inline-block text-lg" />
    },
    {
      key: "2",
      label: "Manage Users",
      children: <Users />,
      icon: <MdOutlineAddCircleOutline className=" inline-block text-lg" />
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 3",
      icon: <IoMdNotificationsOutline className=" inline-block text-lg" />
    },
    {
      key: "4",
      label: "Profile",
      children: <General setActiveKey={setActiveKey} />,
      icon: <IoPersonCircleOutline className=" inline-block text-lg" />
    },
  ];
  
  return (
    <div>
      <Navbar home={false} />
      <div className=" h-screen pt-10">
      <Tabs activeKey={activeKey} items={items} tabPosition="left" onChange={onChange} className="xl:mx-[200px] 2xl:mx-[300px] bg-[#ffffff]" />
      </div>
    </div>
  );
};

export default Index;
