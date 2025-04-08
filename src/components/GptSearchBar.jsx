import React, { useRef } from "react";
import {useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { API_OPTIONS, OPENAI_API_KEY, SEARCH_MOVIES } from "../utils/constants";
import { addGptMovieResult } from '../utils/gptSlice';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
  const searchText = useRef(null);

  const langKey = useSelector((state) => state.config.lang);
  const dispatch=useDispatch()

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
     SEARCH_MOVIES +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const genAI = new GoogleGenerativeAI(OPENAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(gptQuery);
    const response = await result.response; 
    const text = await response.text();     


    // if (!gptResults.choices) {
    //   // TODO: Write Error Handling
    // }

    // // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = text.split(",").map((movie) => movie.trim());
    
    // // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults||[] })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-screen md:w-1/2 bg-black text-white grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;

// .nl@capgemini.com
