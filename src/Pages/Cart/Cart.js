import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import "../Cart/cart.css";
import placeholderImage from "./placeholder.jpg";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

  const imageBaseUrl =
    "https://raw.githubusercontent.com/MMarzoo/my-image/main/images/";

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/cart");
      setCart(res.data.data || { items: [] });
    } catch (err) {
      console.error("❌ Error fetching cart:", err.response?.data || err.message);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      await axiosInstance.delete("/cart/remove", { data: { productId } });
      fetchCart();
    } catch (err) {
      console.error("❌ Error removing item:", err.response?.data || err.message);
    }
  };

  // Update quantity of item
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        // Show confirm modal if user decreases below 1
        setItemToRemove(productId);
        setShowConfirm(true);
        return;
      }
      await axiosInstance.put("/cart/update", { productId, quantity });
      fetchCart();
    } catch (err) {
      console.error("❌ Error updating quantity:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty 🛒</p>;

  const subtotal = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  const shipping = 5.0;
  const taxRate = 0.09;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.productId._id} className="cart-item">
            <img
              src={item.productId.images?.[0] ? `${imageBaseUrl}${item.productId.images[0]}` : placeholderImage}
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
              <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>+</button>
            </div>

            <div className="cart-item-price">
              ${(item.productId.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="remove-btn"
              onClick={() => {
                setItemToRemove(item.productId._id);
                setShowConfirm(true);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
        </div>
        <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
        <button className="checkout-btn" onClick={() => navigate("/order")}>Proceed to Checkout</button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className="confirm-buttons">
              <button
                className="yes-btn"
                onClick={() => {
                  removeItem(itemToRemove);
                  setShowConfirm(false);
                }}
              >
                Yes
              </button>
              <button
                className="no-btn"
                onClick={() => setShowConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
