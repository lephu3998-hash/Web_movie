// src/pages/TheLoaiPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TheLoaiPage = () => {
  const [genres, setGenres] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=vi",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Lỗi khi tải thể loại:", err);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Thể loại phim 123</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            to={`/the-loai/${genre.id}`}
            className="block bg-gray-800 p-4 rounded-lg hover:bg-yellow-500 hover:text-black transition"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TheLoaiPage;
