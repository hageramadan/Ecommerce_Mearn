import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance/axiosConfig";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // مودال إنشاء أوردر جديد
  const [showOrderModal, setShowOrderModal] = useState(false); // مودال عرض الأوردر
  const [currentOrder, setCurrentOrder] = useState(null); // الأوردر الحالي للعرض
  const [formData, setFormData] = useState({ customerName: "", total: "" });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("http://localhost:3000/orders/all");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.customMessage || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const refetchOrders = () => fetchOrders();

  const handleSubmitNewOrder = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/orders", {
        user: { fullName: formData.customerName },
        totalPrice: parseFloat(formData.total),
        status: "pending",
      });
      setShowModal(false);
      setFormData({ customerName: "", total: "" });
      refetchOrders();
    } catch (err) {
      console.error("Create order error:", err);
      setError("Failed to create order");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "processed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "shipped":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatOrderId = (id) => `#${id.slice(-2).toUpperCase()}`;
  const formatDate = (dateString) => new Date(dateString).toISOString().split("T")[0];

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setShowOrderModal(true);
  };

  const handleDoneOrder = async () => {
    try {
      await axiosInstance.put(`/orders/${currentOrder._id}`, { status: "completed" });
      refetchOrders();
      setShowOrderModal(false);
    } catch (err) {
      console.error("Update order error:", err);
      setError("Failed to update order");
    }
  };

  const handleRemoveOrder = async () => {
    try {
      await axiosInstance.delete(`/orders/${currentOrder._id}`);
      refetchOrders();
      setShowOrderModal(false);
    } catch (err) {
      console.error("Delete order error:", err);
      setError("Failed to remove order");
    }
  };

  const handleNewOrder = () => setShowModal(true);

  const exportToCSV = () => {
    const headers = ["Order ID", "Customer", "Date", "Status", "Total"];
    const rows = orders.map((order) => [
      formatOrderId(order._id),
      order.user?.fullName || order.user?.username || "N/A",
      order.createdAt ? formatDate(order.createdAt) : "N/A",
      order.status || "Unknown",
      `$${order.totalPrice?.toFixed(2) || "0.00"}`,
    ]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(headers.join(",") + "\n" + rows.map((row) => row.join(",")).join("\n"));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="p-6"><p className="text-gray-500">Loading orders...</p></div>;
  if (error) return <div className="p-6"><p className="text-red-500">{error}</p></div>;

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">WC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Customer Orders</h2>
              <div className="flex space-x-3">
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={handleNewOrder}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  New Order
                </button>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No orders found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatOrderId(order._id)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user?.fullName || order.user?.username || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt ? formatDate(order.createdAt) : "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeClass(order.status)}`}>
                            {order.status || "Unknown"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalPrice?.toFixed(2) || "0.00"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button onClick={() => handleViewOrder(order)} className="text-blue-600 hover:text-blue-900 transition-colors">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-96 p-6 bg-white rounded-2xl shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Order</h3>
            <form onSubmit={handleSubmitNewOrder}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.total}
                  onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create Order</button>
              </div>
            </form>
          </div>
        </div>
      )}

    {/* View Order Modal */}
{showOrderModal && currentOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-2/3 max-w-4xl p-6 animate-slide-in">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Order Details</h3>
        <button 
          onClick={() => setShowOrderModal(false)} 
          className="text-gray-400 hover:text-gray-700 text-3xl font-bold"
        >
          &times;
        </button>
      </div>

      {/* Total */}
      <div className="bg-gray-100 rounded-lg p-5 mb-6">
        <p className="text-xl font-semibold text-gray-800">Total: ${currentOrder.totalPrice?.toFixed(2)}</p>
      </div>

      {/* Products */}
      <div className="space-y-4">
        <p className="font-medium text-gray-700 mb-3">Products:</p>
        <div className="grid grid-cols-2 gap-6 max-h-96 overflow-auto">
          {currentOrder.products.map(p => (
            <div key={p.productsId._id} className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow space-y-2">
              <p className="font-semibold text-gray-900">{p.productsId.name}</p>
              <p className="text-gray-700">Quantity: {p.quantity}</p>
              <p className="text-gray-700">Price: ${p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mt-6">
        <span className="font-medium text-gray-700">Status:</span>
        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeClass(currentOrder.status)}`}>
          {currentOrder.status}
        </span>
      </div>

      {/* Footer - Actions */}
      <div className="flex justify-end space-x-4 mt-8">
        <button 
          onClick={handleDoneOrder} 
          className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Done
        </button>
        <button 
          onClick={handleRemoveOrder} 
          className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Remove
        </button>
        <button 
          onClick={() => setShowOrderModal(false)} 
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
}

export default Orders;
