import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import ProductForm from "../../Components/ProductForm";
import ProductTable from "../../Components/ProductTable";
import ProductFilters from "../../Components/ProductFilter";

function MangeProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/products/")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFile = formData.get("images");

    const data = new FormData();
    data.append("name", formData.get("name"));
    data.append("price", formData.get("price"));
    data.append("quantity", formData.get("quantity"));
    data.append("category", formData.get("category"));

    if (imageFile && imageFile.name) {
      data.append("images", imageFile);
    }

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    if (editingProduct) {
      axiosInstance
        .put(`/products/${editingProduct._id}`, data, config)
        .then((res) => {
          setProducts((prev) =>
            prev.map((p) => (p._id === editingProduct._id ? res.data.data : p))
          );
          setShowForm(false);
        })
        .catch((err) => console.error(err));
    } else {
      axiosInstance
        .post("/products", data, config)
        .then((res) => {
          setProducts((prev) => [...prev, res.data.data]);
          setShowForm(false);
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <p>loading...</p>;

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
