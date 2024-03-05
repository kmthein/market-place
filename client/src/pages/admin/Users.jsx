import React from "react";
import moment from "moment";
import { message } from "antd";
import { adminUserAction } from "../../api/admin";

const Users = ({ users, getAllUsersHandler }) => {
  const userActionHandler = async (type, id) => {
    try {
      const response = await adminUserAction({type, id});
      if(!response.success) {
        throw new Error(response.message);
      }
      getAllUsersHandler();
      message.success(response.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">All Users</h1>
      {users && users.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-auto py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={user._id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                  <span className={`${user.status == "active" ? "bg-green-500" : "bg-[#db5a5a]" } p-1 rounded-md text-black/80 text-sm`}>
                    {user.status}
                  </span>
                  </td>
                  <td className="px-6 py-4">
                    {moment(user.createdAt).format("MMM Do YY")}
                  </td>
                  <td className="py-4 px-auto">
                    {user.status == "banned" ? (
                      <a
                        onClick={() =>
                          userActionHandler("unban", user._id)
                        }
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Unban
                      </a>
                    ) : (
                      <a
                        onClick={() =>
                          userActionHandler("ban", user._id)
                        }
                        className="font-medium text-[#313131] hover:text-[#636363] hover:underline"
                      >
                        Ban
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p className="text-center">user not added yet.</p>
        </div>
      )}
    </div>
  );
};

export default Users;
