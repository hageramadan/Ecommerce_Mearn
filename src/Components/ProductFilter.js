import React from "react";

function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  selectedPriceOrder,
  onPriceOrderChange,
}) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border p-2 rounded w-1/3"
      />

      <select
        className="border p-2 rounded"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.Name}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded"
        value={selectedPriceOrder}
        onChange={(e) => onPriceOrderChange(e.target.value)}
      >
        <option value="">Price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
}

export default ProductFilters;
