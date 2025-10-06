import React, { useState, useEffect } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import OrderItem from "../../Components/OrderItem";
import OrderSummary from "../../Components/OrderSummary";
import PaymentSection from "../../Components/PaymentSection";
import Spinner from "../../Components/spinner";

function Order() {
  // State to store cart data
  const [cart, setCart] = useState({ items: [] });

  // State to track loading while fetching cart
  const [loading, setLoading] = useState(true);

  // State to show status/error/success messages
  const [message, setMessage] = useState("");

  // State to prevent multiple requests (button disabled when true)
  const [processing, setProcessing] = useState(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true); // start spinner
      const res = await axiosInstance.get("/cart");
      setCart(res.data.data || { items: [] }); // fallback to empty cart if no data
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
      setCart({ items: [] }); // fallback empty cart if error
    } finally {
      setLoading(false); // stop spinner
    }
  };

  // Load cart once on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Place order and redirect to PayPal
  const handlePlaceOrder = async () => {
    if (processing) return; // avoid double click

    setProcessing(true);
    setMessage("🔄 Processing your order...");

    try {
      // 1. Check cart has items
      if (!cart.items || cart.items.length === 0) {
        setMessage("❌ Your cart is empty");
        setProcessing(false);
        return;
      }

      // 2. Prepare order data
      const orderData = {
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        paymentMethod: "paypal",
        totalAmount: cart.items.reduce(
          (acc, item) => acc + item.productId.price * item.quantity,
          0
        ),
      };

      console.log("📦 Sending order data:", orderData);

      // 3. Send order request
      const res = await axiosInstance.post("/payment/placeOrder", orderData);

      console.log("✅ Order response:", res.data);

      // 4. Redirect to PayPal approval URL
      const approveUrl = res.data.data;
      if (approveUrl) {
        setMessage("✅ Redirecting to PayPal...");
        setTimeout(() => {
          window.location.href = approveUrl;
        }, 1000);
      } else {
        setMessage("❌ Failed to get PayPal link. Please try again.");
      }
    } catch (err) {
      console.error("❌ Full error details:", err);

      // 5. Show error message depending on status code
      if (err.response?.status === 400) {
        setMessage("❌ Invalid order data. Please check your cart items.");
      } else if (err.response?.status === 401) {
        setMessage("❌ Please login again.");
      } else if (err.response?.status === 500) {
        setMessage("❌ Server error. Please try again later.");
      } else {
        setMessage("❌ Failed to place order. Please try again.");
      }
    } finally {
      setProcessing(false);
    }
  };

  // Show spinner while loading cart
  if (loading) return <Spinner />;

  // Show message if cart is empty
  if (!cart.items || cart.items.length === 0) return <p>No items in cart 🛒</p>;

  // Calculate order summary values
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

      {/* Items List */}
      <div className="space-y-3">
        {cart.items.map((item) => (
          <OrderItem key={item._id} item={item} />
        ))}
      </div>

      {/* Order Summary section */}
      <OrderSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
      />

      {/* Payment Section */}
      <PaymentSection
        message={message}
        onPlaceOrder={handlePlaceOrder}
        processing={processing}
      />
    </div>
  );
}

export default Order;
