function CartSummary({ subtotal, shipping, tax, total, onCheckout }) {
  return (
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
      <button className="checkout-btn" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartSummary;