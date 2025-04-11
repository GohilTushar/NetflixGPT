import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CONSTANTS from "../utils/constants";

const useFetchMovies = (url, action) => {
	const movies = useSelector((state) => state.movies);
	const tvShows = useSelector((state) => state.tvShows);
	const dispatch = useDispatch();

	const getNowPlaying = async () => {
		const data = await fetch(url, CONSTANTS.API_OPTIONS);
		const jsonData = await data.json();
		dispatch(action(jsonData.results));
	};

	useEffect(() => {
		(!movies || !tvShows) && getNowPlaying();
	}, []);
};

export default useFetchMovies;
