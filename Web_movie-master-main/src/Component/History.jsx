// src/pages/History.jsx
import React, { useState, useEffect } from "react";
import { FaHistory, FaTrash, FaPlay } from "react-icons/fa";

const IMG_BASE =
  import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500";

const History = () => {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("userId"); // 👤 lấy user hiện tại

  useEffect(() => {
    if (userId) {
      setHistory(JSON.parse(localStorage.getItem(`history_${userId}`)) || []);
    }
  }, [userId]);

  const removeHistory = (id) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen bg-[#14161a] text-white">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaHistory /> Danh sách xem tiếp
        </h1>

        {history.length === 0 ? (
          <p>Bạn chưa xem phim nào.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {history.map((movie) => (
              <div
                key={movie.id}
                className="relative group rounded-md overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
              >
                <img
                  src={`${IMG_BASE}${movie.poster_path || movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-3">
                  <button className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
                    <FaPlay /> Xem tiếp
                  </button>
                  <button
                    onClick={() => removeHistory(movie.id)}
                    className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                  >
                    <FaTrash /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
