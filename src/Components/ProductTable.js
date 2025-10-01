import React from "react";

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="border p-2">Image</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Category</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const status = product.quantity > 0 ? "In Stock" : "Out of Stock";
          return (
            <tr key={product._id}>
              <td className="border p-2">
                <img
                  src={`https://raw.githubusercontent.com/MMarzoo/my-image/main/images/${product.images[0]}`}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.category?.Name}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">{product.quantity}</td>
              <td
                className={`border p-2 ${
                  status === "In Stock" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ProductTable;
