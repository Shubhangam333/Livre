import React from "react";
import { useFilter } from "../../contexts/FilterContext";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import Loading from "../../ui/Loader";

const GenreFilter: React.FC = () => {
  const { genre, setGenre } = useFilter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(e.target.value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAllGenres,
  });

  if (isLoading) return <Loading />;

  if (!data) return <h1>No Genres found</h1>;

  return (
    <div className="flex flex-col py-4">
      {data.genres.map((genreItem) => (
        <label key={genreItem.id} className="block">
          <input
            type="radio"
            name="genre"
            value={genreItem.name}
            checked={genre === genreItem.name}
            onChange={handleChange}
            className="mr-2"
          />
          {genreItem.name}
        </label>
      ))}
    </div>
  );
};

export default GenreFilter;
