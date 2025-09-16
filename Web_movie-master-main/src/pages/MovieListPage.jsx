// src/pages/MovieListPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buildImageUrl } from "../utils/image";
import { genres } from "../data/genres";
import { FaHeart, FaPlay } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_API_KEY;

const MovieListPage = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");
  const userId = localStorage.getItem("userId"); // 👤 lấy user đang login

  const genreName = genres.find((g) => g.id.toString() === id)?.name || "";

  // Load favorites khi mount
  useEffect(() => {
    if (userId) {
      const saved = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
      setFavorites(saved);
    }
  }, [userId]);

  const fetchMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      let url = "";

      if (type === "movie") {
        url = `https://api.themoviedb.org/3/discover/movie?language=vi&page=${pageNum}`;
      } else if (type === "tv") {
        url = `https://api.themoviedb.org/3/discover/tv?language=vi&page=${pageNum}`;
      } else if (type === "genre") {
        url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=vi&page=${pageNum}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      const data = await res.json();

      if (data?.results) {
        setMovies((prev) =>
          pageNum === 1 ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages || 1);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies(1);
  }, [id, type]);

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
    }
  };

  // ✅ Kiểm tra có trong favorites chưa
  const isFavorite = (movieId) => favorites.some((f) => f.id === movieId);

  // ✅ Thêm / Xóa yêu thích
  const toggleFavorite = (movie) => {
    if (!userId) {
      alert("⚠️ Bạn cần đăng nhập để thêm vào mục Yêu thích!");
      return;
    }

    let updated;
    if (isFavorite(movie.id)) {
      updated = favorites.filter((f) => f.id !== movie.id);
      setNotification("❌ Đã xóa khỏi danh sách yêu thích!");
    } else {
      updated = [...favorites, movie];
      setNotification("❤️ Đã thêm vào danh sách yêu thích!");
    }

    setFavorites(updated);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updated));

    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="p-6 mt-20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-10 right-5 bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
          {notification}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-white">
        {type === "movie"
          ? "Phim Lẻ"
          : type === "tv"
          ? "Phim Bộ"
          : `Phim thể loại: ${genreName}`}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 rounded overflow-hidden relative group hover:scale-105 transition"
            >
              <img
                src={buildImageUrl(
                  movie.poster_path || movie.backdrop_path,
                  "w500"
                )}
                alt={movie.title || movie.name || ""}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/no-poster.jpg";
                }}
                className="w-full h-[300px] object-cover rounded"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-100 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition">
                {/* Xem ngay */}
                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition"
                >
                  <FaPlay /> Xem ngay
                </button>

                {/* Yêu thích */}
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                    isFavorite(movie.id)
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-white text-red-500 hover:bg-red-200"
                  }`}
                >
                  <FaHeart /> {isFavorite(movie.id) ? "Đã thích" : "Yêu thích"}
                </button>
              </div>

              {/* Tên phim */}
              <div className="p-2 text-center">
                <h2 className="text-white text-sm mt-2 truncate">
                  {movie.title || movie.name}
                </h2>
                <p className="text-gray-400 text-xs">
                  {movie.release_date?.slice(0, 4) ||
                    movie.first_air_date?.slice(0, 4)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">Vui lòng đợi...</p>
        )}
      </div>

      {page < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow"
          >
            {loading ? "Đang tải..." : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieListPage;
