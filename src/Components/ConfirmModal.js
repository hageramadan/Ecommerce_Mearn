function ConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <p>Are you sure you want to remove this item from your cart?</p>
        <div className="confirm-buttons">
          <button className="yes-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="no-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;