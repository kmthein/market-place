import React, { useEffect, useState } from "react";
import CustomCard from "../../components/Dashboard/Card";
import { AiOutlineStock, AiOutlineShopping } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import CustomAreaChart from "../../components/Dashboard/CustomAreaChart";
import CustomBarList from "../../components/Dashboard/CustomBarList";

const Dashboard = ({ products, users, totalProducts }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  const calcTotalSales = () => {
    const totalAmount = products.reduce((a, b) => {
        return a + Number(b.price);
    }, 0);
    setTotalSales(totalAmount);
  }
  useEffect(() => {
    calcTotalSales();
    setActiveUsers(users.length);
  }, [products])

  return (
    <div className="py-2">
      <div className="flex gap-2">
        <CustomCard
          title={"Total Sales"}
          count={`$${totalSales}`}
          icon={AiOutlineStock}
          note={"dollar"}
        />
        <CustomCard
          title={"Active Users"}
          count={activeUsers}
          icon={FaUsers}
          note={"users"}
        />
        <CustomCard
          title={"Total Products"}
          count={totalProducts}
          icon={AiOutlineShopping}
          note={"items"}
        />
      </div>
      <div className="mx-4 mt-4 border rounded-md p-4">
        <CustomAreaChart products={products} />
      </div>
      <div className="mx-4 mt-4">
        <CustomBarList products={products} />
      </div>
    </div>
  );
};

export default Dashboard;
