import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);

  const stopRetryingHandler=()=>{
    setError(null)
  }

  const fetchMoviesHandler =useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try{
      const response = await fetch("https://swapi.dev/api/films");
      if(!response.ok){
        throw new Error('Something went wrong..Retrying')
      }
      const data = await response.json();
      const transformedData = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformedData);
    }catch(error){
      setError(error.message)
    }
    setIsLoading(false)
  },[]);

  useEffect(()=>{
    if(error){
      const id=setInterval(() => {
        fetchMoviesHandler();
      }, 5000);

      return ()=>{
        clearInterval(id)
      }
    }

  },[error,fetchMoviesHandler])

  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler])



  let content=<p>Found no movies</p>
  if(movies.length>0){
    content=<MoviesList movies={movies} />
  }
  if(isLoading){
    content=<p>LOADING...Please Wait</p>
  }
  if(error){
    content=<p>{error} <button onClick={stopRetryingHandler}>Cancle Retrying</button></p>
  }

  return (
    <React.Fragment>
    <MovieForm/>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
