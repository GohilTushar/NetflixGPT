import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		loginUser: (_state, action) => {
			return action.payload;
		},
		logoutUser: (_state) => {
			return null;
		},
		reduceCredit: (state) => {
			return { ...state, credit: state.credit - 1 };
		},
	},
});

export const { loginUser, logoutUser, reduceCredit } = userSlice.actions;
export default userSlice.reducer;
