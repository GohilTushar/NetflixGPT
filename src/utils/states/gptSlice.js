import { createSlice } from "@reduxjs/toolkit";

const gpt = createSlice({
	name: "gpt",
	initialState: {
		view: false,
		gptMovies: [],
	},
	reducers: {
		setView: (state) => {
			state.view = !state.view;
		},
		setGPTMovies: (state, action) => {
			state.gptMovies = action.payload;
		},
	},
});

export const { setView, setGPTMovies } = gpt.actions;
export default gpt.reducer;
