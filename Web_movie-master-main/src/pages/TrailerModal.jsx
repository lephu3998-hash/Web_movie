import React, { useEffect, useState } from "react";
import axios from "axios";

const TrailerModal = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        // Lấy trailer tiếng Việt
        let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=vi`;
        let response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${VITE_API_KEY}`,
          },
        });

        let trailers = response.data.results.filter(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );

        // Nếu không có trailer tiếng Việt → fallback sang tiếng Anh
        if (trailers.length === 0) {
          url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
          response = await axios.get(url, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${VITE_API_KEY}`,
            },
          });
          trailers = response.data.results.filter(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          );
        }

        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        } else {
          setTrailerKey(null);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
        setTrailerKey(null);
      }
    };

    fetchTrailer();
  }, [movieId, VITE_API_KEY]);

  if (!trailerKey) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="bg-black text-white p-6 rounded-lg">
          Vui Lòng Đợi.
          <button
            onClick={onClose}
            className="ml-4 px-4 py-2 bg-red-500 rounded"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative w-[90%] max-w-4xl">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default TrailerModal;
