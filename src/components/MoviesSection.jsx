import { useSelector } from "react-redux";
import ContentRow from "./ContentRow";

const MoviesSection = () => {
	const movies = useSelector((state) => state.movie);
	const tvSeries = useSelector((state) => state.tv);

	return (
		<div className="lg:-mt-44 md:-mt-8 relative">
			<ContentRow title="Now Playing Movies" list={movies.nowPlaying} />
			<ContentRow title="Top Rated Movies" list={movies.topRated} />
			<ContentRow title="Popular Movies" list={movies.popular} />
			<ContentRow title="Popular TV Shows" list={tvSeries.popular} />
			<ContentRow title="Top Rated TV Shows" list={tvSeries.topRated} />
		</div>
	);
};

export default MoviesSection;
