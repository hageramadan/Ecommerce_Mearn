import React from "react";

const imageBaseUrl = "https://raw.githubusercontent.com/MMarzoo/my-image/main/images/";

function OrderItem({ item }) {
  const placeholderImage = "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image";
  
  const imageUrl = item.productId.images?.[0]
    ? `${imageBaseUrl}${item.productId.images[0]}`
    : placeholderImage;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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
}

export default OrderItem;