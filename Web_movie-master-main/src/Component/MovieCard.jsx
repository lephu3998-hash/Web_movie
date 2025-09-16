import { FaHeart } from "react-icons/fa";

const MovieCard = ({ movie, userId, onAdded }) => {
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  const addFavorite = async () => {
    if (!userId) {
      alert("Bạn cần đăng nhập!");
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/favorites/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie }),
      });
      const data = await res.json();
      onAdded && onAdded(data); // cập nhật UI
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  return (
    <div className="relative group">
      <img
        src={`${IMG_BASE}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-[300px] object-cover rounded"
      />
      <button
        onClick={addFavorite}
        className="absolute bottom-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
      >
        <FaHeart />
      </button>
    </div>
  );
};

export default MovieCard;
