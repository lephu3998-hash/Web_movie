import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { countries } from "../data/countries";
import { FaHeart, FaPlay } from "react-icons/fa";

const MovieByCountry = () => {
  const { id } = useParams(); // quốc gia (VN, US, KR...)
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const userId = localStorage.getItem("userId"); // 👤 user hiện tại

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/discover/movie?with_origin_country=${id}&language=vi&page=1`;

        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies by country:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    // lấy tên quốc gia
    const country = countries.find((c) => c.id === id);
    setCountryName(country ? country.name : "Không xác định");

    fetchMovies();

    // load danh sách yêu thích của user
    if (userId) {
      const saved = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
      setFavorites(saved);
    }
  }, [id, API_KEY, userId]);

  // kiểm tra phim đã thích chưa
  const isFavorite = (movieId) => {
    return favorites.some((f) => f.id === movieId);
  };

  // toggle yêu thích
  const toggleFavorite = (movie) => {
    if (!userId) {
      alert("Bạn cần đăng nhập để sử dụng tính năng này!");
      return;
    }

    let updated;
    if (isFavorite(movie.id)) {
      updated = favorites.filter((f) => f.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Đang tải dữ liệu phim...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 px-6 pb-10">
      <h1 className="text-2xl font-bold text-white mb-6">
        Phim {countryName}
      </h1>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-gray-900 rounded-lg shadow hover:scale-105 transform transition overflow-hidden"
            >
              {/* Poster */}
              <img
                src={
                  movie.poster_path
                    ? `${IMG_URL}${movie.poster_path}`
                    : "/no-poster.jpg"
                }
                alt={movie.title || movie.name}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />

              {/* Overlay nút */}
              <div className="absolute inset-0 bg-black/60 opacity-100 hover:opacity-100 flex items-center justify-center gap-3 transition">
                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-2 rounded-full hover:bg-yellow-400 transition"
                >
                  <FaPlay /> Xem ngay
                </button>
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${
                    isFavorite(movie.id)
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-black"
                  }`}
                >
                  <FaHeart />
                  {isFavorite(movie.id) ? "Bỏ thích" : "Yêu thích"}
                </button>
              </div>

              {/* Thông tin phim */}
              <div className="p-2">
                <h2 className="text-sm font-semibold text-white truncate">
                  {movie.title || movie.name}
                </h2>
                <p className="text-xs text-gray-400">
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-lg">
          Không có phim {countryName}.
        </div>
      )}
    </div>
  );
};

export default MovieByCountry;
