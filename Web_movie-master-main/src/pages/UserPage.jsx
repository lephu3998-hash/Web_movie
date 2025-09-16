import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaCheck, FaTimes, FaCamera } from "react-icons/fa";
import axios from "axios";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [notification, setNotification] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUserName = localStorage.getItem("userName");
    const storedUserAvatar = localStorage.getItem("userAvatar");
    if (storedUserName) setUserName(storedUserName);
    if (storedUserAvatar) setUserAvatar(storedUserAvatar);

    // Lấy danh sách yêu thích từ API
    if (userId) {
      axios.get(`/api/users/${userId}/favorites`)
        .then(res => setFavorites(res.data))
        .catch(err => console.error(err));
    }
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewUserName(userName);
  };

  const handleSave = () => {
    if (newUserName.trim() !== "") {
      localStorage.setItem("userName", newUserName);
      setUserName(newUserName);
      setIsEditing(false);
      setNotification("Cập nhật hồ sơ thành công!");
      setTimeout(() => setNotification(""), 2000);
    } else {
      setNotification("Tên người dùng không được để trống!");
      setTimeout(() => setNotification(""), 2000);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewUserName(userName);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("userAvatar", reader.result);
        setUserAvatar(reader.result);
        setNotification("Cập nhật ảnh đại diện thành công!");
        setTimeout(() => setNotification(""), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
      {notification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 py-2 px-6 rounded-lg bg-teal-500 text-white text-lg font-semibold shadow-lg">
          {notification}
        </div>
      )}

      {/* Hồ sơ người dùng */}
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8 text-center">
        <div className="relative mb-6">
          {userAvatar ? (
            <img src={userAvatar} alt="User Avatar" className="w-36 h-36 rounded-full mx-auto border-4 border-yellow-400 shadow-2xl object-cover" />
          ) : (
            <FaUserCircle className="text-gray-500 text-9xl mx-auto" />
          )}
          {!isEditing && (
            <button onClick={handleEditClick} className="absolute bottom-2 right-[40%] bg-yellow-400 text-black rounded-full p-3 shadow-lg hover:bg-yellow-500">
              <FaEdit />
            </button>
          )}
          <label htmlFor="avatarUpload" className="absolute bottom-2 right-0 bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500 cursor-pointer">
            <FaCamera />
          </label>
          <input id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center justify-center gap-3 mb-6">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-4/5 p-3 rounded-lg bg-gray-100 text-black border-2 border-gray-300"
              />
              <button onClick={handleSave} className="bg-green-500 p-3 text-white rounded-full"><FaCheck /></button>
              <button onClick={handleCancel} className="bg-red-500 p-3 text-white rounded-full"><FaTimes /></button>
            </div>
          ) : (
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{userName || "Tên của bạn"}</h2>
          )}
          <p className="text-gray-500 text-lg">Xin chào, hãy cập nhật hồ sơ của bạn nếu muốn!</p>
        </div>
      </div>

      {/* Danh sách phim yêu thích */}
      <div className="w-full max-w-4xl mt-10">
        <h3 className="text-xl font-bold mb-4 text-white">Phim yêu thích</h3>
        {favorites.length === 0 ? (
          <p className="text-white">Bạn chưa thêm phim nào vào danh sách yêu thích.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-3 rounded-md">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md mb-2"
                />
                <h4 className="text-sm text-white font-semibold">{movie.title}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
