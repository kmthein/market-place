import React from "react";
import { GiBasket } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";

const Navbar = ({ home }) => {
  return (
    <div className={` bg-[#EFEBEA] py-4`}>
      <div className=" w-full px-40 flex justify-between items-center">
        <div className="flex items-end gap-3">
          <Link to="/">
            <h3 className="text-3xl font-extrabold hover:-translate-y-[2px] duration-200 outline-none hover:text-[#353535]">ShopXchange</h3>
          </Link>
          <GiBasket className="text-3xl mb-1" />
        </div>
        <div className="pr-2">
          <Link to="/login">
            <IoPerson className=" text-2xl hover:-translate-y-[2px] hover:text-[25px] duration-200 outline-none hover:text-[#353535]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
