import React from "react";
import { GiBasket } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { Dropdown, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Navbar = ({home}) => {
  const items = [
    {
      key: "1",
      label: (
        <Link to="/login" className="flex items-center gap-1">
          <span>Login</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/register" className="flex items-center gap-1">
          <span>Register</span>
        </Link>
      ),
    },
  ];

  const userId = useSelector(state => state.reducer);
  console.log(userId);

  return (
    <div className={` ${home ? "bg-[#EFEBEA]" : "bg-[#EFEBEA]" }  py-4`}>
      <div className=" w-full xl:px-40 2xl:px-60 flex justify-between items-center">
        <div className="flex items-end gap-3">
          <Link to="/">
            <h3 className="text-3xl font-extrabold hover:-translate-y-[2px] duration-200 outline-none hover:text-[#353535]">
              ShopXchange
            </h3>
          </Link>
          <GiBasket className="text-3xl mb-1" />
        </div>
        {
          userId  ? (
            <Link to="/profile" className="flex items-center gap-1">
              <UserOutlined className="text-xl" />
            </Link>
          ) : (
            <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="text-base cursor-pointer">
                <span>My Account</span>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          )
        }

          {/* <Link to="/register" className="flex items-center gap-1">
            <button className="bg-[#cf8e9c] mr-2 py-2 px-5 rounded-full">
              Sign up
            </button>
          </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
