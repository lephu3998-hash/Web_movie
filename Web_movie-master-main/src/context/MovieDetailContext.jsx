import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

// Cài đặt YouTube player options
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1, // Tự động phát video
    modestbranding: 1, // Giảm bớt thương hiệu trên video
    rel: 0, // Không hiển thị video liên quan
  },
};

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  // Hàm xử lý video trailer
  const handleVideoTrailer = async (movieId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setTrailerUrl(data.results[0]?.key);
        setIsOpen(true);
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch trailer");
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    if (modalIsOpen) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [modalIsOpen]);

  return (
    <MovieContext.Provider value={{ handleVideoTrailer }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        ariaHideApp={false} // Prevents Modal warnings in dev
        aria-labelledby="trailer-modal-title"
        aria-describedby="trailer-modal-description"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Màu nền tối mờ
            zIndex: 9999,
          },
          content: {
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90%", // Tự động điều chỉnh chiều rộng
            width: "640px",  // Chiều rộng cố định cho video
            backgroundColor: "transparent", // Không có background
            border: "none",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", // Tạo bóng cho modal
            padding: 0,
            borderRadius: "15px", // Viền bo tròn cho modal
            overflow: "hidden", // Đảm bảo không có phần tràn ra ngoài modal
          },
        }}
        contentLabel="Trailer Modal"
      >
        {trailerUrl && (
          <div className="relative">
            <YouTube videoId={trailerUrl} opts={opts} className="rounded-lg" />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white bg-black opacity-75 hover:opacity-100 rounded-full p-2"
              aria-label="Close Modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };
