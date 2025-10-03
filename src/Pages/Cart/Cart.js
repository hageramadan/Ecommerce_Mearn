import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import "../Cart/cart.css";
import placeholderImage from "./placeholder.jpg";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const imageBaseUrl =
    "https://raw.githubusercontent.com/MMarzoo/my-image/main/images/";

  const fetchCart = async () => {
    console.log("Starting fetchCart...");
    try {
      setLoading(true);
      const res = await axiosInstance.get("/cart");
      console.log("Cart Data:", res.data.data);
      try {
        setCart(res.data.data || { items: [] });
        console.log("Cart state updated successfully");
      } catch (stateError) {
        console.error("❌ Error updating cart state:", stateError);
      }
    } catch (err) {
      console.error(
        "❌ Error fetching cart:",
        err.response?.data || err.message
      );
      setCart({ items: [] });
    } finally {
      setLoading(false);
      console.log("fetchCart completed");
    }
  };

  const removeItem = async (productId, e) => {
    console.log("Remove button clicked - ProductId:", productId);
    try {
      console.log("Sending DELETE request to /cart/remove...");
      const res = await axiosInstance.delete("/cart/remove", {
        data: { productId },
      });
      console.log("Remove API Response:", res.data);
      fetchCart();
    } catch (err) {
      console.error(
        "❌ Error removing item:",
        err.response?.data || err.message
      );
    }
    console.log("Remove action completed");
    e.stopPropagation();
    e.preventDefault();
  };

  const updateQuantity = async (productId, quantity, e) => {
    console.log(
      "Update quantity button clicked - ProductId:",
      productId,
      "Quantity:",
      quantity
    );
    e.preventDefault();
    e.stopPropagation();
    try {
      if (quantity <= 0) {
        console.log("Quantity <= 0, calling removeItem...");
        return removeItem(productId, e);
      }
      console.log("Sending PUT request to /cart/update...");
      const payload = { productId, quantity };
      const res = await axiosInstance.put("/cart/update", payload);
      console.log("Update API Response:", res.data);
      fetchCart();
    } catch (err) {
      console.error(
        "❌ Error updating quantity:",
        err.response?.data || err.message
      );
    }
    console.log("Update quantity action completed");
  };

  useEffect(() => {
    console.log("useEffect triggered for fetchCart");
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;
  if (!cart.items || cart.items.length === 0)
    return <p>Your cart is empty 🛒</p>;

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
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
              src={
                item.productId.images?.[0]
                  ? `${imageBaseUrl}${item.productId.images[0]}`
                  : placeholderImage
              }
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
              <button
                type="button"
                onClick={(e) => {
                  console.log("Minus button clicked");
                  e.preventDefault();
                  e.stopPropagation();
                  updateQuantity(item.productId._id, item.quantity - 1, e);
                }}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                onClick={(e) => {
                  console.log("Plus button clicked");
                  e.preventDefault();
                  e.stopPropagation();
                  updateQuantity(item.productId._id, item.quantity + 1, e);
                }}
              >
                +
              </button>
            </div>
            <div className="cart-item-price">
              ${(item.productId.price * item.quantity).toFixed(2)}
            </div>
            <button
              type="button"
              className="remove-btn"
              onClick={(e) => {
                console.log("Remove button clicked");
                e.preventDefault();
                e.stopPropagation();
                removeItem(item.productId._id, e);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          type="button"
          className="checkout-btn"
          onClick={(e) => {
            console.log("Checkout button clicked");
            e.preventDefault();
            navigate("/order");
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
