import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance/axiosConfig";
import "../Cart/cart.css";
import Spinner from "../../Components/spinner";
import CartItem from "../../Components/CartItem";
import CartSummary from "../../Components/CartSummary";
import ConfirmModal from "../../Components/ConfirmModal";

function Cart() {
  // State to store cart data (items inside the cart)
  const [cart, setCart] = useState({ items: [] });

  // State to track loading while fetching cart
  const [loading, setLoading] = useState(true);

  // State to control confirmation modal (when removing item)
  const [showConfirm, setShowConfirm] = useState(false);

  // State to store the id of the item we want to remove
  const [itemToRemove, setItemToRemove] = useState(null);

  // Hook for navigation (redirect to another page)
  const navigate = useNavigate();

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      setLoading(true); // show spinner
      const res = await axiosInstance.get("/cart");
      setCart(res.data.data || { items: [] }); // update state with cart data
    } catch (err) {
      console.error("❌ Error fetching cart:", err.response?.data || err.message);
      setCart({ items: [] }); // fallback to empty cart
    } finally {
      setLoading(false); // hide spinner
    }
  };

  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      await axiosInstance.delete("/cart/remove", { data: { productId } });
      fetchCart(); // refresh cart after removing item
    } catch (err) {
      console.error("❌ Error removing item:", err.response?.data || err.message);
    }
  };

  // Update item quantity in cart
  const updateQuantity = async (productId, quantity) => {
    try {
      // If quantity is 0 or less → confirm removal instead
      if (quantity <= 0) {
        setItemToRemove(productId);
        setShowConfirm(true);
        return;
      }

      // Update quantity in backend
      await axiosInstance.put("/cart/update", { productId, quantity });

      // Update quantity in local state
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

  // Fetch cart when component is mounted
  useEffect(() => {
    fetchCart();
  }, []);

  // Show spinner while loading cart
  if (loading) return <Spinner />;

  // Show empty message if no items in cart
  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty 🛒</p>;

  // Calculate summary values
  const subtotal = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  const shipping = 5.0;
  const taxRate = 0.09;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {/* Cart Items List */}
      <div className="cart-items">
        {cart.items.map((item) => (
          <CartItem
            key={item.productId._id}
            item={item}
            onUpdateQuantity={updateQuantity} // handle quantity changes
            onRemoveItem={(productId) => {
              setItemToRemove(productId);
              setShowConfirm(true); // open confirm modal before removing
            }}
          />
        ))}
      </div>

      {/* Cart Summary (subtotal, shipping, tax, total, checkout) */}
      <CartSummary
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        onCheckout={() => navigate("/order")} // navigate to order page
      />

      {/* Confirmation Modal (confirm remove item) */}
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
