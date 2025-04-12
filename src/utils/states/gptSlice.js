import { createSlice } from "@reduxjs/toolkit";

const gpt = createSlice({
	name: "gpt",
	initialState: {
		view: false,
		movieNames:null,
        movieResults:null
	},
	reducers: {
		setView: (state) => {
			state.view = !state.view;
		},
		setGPTMovies: (state, action) => {
			const {movieNames,movieResults}=action.payload
            state.movieNames=movieNames
            state.movieResults=movieResults
		},
	},
});

export const { setView, setGPTMovies } = gpt.actions;
export default gpt.reducer;
