import React from 'react'
import NotiCard from '../../components/Notification/NotiCard'

const Notification = ({ notifications, getNotifications, getNotiCount }) => {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Notifications</h1>
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