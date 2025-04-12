import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentRow from "./ContentRow";
import { setGPTMovies } from "../utils/states/gptSlice";
import useLoading from "../hooks/useLoader";
import CONSTANTS from "../utils/constants";
import { reduceCredit } from "../utils/states/userSlice";
import model from "../utils/genAI";

const GPT = () => {
  const dispatch = useDispatch();
  const { movieResults, movieNames } = useSelector((state) => state?.gpt || {});
  const credit = useSelector((state) => state.user.credit);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const { loading, hideLoading, showLoading } = useLoading();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    showLoading();

    const query = inputRef.current.value;
    if (!query) {
      setError("Please enter a valid query!");
      hideLoading();
      return;
    }

    if (credit <= 0) {
      setError("You have no credits left!");
      hideLoading();
      return;
    }

    dispatch(reduceCredit());
    getResponseFromGPT(query);
  };

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      CONSTANTS.TMDB_MOVIE_SEARCH_URL +
        "?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      CONSTANTS.API_OPTIONS
    );
    const json = await data.json();
    return json?.results;
  };

  const getResponseFromGPT = async (query) => {
    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        query +
        ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const output = await model.generateContent(gptQuery);
      const response = await output.response;
      const text = await response.text();

      const gptMovies = text?.split(",").map((movie) => movie.trim());

      if (!gptMovies || gptMovies[0] === "null \n") {
        setError("No movies found!");
        hideLoading();
        return;
      }

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);
      if (tmdbResults) hideLoading();
      else setError("No movies found!");
      dispatch(
        setGPTMovies({ movieNames: gptMovies, movieResults: tmdbResults || [] })
      );
    } catch (error) {
      setError("No movies found!", error);
      hideLoading();
    }
  };

  return (
    <>
      <img
        src={CONSTANTS.LOGIN_SCREEN_BG}
        alt="background"
        className="fixed object-cover w-screen h-screen brightness-[.3] z-0"
      />
      {error && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}
      <div className="absolute top-52 left-1/2 -translate-x-1/2">
        <h2 className="text-white text-center bg-black bg-opacity-70 p-2 mb-4 text-xl font-medium">
          CREDITS LEFT: {credit}
        </h2>
        <form
          className="flex gap-2 flex-col md:flex-row rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            className="w-[350px] px-6 py-3 rounded-lg bg-white text-gray-900 border outline-none focus:ring-2 focus:ring-red-700"
            type="text"
            placeholder="What do you want to watch?"
          />
          <button className="cursor-pointer rounded-lg py-3 bg-red-700 text-white font-medium px-4">
            Search
          </button>
        </form>
      </div>
      {loading && (
        <div className="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-black bg-opacity-70 rounded flex justify-center items-center">
          <div className="p-8 shadow-md relative">
            <svg
              className="w-20 h-20 animate-spin text-red-700"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4.75V6.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M17.1266 6.87347L16.0659 7.93413"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M19.25 12L17.75 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M17.1266 17.1265L16.0659 16.0659"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 17.75V19.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.9342 16.0659L6.87354 17.1265"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M6.25 12L4.75 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.9342 7.93413L6.87354 6.87347"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      )}

        {movieNames?.map((movie, index) => {
          return (
            <div
              key={movie + index}
              className="relative z-50 top-96 bg-black bg-opacity-50 py-8 w-screen"
            >
              <ContentRow title={movie} list={movieResults[index]} />
            </div>
          );
        })}
    </>
  );
};

export default GPT;
