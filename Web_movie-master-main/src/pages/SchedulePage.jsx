// src/pages/SchedulePage.jsx
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const IMG_BASE = import.meta.env.VITE_IMG_URL;

export default function SchedulePage() {
  const [schedule, setSchedule] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  // lấy danh sách phim (upcoming hoặc trending)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=vi&page=1`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });
        const data = await res.json();
        const movies = data.results || [];

        // generate schedule: 7 ngày, mỗi ngày 1 phim theo index (deterministic)
        const days = 7;
        const today = new Date();
        const scheduleData = {};
        for (let i = 0; i < days; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() + i);
          const key = d.toISOString().split("T")[0];

          // pick movie by index to ensure different movie per day
          const index = i % Math.max(1, movies.length);
          const movie = movies[index] || null;

          scheduleData[key] = movie
            ? {
                id: movie.id,
                title: movie.title || movie.name,
                poster: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
                overview: movie.overview,
                showtimes: ["18:00", "20:00", "22:00"], // 1 phim nhiều suất
              }
            : null;
        }

        setSchedule(scheduleData);
        setSelectedDate(Object.keys(scheduleData)[0]);
      } catch (err) {
        console.error("Schedule fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="pt-24 p-6 text-white">Đang tải lịch chiếu...</div>;

  return (
    <div className="pt-24 px-8 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📅 Lịch chiếu phim</h1>

      {/* Tabs ngày */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {Object.keys(schedule).map((date) => {
          const d = new Date(date);
          const isActive = date === selectedDate;
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-md font-medium whitespace-nowrap ${
                isActive ? "bg-yellow-500 text-black" : "bg-[#2a2a2a] text-white"
              }`}
            >
              <div className="text-xs">{d.toLocaleDateString("vi-VN", { weekday: "short" })}</div>
              <div className="text-sm font-semibold">{d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}</div>
            </button>
          );
        })}
      </div>

      {/* Nội dung ngày được chọn */}
      <div>
        {schedule[selectedDate] ? (
          <div className="bg-[#1e1e1e] rounded-lg p-4 flex gap-4 items-start">
            <img
              src={schedule[selectedDate].poster || "https://via.placeholder.com/200x300?text=No+Image"}
              alt={schedule[selectedDate].title}
              className="w-40 h-56 object-cover rounded-md"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{schedule[selectedDate].title}</h2>
              <p className="text-gray-300 mt-2">{schedule[selectedDate].overview?.slice(0, 200)}...</p>

              <div className="mt-4 flex flex-wrap gap-3">
                {schedule[selectedDate].showtimes.map((t) => (
                  <button key={t} className="px-3 py-1 rounded bg-yellow-500 text-black font-medium">
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <a
                  href={`/movie/${schedule[selectedDate].id}`}
                  className="inline-block mt-2 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 no-underline"
                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400">Không có lịch cho ngày này.</div>
        )}
      </div>
    </div>
  );
}
