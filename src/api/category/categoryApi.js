import axiosInstance from "../../AxiosInstance/axiosConfig.js";

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");
    return response.data.data; // ✅ يرجع Array على طول
  } catch (error) {
    console.error("Error fetching categories:", error.response?.data || error);
    throw error;
  }
};

export const addCategory = async (Name) => {
  try {
    const response = await axiosInstance.post("/category", { Name });
    return response.data.data; // ✅ يرجع object { _id, Name }
  } catch (error) {
    console.error("Error adding category:", error.response?.data || error);
    throw error;
  }
};

export const updateCategory = async (id, Name) => {
  try {
    const response = await axiosInstance.put(`/category/${id}`, { Name });
    return response.data.data; // ✅ يرجع object { _id, Name }
  } catch (error) {
    console.error("Error updating category:", error.response?.data || error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    return response.data; // هنا غالباً بيرجع { message: "deleted" }
  } catch (error) {
    console.error("Error deleting category:", error.response?.data || error);
    throw error;
  }
};
