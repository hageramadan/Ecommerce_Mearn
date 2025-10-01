import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleSave = async () => {
    if (editId) {
      const res = await fetch(`http://localhost:5000/api/categories/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });
      const data = await res.json();
      setCategories(categories.map(cat => (cat._id === editId ? data.category : cat)));
      setEditId(null);
    } else {
      // إضافة
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });
      const data = await res.json();
      setCategories([...categories, data.category]);
    }
    setCategoryName("");
  };

  // حذف
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" });
    setCategories(categories.filter(cat => cat._id !== id));
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setCategoryName(name);
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {categories.length > 0 && (
        <table className="w-full border-collapse shadow-md rounded">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-b hover:bg-orange-50">
                <td className="p-2">{cat.name}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(cat._id, cat.name)}
                    className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    <PencilIcon className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    <TrashIcon className="w-4 h-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
