import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, onClick, onPlay, emptyMessage }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies && movies.length > 0 ? (
        movies.map((item) => (
          <MovieCard
            key={item.id}
            item={item}
            onClick={onClick}
            onPlay={onPlay}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400 text-lg">
          {emptyMessage || "Không tìm thấy phim."}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
