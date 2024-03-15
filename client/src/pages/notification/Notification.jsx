import React from 'react'
import NotiCard from '../../components/Notification/NotiCard'
import { deleteAllNoti } from '../../api/notification'

const Notification = ({ notifications, getNotifications, getNotiCount }) => {
  const deleteAllNotiHandler = async () => {
    try {
      const response = await deleteAllNoti();
      if(!response.success) {
        throw new Error("No notification.");
      }
      getNotifications();
    } catch (error) {
      message.error(error.message);
    }
  }

  return (
    <div>
      <div className='flex justify-between mb-4'>
      <h1 className="text-lg font-semibold">Notifications</h1>
      {
        notifications && notifications.length > 0 && <button className=" text-red-500 font-medium hover:underline" onClick={deleteAllNotiHandler}>Delete all</button>
      }
      </div>
      {
        notifications && notifications.length > 0 ? (
            notifications.map((noti, i) => (
                <NotiCard noti={noti} key={i} getNotifications={getNotifications} getNotiCount={getNotiCount} />
            ))
        ) : (
            <div>
                <p>There is no new notifications yet.</p>
            </div>
        )
      }

    </div>
  )
}

export default Notification