// src/pages/UserProfile.jsx
import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaBell,
  FaUser,
  FaHistory,
  FaTrash,
  FaPlay,
} from "react-icons/fa";

const IMG_BASE =
  import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500";

const avatarCategories = {
  "Hoạt hình": [
    "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
    "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
    "https://cdn-icons-png.flaticon.com/512/219/219969.png",
    "https://cdn-icons-png.flaticon.com/512/236/236832.png",
  ],
  "Hàn Quốc": [
    "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    "https://cdn-icons-png.flaticon.com/512/2922/2922656.png",
    "https://cdn-icons-png.flaticon.com/512/706/706830.png",
  ],
  "Trung Quốc": [
    "https://cdn-icons-png.flaticon.com/512/1999/1999625.png",
    "https://cdn-icons-png.flaticon.com/512/147/147144.png",
    "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
  ],
  "Việt Nam": [
    "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
    "https://cdn-icons-png.flaticon.com/512/4333/4333600.png",
    "https://cdn-icons-png.flaticon.com/512/4333/4333635.png",
  ],
  "Âu-Mỹ": [
    "https://cdn-icons-png.flaticon.com/512/4333/4333631.png",
    "https://cdn-icons-png.flaticon.com/512/4333/4333607.png",
    "https://cdn-icons-png.flaticon.com/512/4333/4333622.png",
  ],
  Meme: [
    "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    "https://cdn-icons-png.flaticon.com/512/616/616554.png",
  ],
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("account");

  const [userName, setUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const userId = localStorage.getItem("userId");

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Hoạt hình");

  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  const [notification, setNotification] = useState("");

  // ✅ Notifications mẫu
  const notifications = [
    { id: 1, text: "🎬 Phim mới: Avengers 5 vừa được cập nhật", time: "2 giờ trước" },
    { id: 2, text: "🔥 Ưu đãi: Nâng cấp tài khoản chỉ 49K/tháng", time: "1 ngày trước" },
    { id: 3, text: "⏰ Bạn còn 3 tập phim chưa xem", time: "3 ngày trước" },
    { id: 4, text: "✨ Phim hot: One Piece tập 1100 đã ra mắt", time: "1 tuần trước" },
  ];

  useEffect(() => {
    const storedUserName = localStorage.getItem(`userName_${userId}`);
    const storedUserAvatar = localStorage.getItem(`userAvatar_${userId}`);
    const storedGender = localStorage.getItem(`gender_${userId}`);
    const storedEmail = localStorage.getItem(`userEmail_${userId}`);

    if (storedUserName) {
      setUserName(storedUserName);
      setNewUserName(storedUserName);
    }
    if (storedUserAvatar) setUserAvatar(storedUserAvatar);
    if (storedGender) setGender(storedGender);
    if (storedEmail) setEmail(storedEmail);

    setHistory(JSON.parse(localStorage.getItem(`history_${userId}`)) || []);
  }, [userId]);

  useEffect(() => {
    if (activeTab === "favorites" && userId) {
      setFavorites(
        JSON.parse(localStorage.getItem(`favorites_${userId}`)) || []
      );
    }
  }, [activeTab, userId]);

  const handleUpdate = () => {
    if (newUserName.trim() === "") {
      setNotification("Tên hiển thị không được để trống!");
      setTimeout(() => setNotification(""), 2000);
      return;
    }
    localStorage.setItem(`userName_${userId}`, newUserName);
    localStorage.setItem(`userAvatar_${userId}`, userAvatar);
    localStorage.setItem(`gender_${userId}`, gender);

    setUserName(newUserName);
    setNotification("Cập nhật thành công!");
    setTimeout(() => setNotification(""), 2000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setUserAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePresetAvatarClick = (avatar) => {
    setUserAvatar(avatar);
    setNotification("Đã chọn ảnh đại diện!");
    setTimeout(() => setNotification(""), 1500);
    setShowAvatarModal(false);
  };

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updated));
  };

  const removeHistory = (id) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
  };

  return (
    <div className="flex min-h-screen bg-[#14161a] text-white space-x-3">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2025] flex flex-col justify-between p-10">
        <div>
          <h2 className="text-lg font-bold mb-10">Quản lý tài khoản</h2>
          <nav className="space-y-5">
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                activeTab === "favorites"
                  ? "text-yellow-400"
                  : "hover:text-yellow-400"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              <FaHeart /> Yêu thích
            </div>
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                activeTab === "history"
                  ? "text-yellow-400"
                  : "hover:text-yellow-400"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <FaHistory /> Xem tiếp
            </div>
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                activeTab === "notifications"
                  ? "text-yellow-400"
                  : "hover:text-yellow-400"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <FaBell /> Thông báo
            </div>
            <div
              className={`flex items-center gap-2 cursor-pointer ${
                activeTab === "account"
                  ? "text-yellow-400"
                  : "hover:text-yellow-400"
              }`}
              onClick={() => setActiveTab("account")}
            >
              <FaUser /> Tài khoản
            </div>
          </nav>
        </div>

        {/* Footer user info */}
        <div className="flex items-center gap-3 border-t border-gray-700 pt-4">
          <img
            src={
              userAvatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-yellow-400"
          />
          <div>
            <p className="font-semibold">{userName || "Người dùng"}</p>
            <p className="text-sm text-gray-400">
              {gender === "male"
                ? "♂ Nam"
                : gender === "female"
                ? "♀ Nữ"
                : "⚪ Không xác định"}
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative mt-16">
        {notification && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 py-2 px-6 rounded-lg bg-yellow-500 text-black font-semibold shadow-lg">
            {notification}
          </div>
        )}

        {/* ✅ Favorites */}
        {activeTab === "favorites" && (
          <>
            <h1 className="text-2xl font-bold mb-6">❤️ Danh sách yêu thích</h1>
            {favorites.length === 0 ? (
              <p>Bạn chưa thêm phim nào vào mục yêu thích.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {favorites.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative group rounded-md overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
                  >
                    <img
                      src={`${IMG_BASE}${movie.poster_path || movie.backdrop_path}`}
                      alt={movie.title || movie.name}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-80 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-3">
                      <button className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
                        <FaPlay /> Xem ngay
                      </button>
                      <button
                        onClick={() => removeFavorite(movie.id)}
                        className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                      >
                        <FaTrash /> Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ✅ History */}
        {activeTab === "history" && (
          <>
            <h1 className="text-2xl font-bold mb-6">📺 Danh sách xem tiếp</h1>
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
          </>
        )}

        {/* ✅ Notifications */}
        {activeTab === "notifications" && (
          <>
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
          </>
        )}

        {/* ✅ Account */}
        {activeTab === "account" && (
          <>
            <h1 className="text-2xl font-bold mb-6">👤 Tài khoản</h1>
            <div className="bg-[#1e2025] p-6 rounded-xl shadow-lg max-w-xl">
              <div className="mb-4">
                <label className="block text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email || "Chưa có email"}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-700 text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-1">Tên hiển thị</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Giới tính</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                    />
                    Nam
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                    />
                    Nữ
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={gender === "other"}
                      onChange={() => setGender("other")}
                    />
                    Không xác định
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-400 mb-2">Ảnh đại diện</label>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={
                      userAvatar ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="avatar"
                    className="w-20 h-20 rounded-full border-2 border-yellow-400"
                  />
                  <label className="bg-yellow-500 px-4 py-2 rounded-lg text-black cursor-pointer hover:bg-yellow-400">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => setShowAvatarModal(true)}
                    className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-500"
                  >
                    Chọn ảnh có sẵn
                  </button>
                </div>
              </div>

              <button
                onClick={handleUpdate}
                className="bg-yellow-500 px-6 py-2 rounded-lg text-black font-semibold hover:bg-yellow-400"
              >
                Cập nhật
              </button>
            </div>
          </>
        )}
      </main>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1e2025] p-6 rounded-xl shadow-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Đổi ảnh đại diện</h2>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✖
              </button>
            </div>

            <div className="flex gap-4 mb-6 border-b border-gray-700 pb-2">
              {Object.keys(avatarCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1 rounded-lg ${
                    activeCategory === category
                      ? "bg-yellow-500 text-black"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
              {avatarCategories[activeCategory].map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`preset-${index}`}
                  className={`w-20 h-20 rounded-full cursor-pointer border-2 ${
                    userAvatar === avatar
                      ? "border-yellow-500"
                      : "border-transparent"
                  }`}
                  onClick={() => handlePresetAvatarClick(avatar)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
