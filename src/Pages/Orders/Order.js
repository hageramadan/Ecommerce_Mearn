import React, { useState, useEffect } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import placeholderImage from "../Cart/placeholder.jpg"; // المسار الصحيح

function Order() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const imageBaseUrl =
    "https://raw.githubusercontent.com/MMarzoo/my-image/main/images/";

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/cart");
      setCart(res.data.data || { items: [] });
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ⬅️ Place Order عبر PayPal فقط
  const handlePlaceOrder = async () => {
    try {
     const res = await axiosInstance.post("/payment/placeOrder", {
  items: cart.items.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
  })),
  paymentMethod: "paypal",
});

      const approveUrl = res.data.data; // الرابط اللي هيدخل عليه المستخدم للدفع
      if (approveUrl) {
        window.location.href = approveUrl; // تحويل المستخدم مباشرة لدفع PayPal
      } else {
        setMessage("❌ Failed to get PayPal link.");
      }
    } catch (err) {
      console.error("❌ Error placing order:", err);
      setMessage("❌ Failed to place order.");
    }
  };

  if (loading) return <p>Loading order...</p>;
  if (!cart.items || cart.items.length === 0) return <p>No items in cart 🛒</p>;

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const taxRate = 0.09;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Order Summary</h2>

      {/* Items */}
      <div className="space-y-3">
        {cart.items.map((item) => {
          const imageUrl = item.productId.images?.[0]
            ? `${imageBaseUrl}${item.productId.images[0]}`
            : placeholderImage;

          return (
            <div
              key={item._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={imageUrl}
                alt={item.productId.name || "Product Image"}
                className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200 mr-3"
                onError={(e) => {
                  e.target.src = placeholderImage;
                  e.target.alt = "No Image Available";
                }}
              />
              <div className="flex-1">
                <p className="font-semibold text-base">{item.productId.name}</p>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-base">
                ${(item.productId.price * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Totals */}
      <div className="border-t my-5"></div>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t my-3"></div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-6 text-center">
        <h4 className="font-semibold mb-3">Payment Method: PayPal 💳</h4>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Pay with PayPal
      </button>

      {/* Message */}
      {message && (
        <div className="mt-4 p-3 rounded-lg bg-blue-50 text-blue-700 text-sm text-center">
          {message}
        </div>
      )}
    </div>
  );
}

export default Order;
