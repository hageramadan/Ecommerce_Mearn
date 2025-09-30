import React from "react";

function ProductForm({ editingProduct, onSubmit, onCancel }) {
  return (
    <div className="mt-6 border p-4 rounded bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          defaultValue={editingProduct?.name || ""}
          placeholder="Product Name"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <input
          name="price"
          type="number"
          defaultValue={editingProduct?.price || ""}
          placeholder="Price"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <input
          name="quantity"
          type="number"
          defaultValue={editingProduct?.quantity || ""}
          placeholder="Quantity"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <input
          name="category"
          defaultValue={editingProduct?.category?.Name || ""}
          placeholder="Category"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          name="images"
          type="file"
          accept="image/*"
          className="border p-2 rounded w-full mb-2"
        />
        <div className="flex gap-2">
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
