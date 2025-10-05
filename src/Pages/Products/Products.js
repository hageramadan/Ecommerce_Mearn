import React, { useMemo, useState, useEffect } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig.js";
import { motion, AnimatePresence } from "framer-motion";

export default function Products() {
  // State
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [sortBy, setSortBy] = useState("relevance");

  // Fetch products
  useEffect(() => {
    axiosInstance
      .get("/products/")
      .then((res) => {
        setProducts(res.data.data);
         console.log("Products API Response:", res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch categories
  useEffect(() => {
    axiosInstance
      .get("/category")
      .then((res) => {
        setCategories(res.data.data || []);
        console.log("Categories API Response:", res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Helpers
  const toggleCategory = (cat) => {
    const copy = new Set(selectedCategories);
    if (copy.has(cat)) copy.delete(cat);
    else copy.add(cat);
    setSelectedCategories(copy);
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedCategories(new Set());
    setPriceRange([0, 150]);
    setSortBy("relevance");
  };

  // Filtering
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = products.filter((p) => {
      const inName = p.name.toLowerCase().includes(q);
      const inCategory =
        selectedCategories.size === 0 ||
        selectedCategories.has(p.category?.Name);
      const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return inName && inCategory && inPrice;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [query, selectedCategories, priceRange, sortBy, products]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-sm text-gray-600">
              Search, filter, and explore products easily
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <label className="relative flex-1 md:flex-none">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search product by name..."
                className="w-full md:w-72 rounded-lg border border-gray-200 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                🔍
              </span>
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2"
            >
              <option value="relevance">Best Match</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="name">Alphabetical</option>
            </select>

            <button
              onClick={resetFilters}
              className="hidden md:inline-block rounded-lg bg-red-50 text-red-700 px-3 py-2"
            >
              Reset
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters column */}
          <aside className="col-span-1 bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat._id || cat.Name}
                  onClick={() => toggleCategory(cat.Name)}
                  className={`px-3 py-1 rounded-full border ${
                    selectedCategories.has(cat.Name)
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700"
                  } text-sm`}
                >
                  {cat.Name}
                </button>
              ))}
            </div>

            {/* Price filter */}
            <div className="mb-4">
              <h4 className="font-medium">Price</h4>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value || 0), priceRange[1]])
                  }
                  className="w-20 rounded-md border px-2 py-1"
                />
                <span className="text-sm text-gray-500">to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value || 0)])
                  }
                  className="w-20 rounded-md border px-2 py-1"
                />
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <main className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              {loading ? (
                <div className="py-12 text-center text-gray-500">Loading...</div>
              ) : filtered.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  No products found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filtered.map((product) => (
                      <motion.article
                        key={product._id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        layout
                        className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border"
                      >
                        <img
                          src={`https://raw.githubusercontent.com/MMarzoo/my-image/main/images/${product.images?.[0]}`}
                          alt={product.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-xs text-gray-500">
                                {product.category?.Name}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${product.price}</div>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <button className="flex-1 rounded-md border border-indigo-200 px-3 py-2 text-sm">
                              View
                            </button>
                            <button className="rounded-md bg-orange-600 text-white px-3 py-2 text-sm">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
