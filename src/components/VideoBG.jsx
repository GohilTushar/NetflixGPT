import useFetchTrailer from "../hooks/useFetchTrailer";

const VideoBG = ({ movie }) => {
	const id = useFetchTrailer(movie?.id);

	return (
		<div className="max-w-screen">
			<iframe
				className="w-full aspect-video"
				src={
					"https://www.youtube.com/embed/" +
					id +
					"?&autoplay=1&mute=1&controls=0&loop=1&playlist=" +
					id
				}
				title="Movie Trailer"
				vq="hd720"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			></iframe>
		</div>
	);
};

export default VideoBG;
