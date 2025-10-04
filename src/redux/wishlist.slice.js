import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of product IDs
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const id = action.payload;
      // Only add if not already in wishlist
      if (!state.items.includes(id)) {
        state.items.push(id);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(itemId => itemId !== id);
    },
    toggleWishlist: (state, action) => {
      const id = action.payload;
      const index = state.items.indexOf(id);
      
      if (index > -1) {
        // Remove if exists
        state.items.splice(index, 1);
      } else {
        // Add if doesn't exist
        state.items.push(id);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

// Export actions
export const { 
  addToWishlist, 
  removeFromWishlist, 
  toggleWishlist,
  clearWishlist 
} = wishlistSlice.actions;

// Export selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (state, id) => state.wishlist.items.includes(id);
export const selectWishlistCount = (state) => state.wishlist.items.length;

// Export reducer
export default wishlistSlice.reducer;