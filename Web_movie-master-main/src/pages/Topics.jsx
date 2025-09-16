import { Link } from "react-router-dom";
import { topics } from "../data/index.js";

const Topics = () => {
  return (
    <div className="px-6 py-10 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Các chủ đề</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.id}`}
            className={`${topic.color} rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300 relative overflow-hidden`}
          >
            {/* Hiệu ứng background sóng nhẹ */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_107%,#fff,transparent_70%)]"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-white">{topic.name}</h2>
            </div>
            <p className="relative z-10 text-white mt-4 text-sm font-medium flex items-center gap-1">
              Xem toàn bộ <span>➜</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topics;
