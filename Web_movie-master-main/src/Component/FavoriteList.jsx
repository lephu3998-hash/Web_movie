import { useState, useEffect } from "react";
import { FaTrash, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IMG_BASE =
  import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500";

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    // Lắng nghe thay đổi từ localStorage (đồng bộ realtime nếu mở nhiều tab)
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(updated);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    setNotification("❌ Đã xóa khỏi danh sách yêu thích!");
    setTimeout(() => setNotification(""), 2000);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([]));

    setNotification("🗑️ Đã xóa toàn bộ danh sách yêu thích!");
    setTimeout(() => setNotification(""), 2000);
  };

  const handlePlay = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-[#0f1115] to-[#14161a] min-h-screen text-white relative">
      {notification && (
        <div className="fixed top-10 right-5 bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg animate-bounce">
          {notification}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-400 drop-shadow-md">
          ❤️ Danh sách yêu thích
        </h1>

        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md"
          >
            <FaTrash /> Xóa tất cả
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400">
          Bạn chưa thêm phim nào vào mục yêu thích.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-xl overflow-hidden shadow-xl transform hover:scale-105 hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={`${IMG_BASE}${movie.poster_path || movie.backdrop_path}`}
                alt={movie.title || movie.name}
                className="w-full h-[300px] object-cover rounded-xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-3">
                <button
                  onClick={() => handlePlay(movie.id)}
                  className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-400 transition shadow-md"
                >
                  <FaPlay /> Xem ngay
                </button>
                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition shadow-md"
                >
                  <FaTrash /> Xóa
                </button>
              </div>

              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 to-transparent p-3 text-center">
                <h3 className="text-sm md:text-base font-semibold truncate">
                  {movie.title || movie.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteList;
