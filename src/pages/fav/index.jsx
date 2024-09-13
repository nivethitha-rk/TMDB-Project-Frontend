import { Grid, Button } from "@mui/material";
import MovieCard from "../../components/movie-card";
import { useGetFavMovies } from "../../hooks/use-fav";
import "./style.css";

const FavPage = () => {
  const { results, loading, nextPage, refetch } = useGetFavMovies();
  return (
    <section className="favpage-container">
      <section className="movies-container">
        <Grid container spacing={2}>
          {results.map((movie) => (
            <Grid item key={movie.id}>
              <MovieCard
                onMutateSuccess={() => refetch()}
                context="fav"
                movieId={movie.id}
                title={movie.title}
                description={movie.overview}
                imageURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </Grid>
          ))}
        </Grid>
        <Button disabled={loading} onClick={nextPage} variant="contained">
          Load More
        </Button>
      </section>
    </section>
  );
};

export default FavPage;
