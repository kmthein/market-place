import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const NotiCard = ({ noti }) => {
  return (
    <>
      {/* bg-[#f1f1f1] */}
      <div className={` rounded-md bg-[#e4e4e4] px-4 py-5`}>
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{noti?.title}</h3>
          <span className=" text-gray-500 text-sm">{formatDistanceToNow(noti?.createdAt)} ago</span>
        </div>

        <p className="my-1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam illo
          dolore expedita incidunt accusantium laboriosam. Maiores minima
          voluptate molestias ea.
        </p>
        <p>Contact Number - 0996232358</p>
        <hr />
        <div className="text-right">
            <Link to={`/products/id`} className=" text-blue-700 font-medium">View Deal</Link>
        </div>
      </div>
    </>
  );
};

export default NotiCard;
