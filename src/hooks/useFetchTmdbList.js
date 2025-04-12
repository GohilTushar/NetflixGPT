import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CONSTANTS from "../utils/constants";

const useFetchMovies = (url, action) => {
  const movies = useSelector((state) => state.movies);
  const tvShows = useSelector((state) => state.tvShows);
  const dispatch = useDispatch();

  const getMoviesAndTvShows = async () => {
    try {
      const data = await axios.get(url, CONSTANTS.API_OPTIONS);
      dispatch(action(data.data.results));
    } catch (error) {
      console.error("Error fetching movies and TV shows:", error);
    }
  };

  useEffect(() => {
    (!movies || !tvShows) && getMoviesAndTvShows();
  }, []);
};

export default useFetchMovies;
