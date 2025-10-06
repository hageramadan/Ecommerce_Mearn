function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  const imageBaseUrl = "https://raw.githubusercontent.com/MMarzoo/my-image/main/images/";
  const placeholderImage = "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image";

  const imageUrl = item.productId.images?.[0] 
    ? `${imageBaseUrl}${item.productId.images[0]}` 
    : placeholderImage;

  return (
    <div className="cart-item">
      <img
        src={imageUrl}
        alt={item.productId.name || "Product Image"}
        className="cart-item-image"
        onError={(e) => {
          e.target.src = placeholderImage;
          e.target.alt = "No Image Available";
        }}
      />

      <div className="cart-item-details">
        <h4>{item.productId.name}</h4>
        <p className="size-color">
          {item.productId.size ? `Size: ${item.productId.size}` : ""}
          {item.productId.size && item.productId.color ? "; " : ""}
          {item.productId.color ? `Color: ${item.productId.color}` : ""}
        </p>
        <p>${item.productId.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-actions">
        <button onClick={() => onUpdateQuantity(item.productId._id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.productId._id, item.quantity + 1)}>+</button>
      </div>

      <div className="cart-item-price">
        ${(item.productId.price * item.quantity).toFixed(2)}
      </div>

      <button
        className="remove-btn"
        onClick={() => onRemoveItem(item.productId._id)}
      >
        X
      </button>
    </div>
  );
}

export default CartItem;