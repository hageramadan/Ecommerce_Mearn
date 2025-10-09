import React from "react";

function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  const imageBaseUrl = "https://raw.githubusercontent.com/MMarzoo/my-image/main/images/";
  const placeholderImage = "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image";

  const imageUrl = item.productId.images?.[0]
    ? `${imageBaseUrl}${item.productId.images[0]}`
    : placeholderImage;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b py-4 px-2 sm:px-4 rounded-md bg-white shadow-sm">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={item.productId.name || "Product Image"}
        className="w-20 h-20 object-cover rounded-md"
        onError={(e) => {
          e.target.src = placeholderImage;
          e.target.alt = "No Image Available";
        }}
      />

      {/* Product Details */}
      <div className="flex-1 min-w-[150px]">
        <h4 className="font-semibold text-gray-800">{item.productId.name}</h4>
        <p className="text-sm text-gray-500">
          {item.productId.size ? `Size: ${item.productId.size}` : ""}
          {item.productId.size && item.productId.color ? "; " : ""}
          {item.productId.color ? `Color: ${item.productId.color}` : ""}
        </p>
        <p className="text-gray-700 font-medium">${item.productId.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdateQuantity(item.productId._id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          -
        </button>
        <span className="w-6 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.productId._id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
        >
          +
        </button>
      </div>

      {/* Total Price */}
      <div className="font-semibold text-gray-800 min-w-[70px] text-right">
        ${(item.productId.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <button
        className="text-red-500 text-xl font-bold hover:text-red-700 hover:scale-110 transition-transform duration-200"
        onClick={() => onRemoveItem(item.productId._id)}
        title="Remove item"
      >
        ×
      </button>
    </div>
  );
}

export default CartItem;
