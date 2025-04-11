import { createSlice } from "@reduxjs/toolkit";

const tv = createSlice({
	name: "tv",
	initialState: {
		topRated: [],
		popular: [],
	},
	reducers: {
		setTopRated: (state, action) => {
			state.topRated = action.payload;
		},
		setPopular: (state, action) => {
			state.popular = action.payload;
		},
	},
});

export const { setTopRated, setPopular } = tv.actions;
export default tv.reducer;
