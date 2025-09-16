// src/Component/Categories.jsx
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieDetailContext";
import { FaHeart, FaRegHeart, FaPlay } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const Categories = ({ title, data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const [likedMovies, setLikedMovies] = useState([]);

  // Initialize AOS and load liked movies from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem("likedMovies");
    if (storedLikes) {
      setLikedMovies(JSON.parse(storedLikes));
    }

    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  // Handle toggling the "like" status of a movie
  const handleLikeToggle = (movieId, e) => {
    e.stopPropagation();
    setLikedMovies((prevLikedMovies) => {
      const updatedLikedMovies = prevLikedMovies.includes(movieId)
        ? prevLikedMovies.filter((id) => id !== movieId)
        : [...prevLikedMovies, movieId];

      localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
      return updatedLikedMovies;
    });
  };

  // Return null or a message if no data is available
  if (!data || data.length === 0) {
    return <div className="my-10 px-10 text-white text-center">Không có dữ liệu phim để hiển thị.</div>;
  }

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-10 max-w-full relative">
      {/* Removed Snowfall as it's not related to movie categories */}
      {/* Title Section */}
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-8 bg-red-600 mr-4 rounded-full"></div>
        <h2 className="text-2xl uppercase text-white font-bold">{title}</h2>
      </div>

      {/* Carousel Section */}
      <Carousel responsive={responsive} draggable={false}>
        {data.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105 cursor-pointer relative mx-2"
            onClick={() => handleVideoTrailer(movie.id)}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Movie Poster */}
            <img
              src={
                movie.poster_path
                  ? `${import.meta.env.VITE_IMG_URL}${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.name || movie.title}
              className="w-full h-80 object-cover"
            />

            {/* Overlay and Hover Effects */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
              <FaPlay className="text-white text-4xl opacity-80 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125" />
              <h3 className="text-lg text-white uppercase font-semibold mt-4">
                {movie.name || movie.title || movie.original_title}
              </h3>
            </div>

            {/* Like Icon */}
            <div
              className="absolute top-3 right-3 z-20"
              onClick={(e) => handleLikeToggle(movie.id, e)}
            >
              {likedMovies.includes(movie.id) ? (
                <FaHeart className="text-red-600 text-2xl drop-shadow-md hover:scale-110 transition-transform duration-300" />
              ) : (
                <FaRegHeart className="text-white text-2xl drop-shadow-md hover:scale-110 transition-transform duration-300" />
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

Categories.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default Categories;