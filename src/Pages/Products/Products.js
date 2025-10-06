import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import ProductCard from "../../Components/Product-card";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { ViewColumnsIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../Redux/wishlist.slice.js";
import { addwishlist } from "../../api/wishlist/api.wishlist.js";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 8;
  const [columns, setColumns] = useState(3);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlistReducer.items);

  const handleAddToWishlist = async (product) => {
    try {
      await addwishlist(product._id); 
      dispatch(addToWishlist(product._id)); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/products?limit=1000")
      .then((res) => {
        setProducts(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/category")
      .then((res) => setCategories(Array.isArray(res.data.data) ? res.data.data : []))
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  let filteredProducts = [...products];

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?._id === selectedCategory
    );
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedPriceOrder === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedPriceOrder === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProducts.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        
        <div className="w-full md:w-1/4 bg-white shadow-md rounded-xl p-4 h-fit">
          <h2 className="text-lg font-bold mb-4 text-gray-700">Filters</h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-2">Category</label>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    selectedCategory === "" ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => setSelectedCategory(cat._id)}
                    className={`block w-full text-left px-2 py-1 rounded ${
                      selectedCategory === cat._id ? "bg-orange-500 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {cat.Name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Sort by Price</label>
            <select
              value={selectedPriceOrder}
              onChange={(e) => setSelectedPriceOrder(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            >
              <option value="">Default</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setColumns(3)}
                className={`p-2 rounded ${columns === 3 ? "bg-orange-500 text-white" : "bg-gray-200"}`}
              >
                <ViewColumnsIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setColumns(2)}
                className={`p-2 rounded ${columns === 2 ? "bg-orange-500 text-white" : "bg-gray-200"}`}
              >
                <Square2StackIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No products found.</div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}>
              <ProductCard
                products={paginatedProducts}
                addToCart={() => {}}
                goToDetails={(id) => navigate(`/details/${id}`)}
                addToWishlist={handleAddToWishlist}
                wishlist={wishlist}
              />
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="warning"
                size="large"
                showFirstButton
                showLastButton
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
