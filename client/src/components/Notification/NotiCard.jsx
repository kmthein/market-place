import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { updateNotiRead } from "../../api/notification";

const NotiCard = ({ noti, getNotifications, getNotiCount }) => {
  const notiReadHandler = async (id) => {
    try {
      const response = await updateNotiRead(id);
      if(!response.success) {
        throw new Error(response.message);
      }
      getNotifications();
      getNotiCount();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className={` rounded-md ${noti.isRead ? "bg-[#f7f7f7] " : "bg-[#e4e4e4] cursor-pointer"} px-4 py-5 mb-5 `} onClick={() => !noti.isRead && notiReadHandler(noti._id)}>
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{noti?.title}</h3>
          <span className=" text-gray-500 text-sm">{formatDistanceToNow(noti?.createdAt)} ago</span>
        </div>

        <p className="my-1">
          {noti?.message}
        </p>
        <div className="text-right">
            <Link to={`/products/${noti.product_id}`} className=" text-blue-700 font-medium">View Deal</Link>
        </div>
      </div>
    </>
  );
};

export default NotiCard;
