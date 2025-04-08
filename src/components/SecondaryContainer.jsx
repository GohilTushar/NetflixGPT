import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const nowPlayingMovies=useSelector((state)=>state.movies?.nowPlayingMovies)
  const popularMovies=useSelector((state)=>state.movies?.popularMovies)
  const topRatedMovies=useSelector((state)=>state.movies?.topRatedMovies)
  const upcomingMovies=useSelector((state)=>state.movies?.upcomingMovies)
  return (
    <div className='bg-black'>
    <div className='mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20'>
      <MovieList title={"Now Playing"} movies={nowPlayingMovies}/>
      <MovieList title={"Popular Movies"} movies={popularMovies}/>
      <MovieList title={"Top Rated Movies"} movies={topRatedMovies}/>
      <MovieList title={"Upcoming Movies"} movies={upcomingMovies}/>
    </div>
    </div>
  )
}

export default SecondaryContainer
