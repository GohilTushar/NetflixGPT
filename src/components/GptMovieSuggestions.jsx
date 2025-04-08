import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gptSearch||{});

  return (
    <div className={`p-4 m-4 bg-black text-white bg-opacity-70 ${!movieNames&&'hidden'}`}>
        {movieNames?.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      
    </div>
  );
};
export default GptMovieSuggestions;