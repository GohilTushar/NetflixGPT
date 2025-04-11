import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import tvReducer from "./tvSlice";
import gptReducer from "./gptSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		movie: movieReducer,
		tv: tvReducer,
		gpt: gptReducer,
	},
});

export default store;
