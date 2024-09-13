import { useState, useEffect, useCallback } from "react";
import { moveAPIInstance } from "../api";

export const useFavMutation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const markMovieAsFav = async (id, value = true) => {
    setIsLoading(true);

    const { data } = await moveAPIInstance.post(`account/20844241/favorite`, {
      media_type: "movie",
      media_id: id,
      favorite: value,
    });
    setIsLoading(false);
    return data;
  };

  return { mutate: markMovieAsFav, isLoading };
};

export const useGetFavMovies = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    moveAPIInstance
      .get(`/account/20844241/favorite/movies?page=${page}`)
      .then((respone) => setResults(respone.data.results))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextPage = () => {
    setPage(page + 1);
  };

  return { loading, results, page, nextPage, refetch: fetchData };
};
