import React from "react";
import { useSelector } from "react-redux";

const General = () => {
  const { user } = useSelector((state) => state.reducer.user);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Personal Information</h1>
      <div className="mb-4">
        <span className="font-semibold">Name: </span>
        <span className="ml-2">{user?.name}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Email: </span>
        <span className="ml-2">{user?.email}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Role: </span>
        <span className="ml-2">{user?.role}</span>
      </div>
    </div>
  );
};

export default General;
