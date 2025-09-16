import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieDetailContext";
import { FaPlay } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 8 },
  desktop: { breakpoint: { max: 3000, min: 1200 }, items: 6 },
  tablet: { breakpoint: { max: 1200, min: 600 }, items: 3 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 2 },
};

const IMG_BASE =
  import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500";

const List = ({ title, data, type = "movie" }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });

    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);

    // Lắng nghe thay đổi từ localStorage
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(updated);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleFavorite = (movie) => {
    let updated;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updated = favorites.filter((fav) => fav.id !== movie.id);
      console.log("🗑️ Đã xóa khỏi yêu thích:", movie.title || movie.name);
    } else {
      updated = [...favorites, movie];
      console.log("💖 Đã thêm vào yêu thích:", movie.title || movie.name);
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <div className="my-10 px-6 max-w-full relative">
      <div className="flex items-center mb-4">
        <div className="w-1.5 h-8 bg-yellow-400 mr-4"></div>
        <h2 className="text-xl uppercase text-white font-bold">{title}</h2>
      </div>

      <Carousel responsive={responsive} draggable={false}>
        {data?.map((movie) => {
          const poster =
            movie.poster_path || movie.backdrop_path || "/placeholder.png";
          const movieTitle =
            movie.title ||
            movie.name ||
            movie.original_title ||
            "Unknown Title";
          const release = movie.release_date || movie.first_air_date || "—";

          return (
            <div
              key={movie.id}
              className="bg-cover bg-center w-[200px] h-[300px] relative group rounded-md shadow-lg hover:scale-105 transition-all duration-500 cursor-pointer"
              style={{ backgroundImage: `url(${IMG_BASE}${poster})` }}
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <div className="bg-black/60 absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                <button
                  onClick={() => handleVideoTrailer(movie.id, type)}
                  className="flex items-center gap-2 bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-500 transition"
                >
                  <FaPlay /> Xem ngay
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(movie);
                  }}
                  className={`px-4 py-2 rounded font-bold transition ${
                    isFavorite(movie.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-300 text-black hover:bg-red-400 hover:text-white"
                  }`}
                >
                  {isFavorite(movie.id) ? "Đã yêu thích" : "Yêu thích"}
                </button>
              </div>

              {/* Dark Overlay background */}
              <div className="bg-black/60 opacity-0 group-hover:opacity-90 absolute inset-0 transition-opacity duration-500 z-0"></div>

              {/* Zoom Background on Hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-100"
                style={{ backgroundImage: `url(${IMG_BASE}${poster})` }}
              ></div>

              {/* Movie Title */}
              <div className="relative p-4 flex flex-col items-center justify-end h-full">
                <h3 className="text-md text-center text-white uppercase font-semibold transition-all duration-500 transform opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  {movieTitle}
                </h3>
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {release}
                </p>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  type: PropTypes.oneOf(["movie", "tv"]),
};

export default List;
