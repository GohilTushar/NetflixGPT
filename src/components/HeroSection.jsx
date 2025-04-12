import { useSelector } from "react-redux";
import VideoBG from "./VideoBG";
import MovieInfo from "./MovieInfo";

const HeroSection = () => {
	const nowPlaying = useSelector((state) => state.movie.nowPlaying);

	if (!nowPlaying?.length) return null;

	const mainMovie = nowPlaying[2];

	const { title, overview } = mainMovie;

	return (
		<>
			<VideoBG movie={mainMovie} />
			<MovieInfo title={title} overview={overview} />
		</>
	);
};

export default HeroSection;
