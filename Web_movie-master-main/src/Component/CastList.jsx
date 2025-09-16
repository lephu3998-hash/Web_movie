import { useEffect, useState } from "react";

const CastList = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=vi`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        };

        const res = await fetch(url, options);
        const data = await res.json();
        if (data.cast) {
          setCast(data.cast.slice(0, 12)); // chỉ lấy 12 diễn viên
        }
      } catch (error) {
        console.error("Lỗi fetch cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className="my-10 px-10">
      <h2 className="text-xl uppercase text-white font-bold mb-4">Diễn viên</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition cursor-pointer"
          >
            <img
              src={
                actor.profile_path
                  ? `${IMG_BASE_URL}${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 text-center">
              <p className="text-sm font-semibold">{actor.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
