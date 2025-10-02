import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../api/category/categoryApi";
import { toast } from "react-toastify";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [showInput, setShowInput] = useState(false);

  // ✅ خلي الفانكشن فوق
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      // لو الـ API بيرجع {data: []} هات الجزء الصح
      setCategories(data.data || data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories(); // ✅ هتشتغل أول ما الصفحة تفتح
  }, []);

  const handleSave = async () => {
    const trimmed = categoryName.trim();

    if (!trimmed) return toast.warning("Please enter category name");
    if (trimmed.length < 3) return toast.error("Name must be at least 3 characters");
    if (trimmed.length > 20) return toast.error("Name must not exceed 20 characters");
    if (categories.some((c) => c.Name.toLowerCase() === trimmed.toLowerCase()))
      return toast.error("This category already exists");

    try {
      if (editId) {
        const updated = await updateCategory(editId, trimmed);
        setCategories(categories.map((c) => (c._id === editId ? updated : c)));
        toast.success("Category updated");
        setEditId(null);
      } else {
        const newCat = await addCategory(trimmed);
        setCategories([...categories, newCat.data || newCat]); // ✅ دعم الاستجابة
        toast.success("Category added");
      }
      setCategoryName("");
      setShowInput(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error saving category");
    }
  };

  const handleDelete = async (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              try {
                await deleteCategory(id);
                setCategories(categories.filter((c) => c._id !== id));
                toast.dismiss();
                toast.success("Category deleted");
              } catch {
                toast.error("Failed to delete");
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>

        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <PlusIcon className="w-5 h-5" /> Add Category
        </button>
      </div>

      {(showInput || editId) && (
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter category name"
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Save
          </button>
        </div>
      )}

      {/* Table */}
      {categories.length > 0 ? (
        <table className="w-full border shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-orange-500 text-white text-left">
              <th className="p-3">Category</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b hover:bg-orange-50 transition">
                <td className="p-3">{cat.Name}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setCategoryName(cat.Name);
                      setEditId(cat._id);
                      setShowInput(true);
                    }}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow"
                  >
                    <PencilIcon className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow"
                  >
                    <TrashIcon className="w-4 h-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No categories yet</p>
      )}
    </div>
  );
}
