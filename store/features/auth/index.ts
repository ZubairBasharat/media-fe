import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState: any = {
    user: {}
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAuthInformation: (state, action: PayloadAction<{ user: any }>) => {
            state.user = action.payload
        },
    },
});

export default authSlice.reducer;
export const { addAuthInformation } = authSlice.actions;