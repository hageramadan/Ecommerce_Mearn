import { useState } from "react";
import axiosInstance from "../AxiosInstance/axiosConfig";
function AddOrderModal({ isOpen, onClose, onOrderAdded, token }) {
  const [orderForm, setOrderForm] = useState({
    productId: "",
    quantity: 1,
    shippingAddress: "",
    paymentMethod: "PayPal",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddOrder = async () => {
    // Validation
    if (!orderForm.productId.trim()) {
      setError("Product ID is required");
      return;
    }
    if (!orderForm.shippingAddress.trim()) {
      setError("Shipping address is required");
      return;
    }
    if (orderForm.quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        products: [
          {
            productId: orderForm.productId.trim(),
            quantity: Number(orderForm.quantity),
          },
        ],
        shippingAddress: orderForm.shippingAddress.trim(),
        paymentMethod: orderForm.paymentMethod,
      };

      console.log("Sending order data:", orderData); // Debug log

      const response = await axiosInstance.post("http://localhost:3000/orders", orderData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      console.log("Response:", response); // Debug log

      alert("✅ Order added successfully!");
      onClose();
      setOrderForm({
        productId: "",
        quantity: 1,
        shippingAddress: "",
        paymentMethod: "PayPal",
      });
      onOrderAdded();
    } catch (error) {
      console.error("❌ Full error:", error); // Debug log
      const errorMessage = error.response?.data?.message || error.message || "Failed to add order";
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Order</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product ID *
            </label>
            <input
              type="text"
              placeholder="Enter product ID"
              value={orderForm.productId}
              onChange={(e) =>
                setOrderForm({ ...orderForm, productId: e.target.value })
              }
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              placeholder="Quantity"
              min="1"
              value={orderForm.quantity}
              onChange={(e) =>
                setOrderForm({ ...orderForm, quantity: e.target.value })
              }
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Address *
            </label>
            <input
              type="text"
              placeholder="Enter shipping address"
              value={orderForm.shippingAddress}
              onChange={(e) =>
                setOrderForm({ ...orderForm, shippingAddress: e.target.value })
              }
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method *
            </label>
            <select
              value={orderForm.paymentMethod}
              onChange={(e) =>
                setOrderForm({ ...orderForm, paymentMethod: e.target.value })
              }
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PayPal">PayPal</option>
              <option value="CreditCard">Credit Card</option>
              <option value="CashOnDelivery">Cash on Delivery</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleAddOrder}
            disabled={loading}
            className={`flex-1 px-4 py-2 rounded-lg transition duration-200 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {loading ? 'Adding...' : 'Add Order'}
          </button>
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          * Required fields
        </p>
      </div>
    </div>
  );
}

export default AddOrderModal;