// src/Component/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  FaFacebookF, 
  FaTiktok, 
  FaYoutube, 
  FaTelegramPlane, 
  FaInstagram 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 px-4 py-10 sm:px-6 md:px-20 relative">

      {/* Top Section: Logo, Slogan, Hoang Sa & Truong Sa, Social Icons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-700 pb-6 mb-6">

        {/* Logo, Slogan, and Hoang Sa & Truong Sa */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Logo and Slogan */}
          <div className="flex items-center space-x-4">
            <img 
              src="/Black and Yellow Cinema Logo.png" 
              alt="Busi Cinema Logo" 
              className="w-14 h-14 object-contain" 
            />
            <span className="text-lg font-semibold text-white hidden sm:block">
              Xem phim thả ga – Không lo quảng cáo
            </span>
          </div>

          {/* Hoang Sa & Truong Sa */}
          <div className="flex items-center mt-4 md:mt-0">
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold flex items-center gap-2">
              <img 
                src="/vn.png" 
                alt="Vietnam Flag" 
                className="w-5 h-3 rounded-sm border border-white"
              />
              Hoàng Sa & Trường Sa là của Việt Nam!
            </span>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-3 mt-6 md:mt-0">
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-500 hover:text-black transition-colors duration-300">
            <FaFacebookF className="text-xl" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-500 hover:text-black transition-colors duration-300">
            <FaInstagram className="text-xl" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-500 hover:text-black transition-colors duration-300">
            <FaTiktok className="text-xl" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-500 hover:text-black transition-colors duration-300">
            <FaYoutube className="text-xl" />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-yellow-500 hover:text-black transition-colors duration-300">
            <FaTelegramPlane className="text-xl" />
          </a>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-6">
        <Link to="/faq" className="text-gray-400 hover:text-yellow-500 transition-colors no-underline">Hỏi-Đáp</Link>
        <Link to="/privacy" className="text-gray-400 hover:text-yellow-500 transition-colors no-underline">Chính sách bảo mật</Link>
        <Link to="/about" className="text-gray-400 hover:text-yellow-500 transition-colors no-underline">Giới thiệu</Link>
        <Link to="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors no-underline">Liên hệ</Link>
      </div>

      {/* Long Description */}
      <p className="text-sm text-gray-500 mt-6 leading-relaxed">
        Busi Cinema - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
      </p>

      {/* Copyright */}
      <div className="text-center text-gray-600 text-sm mt-6 pt-4 border-t border-gray-700">
        © 2025 Busi - Cinema.
      </div>
    </footer>
  );
}