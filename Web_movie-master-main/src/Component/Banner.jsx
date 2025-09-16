// src/Component/Banner.jsx
import React from "react";
import { Link } from "react-router-dom";
import { GiCakeSlice } from "react-icons/gi"; // Bánh Trung Thu
import IntroVideo from "../assets/intro.mp4";

const Banner = () => {
  return (
    <div className="md:h-[700px] h-[1000px] w-full bg-black relative mt-[75px] overflow-hidden">
      {/* Video nền */}
      <video
        src={IntroVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      ></video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 z-20">
        <div className="md:w-1/2 w-full flex flex-col items-center md:items-start text-center md:text-left p-10 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Khám phá thế giới điện ảnh <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-400">
              Tuyệt vời!
            </span>
          </h1>

         

          <p className="text-white text-lg max-w-md">
            Khám phá thế giới phim trực tuyến hấp dẫn ngay bây giờ!{" "}
            <GiCakeSlice className="inline-block text-3xl text-yellow-400 animate-pulse" />
          </p>

          <div className="flex items-center space-x-5">
            <Link
              to="/about"
              className="py-2 px-4 bg-transparent text-white border-2 border-white rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 no-underline"
            >
              Chi tiết
            </Link>
            <Link
              to="/signup"
              className="py-2 px-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all duration-300 no-underline"
            >
              Xem Phim
            </Link>
          </div>
        </div>

        {/* Decorative Icons */}
        <div className="md:w-1/2 w-full flex items-center justify-center mt-10 md:mt-0 space-x-8">
          {/* Icons removed as per request */}
        </div>
      </div>
    </div>
  );
};

export default Banner;