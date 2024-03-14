import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Avatar, Badge, Form, Tabs, notification } from "antd";
import AddProduct from "./ManageProduct";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import General from "./General";
import Products from "./Products";
import ManageProduct from "./ManageProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllNotifications, getUnreadNotiCount } from "../../api/notification";
import Notification from "../notification/Notification";

const Index = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [editMode, setEditMode] = useState(false);
  const [oldProductId, setOldProductId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notiCount, setNotiCount] = useState(0);

  const [form] = Form.useForm();
  const onChange = (key) => {
    setActiveKey(key);
    setEditMode(false);
  };

  const getProductsHandler = async () => {
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
  };

  const getNotiCount = async () => {
    try {
      const response = await getUnreadNotiCount();
      if (response.success) {
        setNotiCount(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
      setNotiCount(0);
    }
  }

  const getNotifications = async () => {
    try {
      const response = await getAllNotifications();
      if(!response.success) {
        throw new Error(response.message);
      }
      setNotifications(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const {user} = useSelector((state) => state.reducer.user);

  const navigate = useNavigate();

  const isNotUser = () => {
    if(user.role == "admin") {
        navigate("/");
    }
  }

  useEffect(() => {
    isNotUser();
    getNotiCount();
    getNotifications();
  }, [activeKey])

  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products activeKey={activeKey} setActiveKey={setActiveKey} setEditMode={setEditMode} setOldProductId={setOldProductId} getProductsHandler={getProductsHandler} />,
      icon: <MdOutlineProductionQuantityLimits className=" inline-block text-lg" />
    },
    {
      key: "2",
      label: "Sell Product",
      children: <ManageProduct setActiveKey={setActiveKey} editMode={editMode} oldProductId={oldProductId} />,
      icon: <MdOutlineAddCircleOutline className=" inline-block text-lg" />
    },
    {
      key: "3",
      label: <span>Notification <Badge count={notiCount} className=" absolute bottom-5 right-3" /></span>,
      children: <Notification notifications={notifications} getNotifications={getNotifications} getNotiCount={getNotiCount} />,
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
      <Tabs activeKey={activeKey} items={items} tabPosition="left" onChange={onChange} className="xl:mx-[200px] bg-[#ffffff]" />
      </div>
    </div>
  );
};

export default Index;
