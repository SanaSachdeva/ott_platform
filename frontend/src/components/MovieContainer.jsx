import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const MovieContainer = () => {
  const { popularMovie, nowPlayingMovies, topRatedMovies, upcomingMovies } =
    useSelector((store) => store.movie);
    

  return (
    <div className="bg-black">
      <div className="-mt-52 relative z-10">
        <>
          <MovieList title={"Popular Movies"} movies={popularMovie || []} />
          <MovieList title={"Now Playing Movies"} movies={nowPlayingMovies || []} />
          <MovieList title={"Top Rated Movies"} movies={topRatedMovies || []} />
          <MovieList title={"Upcoming Movies"} movies={upcomingMovies || []} />
        </>
      </div>
    </div>
  );
};

export default MovieContainer;

