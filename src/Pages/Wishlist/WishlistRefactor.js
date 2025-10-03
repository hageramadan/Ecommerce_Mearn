import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import WishlistContainer from '../../Components/wishlit/WishlistContainer.js';
import { getwishlist, removeFromwishlist, removewishlist } from '../../api/wishlist/api.wishlist.js';
import Spinner from '../../Components/spinner.js';
import EmptyWishlist from '../../Components/wishlit/emptyWishlist.js';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    // fetchWishlistItems();
    async function getwishlisonLoading() {
      try {
        const response = await getwishlist()
        const items = response.data.items
        console.log(items)
        if (items.length === 0) {
          setIsEmpty(true);
        } else {
          setWishlistItems(items);
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getwishlisonLoading()
  }, []);

  const handleRemoveItem = async (id) => {
    console.log(id)
    await removeFromwishlist(id)
    setWishlistItems(wishlistItems.filter(item => item._id !== id));
  };

  return (
    <>
      {isLoading && (
        <Spinner />
      )}

      {
        isEmpty && (
          <EmptyWishlist />
        )
      }

      {
        !isEmpty &&(
        <div className="flex flex-col min-h-screen bg-[#f5f7f8] text-slate-800 font-['Inter',sans-serif]">
        <WishlistContainer
          wishlistItems={wishlistItems}
          onRemoveItem={handleRemoveItem}
        />
      </div>
      )}
    </>);
};

export default Wishlist;