import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyWishlist = () => {

    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6 text-8xl opacity-30">
          💝
        </div>
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Your Wishlist is Empty
        </h2>
        
        {/* Description */}
        <p className="text-lg text-slate-500 mb-8">
          Start adding items to your wishlist to keep track of products you love!
        </p>
        
        {/* Call to action button */}
        <button className="px-6 py-3 bg-[#0b73da] text-white font-semibold rounded-lg hover:bg-[#0a65c2] transition-colors duration-200 shadow-sm" onClick={() => navigate("/products")}>
          Browse Products
        </button>
      </div>
    </div>
  );
};

export default EmptyWishlist;