import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TrailerModal from "./TrailerModal";
import { FaPlay } from "react-icons/fa";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const VITE_IMG_URL = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/movie/${id}?language=vi`;
        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${VITE_API_KEY}`,
          },
        });
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, VITE_API_KEY]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Không tìm thấy phim.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-6 lg:px-20 pb-10">
      {/* 👇 Nút quay lại trang trước */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
      >
        ← Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Poster */}
        <div>
          <img
            src={
              movie.poster_path
                ? `${VITE_IMG_URL}${movie.poster_path}`
                : "/no-poster.jpg"
            }
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-4">
            {movie.overview || "Không có mô tả"}
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm">
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </span>
            <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
              {movie.vote_average.toFixed(1)} ⭐
            </span>
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
              {movie.runtime ? `${movie.runtime} phút` : "N/A"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 border border-gray-500 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <button
            onClick={() => setTrailerOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg text-lg font-semibold transition"
          >
            <FaPlay /> Xem Trailer
          </button>
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerOpen && (
        <TrailerModal movieId={id} onClose={() => setTrailerOpen(false)} />
      )}
    </div>
  );
};

export default MovieDetail;
