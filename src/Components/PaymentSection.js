import React from "react";

function PaymentSection({ message, onPlaceOrder, processing }) {
  return (
    <>
      {/* Payment Method */}
      <div className="mt-6 text-center">
        <h4 className="font-semibold mb-3">Payment Method: PayPal 💳</h4>
      </div>

      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={processing}
        className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${
          processing 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {processing ? 'Processing...' : 'Pay with PayPal'}
      </button>

      {/* Message */}
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm text-center ${
          message.includes('❌') 
            ? 'bg-red-50 text-red-700' 
            : message.includes('✅') 
            ? 'bg-green-50 text-green-700'
            : 'bg-blue-50 text-blue-700'
        }`}>
          {message}
        </div>
      )}
    </>
  );
}

export default PaymentSection;