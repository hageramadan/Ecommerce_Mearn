import React, { useState } from "react";

function Cart() {
  // بيانات ثابتة مؤقتًا
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Air Max",
      price: 120,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Adidas Sneakers",
      price: 80,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
  ]);

  // دوال تعديل الكمية
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* المنتجات */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-md p-4 rounded-2xl"
              >
                {/* صورة + بيانات */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>

                {/* الكمية + السعر + remove */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      ➖
                    </button>
                    <span className="px-4 py-1 border rounded-lg bg-gray-50">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      ➕
                    </button>
                  </div>
                  <p className="font-bold text-lg text-gray-800">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 font-medium hover:underline"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* الملخص */}
<div className="bg-white shadow-lg p-8 rounded-2xl h-fit w-full lg:w-96">
  <h3 className="text-2xl font-bold mb-6 text-gray-800">
    📦 Order Summary
  </h3>
  <div className="flex justify-between mb-4 text-lg">
    <span className="text-gray-600">Subtotal</span>
    <span className="font-medium">${subtotal}</span>
  </div>
  <div className="flex justify-between mb-4 text-lg">
    <span className="text-gray-600">Shipping</span>
    <span className="font-medium">$10</span>
  </div>
  <hr className="my-4" />
  <div className="flex justify-between text-xl font-bold text-gray-800">
    <span>Total</span>
    <span>${subtotal + 10}</span>
  </div>
  <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-lg">
    ✅ Checkout
  </button>
</div>

        </div>
      )}
    </div>
  );
}

export default Cart;
