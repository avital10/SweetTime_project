import { createSlice } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";


const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIn: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    // פעולה חדשה שתנקה גם את הסל
    logoutAndClearCart: (state, action) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      // dispatch(clearCart()); // ניקוי הסל
    },
  },
});

export const { userIn, logoutUser, logoutAndClearCart } = userSlice.actions;
export default userSlice.reducer;
