import { createSlice } from "@reduxjs/toolkit";

const movie = createSlice({
	name: "movie",
	initialState: {
		nowPlaying: [],
		popular: [],
		topRated: [],
	},
	reducers: {
		setNowPlaying: (state, action) => {
			state.nowPlaying = action.payload;
		},
		setPopular: (state, action) => {
			state.popular = action.payload;
		},
		setTopRated: (state, action) => {
			state.topRated = action.payload;
		},
	},
});

export const { setNowPlaying, setPopular, setTopRated } = movie.actions;
export default movie.reducer;
