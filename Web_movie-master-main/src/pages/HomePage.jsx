// src/pages/Home.jsx
import { useEffect, useState } from "react";
import List from "../Component/List";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [japan, setJapan] = useState([]);
  const [thai, setThai] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [hongkong, setHongkong] = useState([]);
  const [romanceUs, setRomanceUs] = useState([]);
  const [disney, setDisney] = useState([]);

  // 🎯 Thêm state cho các thể loại
  const [action, setAction] = useState([]);
  const [horror, setHorror] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [animation, setAnimation] = useState([]);

  useEffect(() => {
    // Top 10 hôm nay
    fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setTrending(data.results.slice(0, 10)));

    // Nhật mới
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=JP&sort_by=release_date.desc`)
      .then((res) => res.json())
      .then((data) => setJapan(data.results));

    // Thái
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=TH&sort_by=popularity.desc`)
      .then((res) => res.json())
      .then((data) => setThai(data.results));

    // Sắp tới (Upcoming)
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=vi-VN`)
      .then((res) => res.json())
      .then((data) => setUpcoming(data.results));

    // Điện ảnh Hồng Kông
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=HK&sort_by=popularity.desc`)
      .then((res) => res.json())
      .then((data) => setHongkong(data.results));

    // Yêu kiểu Mỹ (Romance US)
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749&with_origin_country=US&sort_by=popularity.desc`)
      .then((res) => res.json())
      .then((data) => setRomanceUs(data.results));

    // Disney
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_companies=2&sort_by=release_date.asc`)
      .then((res) => res.json())
      .then((data) => setDisney(data.results));

    // 🎯 Action (genre 28)
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=popularity.desc`)
      .then((res) => res.json())
      .then((data) => setAction(data.results));

    // 🎯 Horror (genre 27)
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=popularity.desc`)
      .then((res) => res.json())
      .then((data) => setHorror(data.results));

    // 🎯 Comedy (genre 35)
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&sort_by=popularity.desc`)
      .then((res) => res.json())
      .then((data) => setComedy(data.results));

    // 🎯 Animation (genre 16)
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`)
      .then((res) => res.json())
      .then((data) => setAnimation(data.results));

  }, []);

  return (
    <div className="bg-black min-h-screen">
      <List title="Top 10 phim hôm nay" data={trending} type="movie" />
      <List title="Phim Nhật mới" data={japan} type="movie" />
      <List title="Phim Thái" data={thai} type="movie" />
      <List title="Phim sắp tới trên Busi" data={upcoming} type="movie" />
      <List title="Điện ảnh Hồng Kông" data={hongkong} type="movie" />
      <List title="Yêu kiểu Mỹ" data={romanceUs} type="movie" />
      <List title="Disney của ngày xưa" data={disney} type="movie" />

      {/* 🎬 Thể loại mới */}
      <List title="Phim Hành Động" data={action} type="movie" />
      <List title="Phim Kinh Dị" data={horror} type="movie" />
      <List title="Phim Hài" data={comedy} type="movie" />
      <List title="Phim Hoạt Hình" data={animation} type="movie" />
    </div>
  );
};

export default Home;
