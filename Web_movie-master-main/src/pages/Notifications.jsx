// src/pages/Notifications.jsx
import React from "react";
import { Link } from "react-router-dom";

const Notifications = () => {
  // Thông báo mẫu (có thể sau này load từ API hoặc localStorage)
  const notifications = [
    { id: 1, text: "🎬 Phim mới: Avengers 5 vừa được cập nhật", time: "2 giờ trước" },
    { id: 2, text: "🔥 Ưu đãi: Nâng cấp tài khoản chỉ 49K/tháng", time: "1 ngày trước" },
    { id: 3, text: "⏰ Bạn còn 3 tập phim chưa xem", time: "3 ngày trước" },
    { id: 4, text: "✨ Phim hot: One Piece tập 1100 đã ra mắt", time: "1 tuần trước" },
  ];

  return (
    <div className="pt-20 px-4 sm:px-10 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6">🔔 Thông báo</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-400">Bạn chưa có thông báo nào.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li
              key={n.id}
              className="bg-[#1f1f1f] border border-gray-700 rounded-lg p-4 hover:bg-[#2a2a2a] transition"
            >
              <p className="text-sm">{n.text}</p>
              <span className="text-xs text-gray-400">{n.time}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition no-underline"
        >
          ⬅ Quay lại Trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Notifications;
