import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		user:null
	},
	reducers: {
		loginUser: (state, action) => {
			state.user = action.payload;
		},
		logoutUser: (state) => {
			state.user = null;
		},
		reduceCredit: (state) => {
			if (state.user && state.user.credit > 0) {
				state.user.credit -= 1;
			  }
		},
	},
});

export const { loginUser, logoutUser, reduceCredit } = userSlice.actions;
export default userSlice.reducer;
