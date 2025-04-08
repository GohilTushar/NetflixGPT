import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS, TRAILER_URL } from '../utils/constants';
import { addTrailerVideo } from '../utils/movieSlice';

const useMovieTrailer = (movieId) => {
  // const [trailerData,setTrailerData]=useState('')
  const dispatch = useDispatch();
  const trailerVideo=useSelector(state=>state.trailerVideo)

  useEffect(() => {
   !trailerVideo && getMovieTrailer();
  }, []);
  const getMovieTrailer = async () => {
    const data = await fetch(`${TRAILER_URL}/${movieId}/videos`, API_OPTIONS);
    const json = await data.json();
    dispatch(addTrailerVideo(json?.results[1]));
    // setTrailerData(json?.results[0])
  };
}

export default useMovieTrailer
