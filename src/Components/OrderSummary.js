// import React from "react";

// function OrderSummary({ subtotal, shipping, tax, total }) {
//   return (
//     <>
//       <div className="border-t my-5"></div>
//       <div className="space-y-2 text-gray-700">
//         <div className="flex justify-between text-sm">
//           <span>Subtotal</span>
//           <span>${subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-sm">
//           <span>Shipping</span>
//           <span>${shipping.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between text-sm">
//           <span>Tax</span>
//           <span>${tax.toFixed(2)}</span>
//         </div>
//         <div className="border-t my-3"></div>
//         <div className="flex justify-between font-bold text-lg">
//           <span>Total</span>
//           <span>${total.toFixed(2)}</span>
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrderSummary;


import React from "react";

function OrderSummary({ subtotal, shipping, tax, total }) {
  return (
    <>
      <div className="border-t my-5"></div>
      <div className="space-y-2 text-gray-700 text-sm sm:text-base">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span>Subtotal</span>
          <span className="text-right sm:text-left font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span>Shipping</span>
          <span className="text-right sm:text-left font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span>Tax</span>
          <span className="text-right sm:text-left font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t my-3"></div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center font-bold text-lg">
          <span>Total</span>
          <span className="text-right sm:text-left">${total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
