import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import "../Cart/cart.css";
import Spinner from "../../Components/spinner";
import CartItem from "../../Components/CartItem";
import CartSummary from "../../Components/CartSummary";
import ConfirmModal from "../../Components/ConfirmModal";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const navigate = useNavigate();

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
        setItemToRemove(productId);
        setShowConfirm(true);
        return;
      }

      await axiosInstance.put("/cart/update", { productId, quantity });

      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.map(item =>
          item.productId._id === productId ? { ...item, quantity } : item
        )
      }));
    } catch (err) {
      console.error("❌ Error updating quantity:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <Spinner />;
  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty 🛒</p>;

  const subtotal = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  const shipping = 5.0;
  const taxRate = 0.09;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {/* Cart Items */}
      <div className="cart-items">
        {cart.items.map((item) => (
          <CartItem
            key={item.productId._id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={(productId) => {
              setItemToRemove(productId);
              setShowConfirm(true);
            }}
          />
        ))}
      </div>

      {/* Cart Summary */}
      <CartSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        onCheckout={() => navigate("/order")}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={() => {
          removeItem(itemToRemove);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}

export default Cart;