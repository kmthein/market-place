import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Form, Tabs, message } from "antd";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import Users from "./Users";
import Products from "./Products";
import General from "./General";
import { getAllProducts, getAllUsers } from "../../api/admin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Notification from "../notification/Notification";
import { getAllNotifications, getUnreadNotiCount } from "../../api/notification";

const Index = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [editMode, setEditMode] = useState(false);
  const [oldProductId, setOldProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notiCount, setNotiCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const [form] = Form.useForm();
  const onChange = (key) => {
    setActiveKey(key);
    setEditMode(false);
  };

  const getAllProductsHandler = async (page = 1, perPage = 10) => {
    try {
      const response = await getAllProducts(page, perPage);
      if (response.success) {
        setProducts(response.data);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setTotalProducts(response.totalProducts);
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

  const getAllUsersHandler = async () => {
    try {
      const response = await getAllUsers();
      if(!response.success) {
        throw new Error(response.message);
      }
      setUsers(response.data);
    } catch (error) {
      message.error(error.message);      
    }
  }

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
  
  useEffect(() => {
    isAdmin();
    if(activeKey == "1" || "2") {
      getAllProductsHandler();
    } 
    getAllUsersHandler();
    getNotiCount();
    getNotifications();
  }, [activeKey])

  const items = [
    {
      key: "1",
      label: "Dashboard",
      children: <Dashboard products={products} users={users} totalProducts={totalProducts} />,
      icon: <RxDashboard className=" inline-block text-lg" />
    },
    {
      key: "2",
      label: "Manage Products",
      children: <Products products={products} getAllProductsHandler={getAllProductsHandler} currentPage={currentPage} totalPages={totalPages} />,
      icon: <MdOutlineProductionQuantityLimits className=" inline-block text-lg" />
    },
    {
      key: "3",
      label: "Manage Users",
      children: <Users users={users} getAllUsersHandler={getAllUsersHandler} />,
      icon: <MdOutlineAddCircleOutline className=" inline-block text-lg" />
    },
    {
      key: "4",
      label: "Notification",
      children: <Notification />,
      icon: <IoMdNotificationsOutline className=" inline-block text-lg" />
    },
    {
      key: "5",
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
