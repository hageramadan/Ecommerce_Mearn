import React, { useState } from "react";

function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(e);

    if (Array.isArray(result?.errors)) {
      const mappedErrors = {};

      result.errors.forEach((msg) => {
        if (msg.toLowerCase().includes("name")) mappedErrors.name = msg;
        if (msg.toLowerCase().includes("price")) mappedErrors.price = msg;
        if (msg.toLowerCase().includes("quantity")) mappedErrors.quantity = msg;
        if (msg.toLowerCase().includes("category")) mappedErrors.category = msg;
        if (
          msg.toLowerCase().includes("image") ||
          msg.toLowerCase().includes("images")
        )
          mappedErrors.images = msg;
      });

      setErrors(mappedErrors);
    } else {
      setErrors(result?.errors || {});
    }
  };

  return (
    <div className="mt-6 border p-4 rounded bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          defaultValue={editingProduct?.name || ""}
          placeholder="Product Name"
          className="border p-2 rounded w-full mb-1"
        />
        {errors.name && (
          <span className="text-red-600 text-sm block mb-2">{errors.name}</span>
        )}

        <input
          name="price"
          type="number"
          defaultValue={editingProduct?.price || ""}
          placeholder="Price"
          className="border p-2 rounded w-full mb-1"
        />
        {errors.price && (
          <span className="text-red-600 text-sm block mb-2">
            {errors.price}
          </span>
        )}

        <input
          name="quantity"
          type="number"
          defaultValue={editingProduct?.quantity || ""}
          placeholder="Quantity"
          className="border p-2 rounded w-full mb-1"
        />
        {errors.quantity && (
          <span className="text-red-600 text-sm block mb-2">
            {errors.quantity}
          </span>
        )}

        <input
          name="category"
          defaultValue={editingProduct?.category?.Name || ""}
          placeholder="Category"
          className="border p-2 rounded w-full mb-1"
        />
        {errors.category && (
          <span className="text-red-600 text-sm block mb-2">
            {errors.category}
          </span>
        )}

        <input
          name="images"
          type="file"
          accept="image/*"
          className="border p-2 rounded w-full mb-1"
        />
        {errors.images && (
          <span className="text-red-600 text-sm block mb-2">
            {errors.images}
          </span>
        )}

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {editingProduct ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
