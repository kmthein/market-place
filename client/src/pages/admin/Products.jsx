import React from 'react'
import moment from "moment";

const Products = ({ products }) => {
  return (
    <div>
    <h1 className="text-lg font-semibold mb-4">All Products</h1>
    {products && products.length > 0 ? (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Seller
              </th>
              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={product._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.seller.name}</td>
                <td className="px-6 py-4">
                  {moment(product.createdAt).format("MMM Do YY")}
                </td>
                <td className="px-6 py-4">
                  {product.status == "pending" ? (
                    <span className="bg-yellow-300 p-1 rounded-md text-black/80 text-sm">
                      pending
                    </span>
                  ) : (
                    <span className="bg-green-500 p-1 rounded-md text-black/80 text-sm">
                      approved
                    </span>
                  )}
                </td>
                {/* <td className="px-6 py-4 text-right flex gap-3">
                  <a
                    onClick={() => editHandler(product._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => deleteHandler(product._id)}
                    className="font-medium text-red-600 hover:text-red-400 dark:text-blue-500 hover:underline"
                  >
                    Delete
                  </a>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>
        <p className="text-center">Product not added yet.</p>
      </div>
    )}
  </div>
  )
}

export default Products