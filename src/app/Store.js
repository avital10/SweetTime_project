import { configureStore } from "@reduxjs/toolkit";
import SweetSlice from "../features/sweet/SweetSlice";
import CartSlice from "../features/cartSlice";
import userSlice from "../features/userSlice";

// קריאה ל-localStorage בזמן אתחול
const persistedCart = JSON.parse(localStorage.getItem('cart')) || [];

export const store = configureStore({
  reducer: {
    sweet: SweetSlice,
    cart: CartSlice,
    user: userSlice,
  },
  preloadedState: {
    cart: { arr: persistedCart }, // הצגת הסל מהמאגרים
  },
});

// שמירה ב-localStorage כשיש שינוי בסטור
store.subscribe(() => {
  const cart = store.getState().cart.arr;
  localStorage.setItem('cart', JSON.stringify(cart)); // עדכון ה-localStorage
});
