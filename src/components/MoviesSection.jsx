import { useSelector } from "react-redux";
import ContentRow from "./ContentRow";

const MoviesSection = () => {
	const movies = useSelector((state) => state.movie);
	const tvSeries = useSelector((state) => state.tv);

	const {upcoming, nowPlaying, topRated, popular} = movies;
	const {popular: tvPopular, topRated: tvTopRated} = tvSeries;

	return (
		<div className="lg:-mt-44 md:-mt-8 relative">
			<ContentRow title="Now Playing Movies" list={nowPlaying} />
			<ContentRow title="Top Rated Movies" list={topRated} />
			<ContentRow title="Popular Movies" list={popular} />
			<ContentRow title="Upcoming Movies" list={upcoming} />
			<ContentRow title="Popular TV Shows" list={tvPopular} />
			<ContentRow title="Top Rated TV Shows" list={tvTopRated} />
		</div>
	);
};

export default MoviesSection;
