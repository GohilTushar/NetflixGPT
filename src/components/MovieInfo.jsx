import { Play, Info } from "react-feather";

const MovieInfo = ({ title, overview }) => {
	return (
		<>
			<div className="w-full aspect-video bg-black opacity-80 md:opacity-50 absolute top-0" />
			<div className="text-white absolute lg:top-1/2 top-20 sm:top-36 md:top-64 md:-translate-y-1/2  md:left-12 left-1/2 md:-translate-x-0 -translate-x-1/2 not-md:-translate-x-1/2 text-center md:text-left min-w-[300px]">
				<h1 className="text-2xl lg:text-6xl font-bold">{title}</h1>
				<p className="my-4 leading-5 w-[480px] hidden md:block">{overview}</p>
				<div className="flex justify-center md:justify-start gap-2 mt-4 lg:mt-0">
					<button className="cursor-pointer flex items-center gap-1 bg-gray-100 text-xs lg:text-lg font-medium text-black px-4 lg:px-6 py-1 lg:py-1.5 rounded hover:opacity-90">
						<Play /> Play
					</button>
					<button className="cursor-pointer flex items-center gap-1 bg-white text-xs lg:text-lg font-medium text-black px-4 lg:px-6 py-1 lg:py-1.5 rounded bg-opacity-50">
						<Info /> More Info
					</button>
				</div>
			</div>
		</>
	);
};

export default MovieInfo;
