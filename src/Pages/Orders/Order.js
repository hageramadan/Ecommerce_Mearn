import React, { useState, useEffect } from "react";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import OrderItem from "../../Components/OrderItem";
import OrderSummary from "../../Components/OrderSummary";
import PaymentSection from "../../Components/PaymentSection";
import Spinner from "../../Components/spinner";

function Order() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

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

  const handlePlaceOrder = async () => {
    if (processing) return;
    
    setProcessing(true);
    setMessage("🔄 Processing your order...");

    try {
      // 1. أولاً: نتأكد من البيانات قبل الإرسال
      if (!cart.items || cart.items.length === 0) {
        setMessage("❌ Your cart is empty");
        setProcessing(false);
        return;
      }

      // 2. نجهز البيانات بشكل صحيح
      const orderData = {
        items: cart.items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        paymentMethod: "paypal",
        totalAmount: cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
      };

      console.log("📦 Sending order data:", orderData);

      // 3. نرسل الطلب
      const res = await axiosInstance.post("/payment/placeOrder", orderData);

      console.log("✅ Order response:", res.data);

      // 4. نتأكد من وجود الرابط
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
      
      // 5. نظهر الرسالة المناسبة حسب نوع الخطأ
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

  if (loading) return <Spinner />;
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

      {/* Items List */}
      <div className="space-y-3">
        {cart.items.map((item) => (
          <OrderItem key={item._id} item={item} />
        ))}
      </div>

      {/* Order Summary */}
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