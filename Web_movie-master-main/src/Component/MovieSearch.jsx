import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "../context/MovieDetailContext";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaPlay } from "react-icons/fa";

const MovieSearch = ({ data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // 👤 user hiện tại
  const [favorites, setFavorites] = useState([]);

  // Load favorites khi mount
  useEffect(() => {
    if (userId) {
      const savedFavorites =
        JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
      setFavorites(savedFavorites);
    }
  }, [userId]);

  // Thêm / Xóa yêu thích
  const toggleFavorite = (movie) => {
    if (!userId) return;

    let updatedFavorites;
    const exists = favorites.some((f) => f.id === movie.id);

    if (exists) {
      updatedFavorites = favorites.filter((f) => f.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  return (
    <div className="my-10 px-6 lg:px-10 max-w-full">
      <h2 className="text-2xl font-semibold uppercase mb-6 text-white">
        Kết quả tìm kiếm
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative group bg-cover bg-no-repeat bg-center w-full h-[350px] sm:h-[400px] md:h-[450px] rounded-lg overflow-hidden transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${item.poster_path})`,
            }}
          >
            {/* Overlay */}
            <div className="bg-black/60 w-full h-full absolute top-0 left-0 z-10 transition-all group-hover:bg-black/80"></div>

            {/* Nội dung */}
            <div className="relative z-20 p-4 flex flex-col items-center justify-end h-full text-center">
              <h3 className="text-lg text-white font-bold uppercase tracking-wide mb-2">
                {item.name || item.title || item.original_title}
              </h3>
              <p className="text-sm text-white opacity-80">
                {item.release_date}
              </p>

              {/* Nút hành động */}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleVideoTrailer(item.id)}
                  className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-2 rounded-lg hover:bg-yellow-400 transition"
                >
                  <FaPlay /> Xem
                </button>
                <button
                  onClick={() => toggleFavorite(item)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                    isFavorite(item.id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                >
                  <FaHeart /> {isFavorite(item.id) ? "Bỏ thích" : "Yêu thích"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logo, click vào sẽ về trang chủ */}
      <div
        className="cursor-pointer mt-6 text-center text-3xl text-white font-bold hover:text-yellow-500"
        onClick={() => navigate("/")}
      >
        BUSI Ci-Nê
      </div>
    </div>
  );
};

MovieSearch.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MovieSearch;
