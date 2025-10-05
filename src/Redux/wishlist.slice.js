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
        // New action to set all wishlist items at once
        setWishlist: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;