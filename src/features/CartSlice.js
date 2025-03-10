import { createSlice } from "@reduxjs/toolkit";

// טוען את הסל מה-localStorage אם יש
const initialState = {
  arr: JSON.parse(localStorage.getItem('cart')) || [], // אם אין נתונים, התחל בסל ריק
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const index = state.arr.findIndex(item => item._id === action.payload._id);
     calculateTotal: (state) => {
        state.totalAmount = state.arr.reduce((total, item) => total + item.qty * item.price, 0);
        
     }
      // אם פריט לא נמצא, הוסף אותו
      if (index === -1) {
        const copy = { ...action.payload, qty: 1 };
        state.arr.push(copy);
      } else {
        // אם הפריט כבר קיים, עדכן את הכמות
        state.arr[index].qty++;
      }

      // שמירה ב-localStorage אחרי כל שינוי בסל
      localStorage.setItem('cart', JSON.stringify(state.arr));
    },

    reduce: (state, action) => {
      const index = state.arr.findIndex(item => item._id === action.payload._id);
      if (index === -1) return;

      // אם כמות היא 1, הסר את הפריט
      if (state.arr[index].qty === 1) {
        state.arr.splice(index, 1);
      } else {
        // הפחת כמות
        state.arr[index].qty--;
      }

      // שמירה ב-localStorage אחרי כל שינוי בסל
      localStorage.setItem('cart', JSON.stringify(state.arr));
    },

    remove: (state, action) => {
      const index = state.arr.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.arr.splice(index, 1);
      }

      // שמירה ב-localStorage אחרי כל שינוי בסל
      localStorage.setItem('cart', JSON.stringify(state.arr));
    },

    clearCart: (state) => {
      state.arr = [];
      // ניקוי ה-localStorage
      localStorage.removeItem('cart');
    },
  }
});


export const { addToCart, remove, reduce, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
