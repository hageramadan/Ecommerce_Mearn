import React, { useState } from "react";

function Order() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");

  const items = [
    { id: 1, name: "Classic Cotton T-Shirt", size: "M", price: 25, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Running Shoes", size: "9", price: 25, image: "https://via.placeholder.com/80" }
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const shipping = 5;
  const tax = 4.5;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    setMessage(
      `✅ Order placed successfully! | Payment: ${paymentMethod} | Location: ${
        location ? `${location.latitude.toFixed(3)}, ${location.longitude.toFixed(3)}` : "Not provided"
      }`
    );
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
        },
        () => {
          setMessage("❌ Unable to fetch location. Please enable GPS.");
        }
      );
    } else {
      setMessage("⚠️ Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      {/* Products */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-3" />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500 text-sm">Size {item.size}</p>
            </div>
            <p className="font-semibold">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t my-5"></div>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t my-3"></div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment */}
      <div className="mt-6">
        <h4 className="font-semibold mb-3">Choose Payment Method</h4>
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setPaymentMethod("paypal")}
            className={`cursor-pointer p-4 rounded-xl border-2 transition flex items-center justify-center gap-2 ${
              paymentMethod === "paypal" ? "border-blue-600 bg-blue-50" : "border-gray-300"
            }`}
          >
            <span className="text-blue-600 text-lg">💳</span>
            <p className="font-semibold">PayPal</p>
          </div>
          <div
            onClick={() => setPaymentMethod("cash")}
            className={`cursor-pointer p-4 rounded-xl border-2 transition flex items-center justify-center gap-2 ${
              paymentMethod === "cash" ? "border-blue-600 bg-blue-50" : "border-gray-300"
            }`}
          >
            <span className="text-green-600 text-lg">💵</span>
            <p className="font-semibold">Cash</p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mt-6">
        {/* <h4 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-red-500">📍</span> Delivery Location
        </h4> */}
        <button
          onClick={handleGetLocation}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
            <span className="text-red-500">📍</span>Detect My Location
        </button>
        {location && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-700">
            <p><span className="font-semibold">Latitude:</span> {location.latitude.toFixed(4)}</p>
            <p><span className="font-semibold">Longitude:</span> {location.longitude.toFixed(4)}</p>
          </div>
        )}
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Place Order
      </button>

      {/* Message */}
      {message && (
        <div className="mt-4 p-3 rounded-lg bg-blue-50 text-blue-700 text-sm">
          {message}
        </div>
      )}
    </div>
  );
}

export default Order;
