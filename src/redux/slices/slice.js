// features/wishlistSlice.js
import { createSlice} from '@reduxjs/toolkit';




export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    movies: [],

  },
  reducers: {
    addToWishlist: (state, action) => {
      state.movies.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.movies = [];
    },

  },
});

export const { addToWishlist, removeFromWishlist,  clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;