import React from "react";
import { GiBasket } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="bg-[#CBD5F0] text-[#194F92] py-4">
      <div className=" w-full px-20 flex justify-between items-center">
        <div className="flex items-end gap-3">
          <Link to="/">
            <h3 className="title-font text-3xl font-bold">ShopXchange</h3>
          </Link>
          <GiBasket className="text-3xl mb-1 text-[#194F92] bg-[#CBD5F0]" />
        </div>
        <div className="pr-2">
          <Link to="/login">
            <IoMdPerson className=" text-2xl hover:text-[27px] duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
