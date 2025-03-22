import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

      axios.defaults.headers.common["authorization"] = action.payload.token;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cart");

      axios.defaults.headers.common["authorization"] = null;

    },
    // פעולה חדשה שתנקה גם את הסל
    logoutAndClearCart: (state, action) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
      axios.defaults.headers.common["authorization"] = null;

      // dispatch(clearCart()); // ניקוי הסל
    },
  },
});

export const { userIn, logoutUser, logoutAndClearCart } = userSlice.actions;
export default userSlice.reducer;
