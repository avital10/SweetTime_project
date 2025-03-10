import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    selectedSweet: null
}
const SweetSlice = createSlice({
    name: "sweetNameForDebug",
    initialState,
    reducers: {
        selectSweet: (state, action) => {
            state.selectedSweet = action.payload;
        }

    }
})
export const { selectSweet } = SweetSlice.actions;
export default SweetSlice.reducer;