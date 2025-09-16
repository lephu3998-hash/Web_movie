import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

const IMG_BASE =
  import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Hàm load favorites từ localStorage
  const loadFavorites = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
    console.log("🔄 FavoritesPage cập nhật:", saved.map(m => m.title || m.name));
  };

  useEffect(() => {
    loadFavorites(); // chạy khi mount

    // Lắng nghe sự kiện storage (chỉ hoạt động khi tab khác thay đổi localStorage)
    const handleStorage = (e) => {
      if (e.key === "favorites") {
        loadFavorites();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const removeFavorite = (movieId) => {
    const updated = favorites.filter((fav) => fav.id !== movieId);
    setFavorites(updated); // cập nhật state ngay
    localStorage.setItem("favorites", JSON.stringify(updated)); // lưu lại storage
    console.log("🗑️ Xóa khỏi favorites:", movieId);
  };

  return (
    <div className="px-6 py-10 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">📌 Danh sách yêu thích</h1>

      {favorites.length === 0 ? (
        <p>Bạn chưa thêm phim nào vào danh sách yêu thích.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-md overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
            >
              <img
                src={`${IMG_BASE}${movie.poster_path || movie.backdrop_path}`}
                alt={movie.title || movie.name || "Movie"}
                className="w-full h-[300px] object-cover"
              />

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  <FaTrash /> Xóa
                </button>
              </div>

              <div className="absolute bottom-0 w-full bg-black/80 p-2 text-center">
                <h3 className="text-sm font-semibold truncate">
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

export default FavoritesPage;
