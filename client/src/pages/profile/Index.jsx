import React from "react";
import Navbar from "../../components/Navbar";
import { Tabs } from "antd";
import AddProduct from "./AddProduct";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const Index = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Products",
      children: "Content of Tab Pane 1",
      icon: <MdOutlineProductionQuantityLimits className=" inline-block text-lg" />
    },
    {
      key: "2",
      label: "Add Product",
      children: <AddProduct />,
      icon: <MdOutlineAddCircleOutline className=" inline-block text-lg" />
    },
    {
      key: "3",
      label: "Notfication",
      children: "Content of Tab Pane 3",
      icon: <IoMdNotificationsOutline className=" inline-block text-lg" />
    },
    {
      key: "4",
      label: "Profile",
      children: "Content of Tab Pane 4",
      icon: <IoPersonCircleOutline className=" inline-block text-lg" />
    },
  ];
  return (
    <div>
      <Navbar home={false} />
      <div className=" h-screen pt-10">
      <Tabs defaultActiveKey="1" items={items} tabPosition="left" onChange={onChange} className="mx-[400px] bg-[#ffffff]" />
      </div>
    </div>
  );
};

export default Index;
