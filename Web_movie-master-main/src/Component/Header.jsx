// src/Component/Header.jsx
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaCaretDown,
  FaBell,
  FaMobileAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { genres } from "../data/genres";
import { countries } from "../data/countries";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [openGenre, setOpenGenre] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openAppDownload, setOpenAppDownload] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Thông báo mẫu
  const notifications = [
    { id: 1, text: "🎬 Phim mới: Avengers 5 vừa được cập nhật" },
    { id: 2, text: "🔥 Ưu đãi: Nâng cấp tài khoản chỉ 49K/tháng" },
    { id: 3, text: "⏰ Bạn còn 3 tập phim chưa xem" },
  ];

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) setUserName(storedUserName);
    const storedAvatar = localStorage.getItem("userAvatar");
    if (storedAvatar) setUserAvatar(storedAvatar);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (!e.target.closest(".genre-menu")) setOpenGenre(false);
      if (!e.target.closest(".country-menu")) setOpenCountry(false);
      if (!e.target.closest(".app-download")) setOpenAppDownload(false);
      if (!e.target.closest(".notification-menu")) setOpenNotification(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(search);
      setSearch("");
    }
  };

  const handleSearchClick = () => {
    onSearch(search);
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userAvatar");
    setUserName("");
    setUserAvatar("");
    navigate("/");
    window.location.reload();
  };

  const handleMenuItemClick = () => {
    setOpenGenre(false);
    setOpenCountry(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full z-[9999] bg-[#1a1a1a] px-4 py-4 sm:px-8 shadow-md border-b border-gray-800">
      {/* Logo */}
      <div
        onClick={handleLogoClick}
        className="flex items-center gap-2 md:gap-4 cursor-pointer no-underline"
      >
        <img
          src="/Black and Yellow Cinema Logo.png"
          alt="Busi Logo"
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <div className="flex flex-col leading-5 hidden sm:block">
          <span className="text-white text-xl md:text-2xl font-bold no-underline">
            Busi
          </span>
          <span className="text-gray-400 text-xs no-underline">Cinema</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-[250px] sm:max-w-[400px] mx-4 sm:mx-8">
        <input
          type="text"
          placeholder="Tìm kiếm phim..."
          className="p-2 pl-4 pr-10 w-full rounded-full bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
          onClick={handleSearchClick}
        >
          <FaSearch />
        </button>
      </div>

      {/* Menu */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
        <div
          onClick={handleLogoClick}
          className="text-white hover:text-yellow-500 no-underline cursor-pointer"
        >
          Trang chủ
        </div>

        {/* Dropdown Thể loại */}
        <div className="relative genre-menu">
          <button
            onClick={() => setOpenGenre(!openGenre)}
            className="text-white hover:text-yellow-500 flex items-center gap-1 transition-colors"
          >
            Thể loại{" "}
            <FaCaretDown
              className={`${openGenre ? "rotate-180" : ""} transition-transform`}
            />
          </button>
          {openGenre && (
            <div className="absolute left-0 mt-2 w-[500px] bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg z-50">
              <ul className="py-4 px-6 grid grid-cols-3 md:grid-cols-4 gap-3">
                {genres.map((g) => (
                  <li key={`genre-${g.id}`}>
                    <Link
                      to={`/the-loai/${g.id}`}
                      onClick={handleMenuItemClick}
                      className="block text-sm px-2 py-1 text-white hover:bg-yellow-500 hover:text-black rounded no-underline"
                    >
                      {g.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Dropdown Quốc gia */}
        <div className="relative country-menu">
          <button
            onClick={() => setOpenCountry(!openCountry)}
            className="text-white hover:text-yellow-500 flex items-center gap-1 transition-colors"
          >
            Quốc gia{" "}
            <FaCaretDown
              className={`${openCountry ? "rotate-180" : ""} transition-transform`}
            />
          </button>
          {openCountry && (
            <div className="absolute left-0 mt-2 w-[500px] bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg z-50">
              <ul className="py-4 px-6 grid grid-cols-3 md:grid-cols-4 gap-3">
                {countries.map((c) => (
                  <li key={`country-${c.id}`}>
                    <Link
                      to={`/quoc-gia/${c.id}`}
                      onClick={handleMenuItemClick}
                      className="block text-sm px-2 py-1 text-white hover:bg-yellow-500 hover:text-black rounded no-underline"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Link
          to="/phim-le"
          className="text-white hover:text-yellow-500 no-underline"
        >
          Phim Lẻ
        </Link>
        <Link
          to="/phim-bo"
          className="text-white hover:text-yellow-500 no-underline"
        >
          Phim Bộ
        </Link>
        <Link
          to="/lich-chieu"
          className="text-white hover:text-yellow-500 flex items-center gap-1 no-underline"
        >
          Lịch chiếu
          <span className="bg-yellow-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded ml-1">
            NEW
          </span>
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-yellow-500 no-underline"
        >
          Giới Thiệu
        </Link>
      </nav>

      {/* Right icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* App Download */}
        <div
          className="relative app-download items-center gap-2 text-yellow-500 cursor-pointer hover:opacity-80 hidden sm:flex"
          onClick={() => setOpenAppDownload(!openAppDownload)}
        >
          <FaMobileAlt className="text-xl" />
          <span className="text-sm font-semibold">
            Tải ứng dụng
            <br />
            <span className="text-white">Busi</span>
          </span>

          <AnimatePresence>
            {openAppDownload && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute top-12 right-0 w-80 bg-[#1a1a1a] text-white rounded-lg shadow-lg border border-gray-700 z-50 p-4"
              >
                <p className="text-center text-sm text-gray-300 mb-3">
                  Chọn thiết bị hoặc quét QR để tải ứng dụng
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Android TV */}
                  <div className="flex flex-col items-center gap-2 border p-3 rounded-md">
                    <img
                      src="/public/busi_app_qr.png"
                      alt="QR Android TV"
                      className="w-20 h-20"
                    />
                    <a
                      href="/app-androidtv.apk"
                      download
                      className="w-full text-center py-1 bg-yellow-500 text-black rounded-md text-sm font-semibold hover:bg-yellow-400 transition"
                    >
                      Android TV
                    </a>
                  </div>
                  {/* Điện thoại */}
                  <div className="flex flex-col items-center gap-2 border p-3 rounded-md">
                    <img
                      src="/public/busi_app_qr.png"
                      alt="QR Phone"
                      className="w-20 h-20"
                    />
                    <a
                      href="/app-phone.apk"
                      download
                      className="w-full text-center py-1 bg-yellow-500 text-black rounded-md text-sm font-semibold hover:bg-yellow-400 transition"
                    >
                      Điện thoại
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div
          className="relative notification-menu cursor-pointer"
          onClick={() => setOpenNotification(!openNotification)}
        >
          <FaBell className="text-white text-xl hover:text-yellow-500" />
          {/* Badge số thông báo */}
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )}

          <AnimatePresence>
            {openNotification && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute top-10 right-0 w-80 bg-[#1a1a1a] text-white rounded-lg shadow-lg border border-gray-700 z-50 overflow-hidden"
              >
                <div className="p-3 border-b border-gray-700 font-semibold">
                  🔔 Thông báo
                </div>
                <ul className="max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className="px-4 py-2 text-sm hover:bg-gray-800 transition"
                    >
                      {n.text}
                    </li>
                  ))}
                </ul>
               <Link
  to="/notifications"
  className="block p-2 text-center text-xs text-gray-400 border-t border-gray-700 hover:text-yellow-400 no-underline"
  onClick={() => setOpenNotification(false)}
>
  Xem tất cả
</Link>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User account */}
        {userName ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 text-white font-medium focus:outline-none"
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
              <FaCaretDown
                className={`transform transition-transform ${
                  showDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] text-white rounded-lg shadow-lg border border-gray-700 z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-700">
                    <p className="font-bold flex items-center gap-2">
                      {userName} <span className="text-yellow-400">♂</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Nâng cấp tài khoản{" "}
                      <span className="text-yellow-500">Bus</span> để trải
                      nghiệm tốt hơn.
                    </p>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("/upgrade");
                      }}
                      className="bg-yellow-500 text-black font-semibold rounded-md py-2 mt-3 w-full hover:bg-yellow-400 transition"
                    >
                      Nâng cấp ngay ⬆
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-[#222] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm">
                      💰 <span>Số dư</span>
                    </div>
                    <span className="font-bold">0 R</span>
                  </div>

                 <ul className="py-2 text-sm">
  <li>
    <Link
      to="/favorites"
      onClick={() => setShowDropdown(false)}
      className="block px-4 py-2 hover:bg-gray-700 transition flex items-center gap-2 no-underline text-white"
    >
      ❤️ Yêu thích
    </Link>
  </li>

  

  <li>
    <Link
      to="/continue-watching"
      onClick={() => setShowDropdown(false)}
      className="block px-4 py-2 hover:bg-gray-700 transition flex items-center gap-2 no-underline text-white"
    >
      ⏱ Xem tiếp
    </Link>
  </li>

  <li>
    <Link
      to="/user"
      onClick={() => setShowDropdown(false)}
      className="block px-4 py-2 hover:bg-gray-700 transition flex items-center gap-2 no-underline text-white"
    >
      👤 Tài khoản
    </Link>
  </li>
</ul>


                  <div className="border-t border-gray-700">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 w-full px-4 py-2 hover:bg-gray-800 transition"
                    >
                      🚪 Thoát
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-white hover:text-yellow-500 font-medium no-underline"
          >
            Đăng Nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
