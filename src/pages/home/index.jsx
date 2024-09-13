import { useEffect, useRef } from "react";

import Grid from "@mui/material/Grid";

import MovieCard from "../../components/movie-card";

import useMovies from "../../hooks/use-movies";

import "./style.css";

const HomePage = () => {
  const { loading, results, nextPage } = useMovies();

  const lastElementRef = useRef(null);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver((entries) => {
      const el = entries[0];
      if (el && el.isIntersecting) {
        nextPage();
      }
    });

    if (lastElementRef.current) observer.observe(lastElementRef.current);

    return () => {
      if (lastElementRef.current) observer.disconnect(lastElementRef.current);
    };
  }, [nextPage, loading]);

  return (
    <div className="homepage-container">
      <section className="movies-container">
        <Grid container spacing={2}>
          {results.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard
                context="homepage"
                movieId={movie.id}
                title={movie.title}
                description={movie.overview}
                imageURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </Grid>
          ))}
        </Grid>
        <div ref={lastElementRef} />
      </section>
    </div>
  );
};

export default HomePage;
