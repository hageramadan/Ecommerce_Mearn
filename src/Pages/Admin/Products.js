import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import ProductForm from "../../Components/ProductForm";
import ProductTable from "../../Components/ProductTable";
import ProductFilters from "../../Components/ProductFilter";
import Spinner from "../../Components/spinner";

function MangeProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  //Pagination status
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  //fetch Product with pagination
  useEffect(() => {
    axiosInstance
      .get(`/products?page=${page}&limit=${limit}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page]);

  //fetch categories
  useEffect(() => {
    axiosInstance
      .get("/category")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`/products/${id}`)
      .then(() => setProducts(products.filter((p) => p._id !== id)))
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFile = formData.get("images");

    const data = new FormData();
    data.append("name", formData.get("name"));
    data.append("description", formData.get("description"));
    data.append("price", formData.get("price"));
    data.append("quantity", formData.get("quantity"));
    data.append("category", formData.get("category"));

    if (imageFile && imageFile.name) {
      data.append("images", formData.get("images"));
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const res = editingProduct
        ? await axiosInstance.put(
            `/products/${editingProduct._id}`,
            data,
            config
          )
        : await axiosInstance.post("/products", data, config);

      const newProduct = res.data.data;
      setProducts((prev) =>
        editingProduct
          ? prev.map((p) => (p._id === editingProduct._id ? newProduct : p))
          : [...prev, newProduct]
      );
      setShowForm(false);
      return {}; // no errors
    } catch (err) {
      const rawErrors = err.response?.data?.errors;
      const mappedErrors = {};

      if (Array.isArray(rawErrors)) {
        rawErrors.forEach((msg) => {
          const lowerMsg = msg.toLowerCase();
          if (lowerMsg.includes("name")) mappedErrors.name = msg;
          if (lowerMsg.includes("description")) mappedErrors.name = msg;
          if (lowerMsg.includes("price")) mappedErrors.price = msg;
          if (lowerMsg.includes("quantity")) mappedErrors.quantity = msg;
          if (lowerMsg.includes("category")) mappedErrors.category = msg;
          if (lowerMsg.includes("image") || lowerMsg.includes("images"))
            mappedErrors.images = msg;
        });
      } else if (typeof rawErrors === "object") {
        Object.assign(mappedErrors, rawErrors);
      }

      if (Object.keys(mappedErrors).length > 0) {
        return { errors: mappedErrors };
      } else if (err.response?.data?.message) {
        return { errors: { general: err.response.data.message } };
      } else {
        console.error(err);
        return { errors: { general: "Unexpected error occurred" } };
      }
    }
  };

  if (loading) return <Spinner />;

  let filteredProducts = [...products];

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?._id === selectedCategory
    );
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedPriceOrder === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedPriceOrder === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          className="px-4 py-2 bg-[rgb(254,153,0)] text-white rounded"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          Add Product
        </button>
      </div>

      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedPriceOrder={selectedPriceOrder}
        onPriceOrderChange={setSelectedPriceOrder}
      />

      <ProductTable
        products={filteredProducts}
        onEdit={(product) => {
          setEditingProduct(product);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
      <div className="flex justify-center mt-6">
        <nav className="inline-flex -space-x-px">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:opacity-50"
          >
            First
          </button>

          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-3 py-2 border border-gray-300 ${
                page === index + 1
                  ? "bg-[rgb(254,153,0)] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Last
          </button>
        </nav>
      </div>
      {showForm && (
        <ProductForm
          editingProduct={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default MangeProducts;
