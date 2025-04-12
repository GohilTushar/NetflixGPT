import { createSlice } from "@reduxjs/toolkit";

const movie = createSlice({
  name: "movie",
  initialState: {
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
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
    setUpcoming: (state, action) => {
      state.upcoming = action.payload;
    },
  },
});

export const { setNowPlaying, setPopular, setTopRated, setUpcoming } =
  movie.actions;
export default movie.reducer;
