import { AreaChart } from '@tremor/react';
import { useState } from 'react';
import { format } from "date-fns";

const chartdata = [
  {
    date: 'Jan 23',
    2022: 45,
    2023: 78,
  },
  {
    date: 'Feb 23',
    2022: 52,
    2023: 71,
  },
  {
    date: 'Mar 23',
    2022: 48,
    2023: 80,
  },
  {
    date: 'Apr 23',
    2022: 61,
    2023: 65,
  },
  {
    date: 'May 23',
    2022: 55,
    2023: 58,
  },
  {
    date: 'Jun 23',
    2022: 67,
    2023: 62,
  },
  {
    date: 'Jul 23',
    2022: 60,
    2023: 54,
  },
  {
    date: 'Aug 23',
    2022: 72,
    2023: 49,
  },
  {
    date: 'Sep 23',
    2022: 65,
    2023: 52,
  },
  {
    date: 'Oct 23',
    2022: 68,
    2023: null,
  },
  {
    date: 'Nov 23',
    2022: 74,
    2023: null,
  },
  {
    date: 'Dec 23',
    2022: 71,
    2023: null,
  },
];

const CustomAreaChart = ({ products }) => {
  const currentDate = new Date();
  const last7days = new Date();
  last7days.setDate(currentDate.getDate() - 7);

  const productDailySellRate = {};

  products.forEach((product) => {
    const productSellDate = new Date(product.createdAt);
    if(productSellDate >= last7days && productSellDate <= currentDate) {
    const formatSellDate = format(new Date(productSellDate), 'dd/MM');
      if(!productDailySellRate[formatSellDate]) {
        productDailySellRate[formatSellDate] = 0;
      }
      productDailySellRate[formatSellDate] += 1;
    }
  })

  const chartdata = Object.entries(productDailySellRate).map(([key, val]) => ({
    date: key,
    "Product Sell Rate": val
  }));

  const chart = chartdata.toReversed();

  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Product Sell Rate
      </h3>
      <AreaChart
        className="mt-4 h-72"
        data={chart}
        index="date"
        categories={['Product Sell Rate']}
        colors={['blue', 'red']}
        yAxisWidth={30}
        connectNulls={true}
      />
    </>
  );
}

export default CustomAreaChart;