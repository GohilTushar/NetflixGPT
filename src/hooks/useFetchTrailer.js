import { useEffect, useState } from "react";
import CONSTANTS from "../utils/constants";

const useFetchTrailer = (id) => {
	const [result, setResult] = useState(null);

	useEffect(() => {
		if (!id) return;

		fetch(
			`${CONSTANTS.TMDB_MOVIE_BASE_URL}/${id}/videos?language=en-US`,
			CONSTANTS.API_OPTIONS
		)
			.then((response) => response.json())
			.then((response) => {
				const trailer = response.results?.filter(
					(video) => video.type === "Trailer"
				);

				if (trailer) {
					const video = !trailer.length
						? response?.results[0].key
						: trailer[0].key;
					setResult(video);
				}
			})
			.catch((err) => console.log(err));
	}, [id]);

	return result;
};

export default useFetchTrailer;
