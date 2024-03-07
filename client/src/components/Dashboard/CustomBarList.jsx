import { BarList, Card } from '@tremor/react';

const data = [
  {
    name: 'Twitter',
    value: 456,
  },
  {
    name: 'Google',
    value: 351,
  },
  {
    name: 'GitHub',
    value: 271,
  },
  {
    name: 'Reddit',
    value: 191,
  },
  {
    name: 'Youtube',
    value: 91,
  },
];

function CustomBarList({ products }) {
  const orderByCategory = {};

  products.forEach((product) => {
    const productCategory = product.category;
    if(!orderByCategory[productCategory]) {
      orderByCategory[productCategory] = 0;
    } 
    orderByCategory[productCategory] += 1;
  })

  const data = Object.entries(orderByCategory).map(([key, val]) => ({
    name: key.toUpperCase().replaceAll("_", " "),
    value: val
  }));

  data.sort((a, b) => b.value - a.value);

  return (
    <Card className="mx-auto w-full">
      <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Order By Category</h3>
      <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
        <span>Source</span>
        <span>Views</span>
      </p>
      <BarList data={data} className="mt-2" />
    </Card>
  );
}

export default CustomBarList;