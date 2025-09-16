import { useParams, Link } from "react-router-dom";
import { topics, movies } from "../data/index.js";

const TopicMovies = () => {
  const { topicId } = useParams();
  const topic = topics.find((t) => t.id.toLowerCase() === topicId.toLowerCase());
  const topicMovies = movies.filter((m) => m.topic.toLowerCase() === topicId.toLowerCase());

  if (!topic) {
    return <h1 className="text-center text-red-500 mt-20">Chủ đề không tồn tại</h1>;
  }

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">
        Phim thuộc chủ đề: {topic.name}
      </h1>

      {topicMovies.length === 0 ? (
        <p className="text-gray-400">Chưa có phim nào trong chủ đề này.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topicMovies.map((movie) => (
            <li
              key={movie.id}
              className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-bold text-lg">{movie.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <Link
          to="/topics"
          className="text-blue-400 hover:text-blue-600 transition-colors"
        >
          ← Quay lại danh sách chủ đề
        </Link>
      </div>
    </div>
  );
};

export default TopicMovies;
