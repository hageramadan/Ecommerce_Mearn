import React from 'react';
import ProductCard from './ProductCard';

const WishlistContainer = ({ wishlistItems, onRemoveItem }) => {
  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
          My Wishlist
        </h1>
        
        <div className="space-y-6">
          {wishlistItems.map((item, index) => (
            <ProductCard
              key={item._id}
              item={item}
              animationDelay={index * 0.1}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default WishlistContainer;