
import { createSlice } from '@reduxjs/toolkit';

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
    },
    reducers: {
        addToWishlist: (state, action) => {
            const id = action.payload;
            // Only add if not already in wishlist
            if (!state.items.includes(id)) {
                return state.items.push(id);
            }
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload;
            return state.items = state.items.filter(itemId => itemId !== id);
        },
        toggleWishlist: (state, action) => {
            const id = action.payload;
            const index = state.items.indexOf(id);

            if (index > -1) {
                // Remove if exists
                return state.items.splice(index, 1);
            } else {
                // Add if doesn't exist
                return state.items.push(id);
            }
        },
        clearWishlist: (state) => {
            return state.items = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
