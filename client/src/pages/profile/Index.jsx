import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Tabs } from "antd";
import AddProduct from "./AddProduct";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import General from "./General";
import Products from "./Products";

const Index = () => {
  const [activeKey, setActiveKey] = useState("1");
  const onChange = (key) => {
    setActiveKey(key);
  };

  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products activeKey={activeKey} />,
      icon: <MdOutlineProductionQuantityLimits className=" inline-block text-lg" />
    },
    {
      key: "2",
      label: "Sell Product",
      children: <AddProduct setActiveKey={setActiveKey} />,
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
      <Tabs activeKey={activeKey} items={items} tabPosition="left" onChange={onChange} className="xl:mx-[200px] 2xl:mx-[400px] bg-[#ffffff]" />
      </div>
    </div>
  );
};

export default Index;
