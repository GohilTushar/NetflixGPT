import CONSTANTS from "../utils/constants";

const ContentRow = ({ title, list }) => {
	if (!list.length) return null;

	const first = list[0];
	list = list.slice(1);
	return (
		<div className="cursor-pointer md:pb-8 pb-2">
			<h2 className="lg:text-4xl md:text-3xl text-2xl text-white md:mb-6 mb-2 font-bold md:pl-8 pl-4">
				{title}
			</h2>
			<div className="flex md:gap-4 gap-2 overflow-x-scroll">
				<div className="md:pl-8 pl-4">
					<img
						className="md:min-w-[250px] min-w-[200px] rounded-lg max-h-[140px] object-cover"
						src={
							first?.backdrop_path
								? CONSTANTS.TMDB_IMAGE_BASE_URL + first?.backdrop_path
								: CONSTANTS.DEFAULT_POSTER
						}
						alt={first?.title || first?.name}
					/>
					<h4 data-testid="movie-title" className="text-white mt-1 font-medium">
						{first?.title || first?.name}
					</h4>
				</div>
				{list.map((content) => (
					<div key={content.id}>
						<img
							className="md:min-w-[250px] min-w-[200px] rounded-lg max-h-[140px] object-cover"
							src={
								content?.backdrop_path
									? CONSTANTS.TMDB_IMAGE_BASE_URL + content?.backdrop_path
									: CONSTANTS.DEFAULT_POSTER
							}
							alt={content?.title || content?.name}
						/>
						<h4
							data-testid="movie-title"
							className="text-white mt-1 font-medium"
						>
							{content?.title || content?.name}
						</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default ContentRow;
