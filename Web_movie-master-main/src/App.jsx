// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Component/Header";
import Banner from "./Component/Banner";
import List from "./Component/List";
import MovieSearch from "./Component/MovieSearch";
import Footer from "./Component/Footer";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import About from "./Component/About";
import { MovieProvider } from "./context/MovieDetailContext";
import { UserProvider, UserContext } from "./context/UserContext";
import Notification from "./Component/Notification";
import UserProfile from "./Component/UserProfile";
import MovieListPage from "./pages/MovieListPage";
import SchedulePage from "./pages/SchedulePage";
import MovieDetail from "./pages/MovieDetail";
import Topics from "./pages/Topics";
import TopicMovies from "./pages/TopicMovies";
import MovieByCountry from "./pages/MovieByCountry";
import TheLoaiPage from "./pages/TheLoaiPage";
import UpgradePage from "./pages/UpgradePage";
import SkeletonList from "./Component/SkeletonList";
import FavoriteList from "./Component/FavoriteList";
import History from "./Component/History";
import Notifications from "./pages/Notifications";
// Hiển thị lỗi
const ErrorDisplay = ({ message }) => (
  <div className="error-message text-center text-red-500 py-2">
    {message}
  </div>
);

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const IMG_BASE_URL = import.meta.env.VITE_IMG_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Search
  const handleSearch = async (value) => {
    setLoading(true);
    if (!value) {
      setSearchData([]);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch search results");
      const data = await res.json();
      setSearchData(data.results || []);
    } catch (err) {
      setError("Lỗi khi tìm kiếm phim. Vui lòng thử lại!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const urls = [
          `https://api.themoviedb.org/3/trending/movie/day?language=vi`,
          `https://api.themoviedb.org/3/movie/top_rated?language=vi`,
          `https://api.themoviedb.org/3/movie/upcoming?language=vi`,
          `https://api.themoviedb.org/3/movie/popular?language=vi`,
          `https://api.themoviedb.org/3/movie/now_playing?language=vi`,
          `https://api.themoviedb.org/3/genre/movie/list?language=vi`,
        ];
        const options = {
          method: "GET",
          headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
        };
        const responses = await Promise.all(
          urls.map((url) => fetch(url, options).then((r) => r.json()))
        );

        setTrendingMovies(responses[0]?.results || []);
        setTopRatedMovies(responses[1]?.results || []);
        setUpcomingMovies(responses[2]?.results || []);
        setPopularMovies(responses[3]?.results || []);
        setNowPlayingMovies(responses[4]?.results || []);
        setCategories(responses[5]?.genres || []);
      } catch (err) {
        setError("Không thể tải dữ liệu phim. Vui lòng thử lại!");
        console.error(err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <UserProvider>
      <MovieProvider>
        <Router>
          <div className="h-full bg-black text-white min-h-screen pb-10 relative">
            {error && <ErrorDisplay message={error} />}

            {/* Header */}
            <Header onSearch={handleSearch} />

            {/* Navbar */}
            <nav className="text-white text-lg font-bold flex gap-6 px-6 py-2">
              <Link to="/" className="flex items-center gap-2 hover:text-yellow-500">
                <img
                  src="/Black and Yellow Cinema Logo.png"
                  alt="Busi"
                  className="w-8 h-8"
                />
                <span>Busi</span>
              </Link>
              <Link to="/" className="hover:text-yellow-500">Trang chủ</Link>
              <Link to="/about" className="hover:text-yellow-500">Giới thiệu</Link>
              <Link to="/phim-le" className="hover:text-yellow-500">Phim Lẻ</Link>
              <Link to="/phim-bo" className="hover:text-yellow-500">Phim Bộ</Link>
              <Link to="/the-loai/28" className="hover:text-yellow-500">Hành Động</Link>
              <Link to="/the-loai/35" className="hover:text-yellow-500">Hài</Link>
              <Link to="/lich-chieu" className="hover:text-yellow-500">Lịch chiếu</Link>
              <Link to="/favorites" className="hover:text-yellow-500">Yêu thích</Link>
              <UserContext.Consumer>
                {({ userName, setUserName, setUserAvatar }) =>
                  userName ? (
                    <>
                      <Link to="/user" className="hover:text-yellow-500">Tài khoản</Link>
                      <button
                        onClick={() => {
                          setUserName("");
                          setUserAvatar("");
                          localStorage.clear();
                        }}
                        className="hover:text-yellow-500"
                      >
                        Đăng Xuất
                      </button>
                    </>
                  ) : (
                    <Link to="/login" className="hover:text-yellow-500">Đăng nhập</Link>
                  )
                }
              </UserContext.Consumer>
            </nav>

            {/* Routes */}
            <Routes>
              <Route path="/favorites" element={<FavoriteList />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/lich-chieu" element={<SchedulePage />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/topic/:id" element={<TopicMovies />} />
              <Route path="/the-loai" element={<TheLoaiPage />} />
              <Route path="/phim-le" element={<MovieListPage type="movie" />} />
              <Route path="/phim-bo" element={<MovieListPage type="tv" />} />
              <Route path="/the-loai/:id" element={<MovieListPage type="genre" />} />
              <Route path="/quoc-gia/:id" element={<MovieByCountry />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/upgrade" element={<UpgradePage />} />
              <Route path="/skeleton" element={<SkeletonList title="Phim Hot" />} />
              <Route path="/history" element={<History />} />
                <Route path="/notifications" element={<Notifications />} />
              <Route
                path="/user"
                element={
                  <UserContext.Consumer>
                    {({ userName }) =>
                      userName ? <UserProfile /> : <Navigate to="/login" replace />
                    }
                  </UserContext.Consumer>
                }
              />

              {/* Trang chủ */}
              <Route
                path="/"
                element={
                  <>
                    <Notification
                      repeatHours={Number(import.meta.env.VITE_NOTIFICATION_HOURS) || 24}
                    />
                    <Banner />
                    {searchData.length === 0 ? (
                      <>
                        {loading ? (
                          <>
                            <SkeletonList title="Phim Hot" />
                            <SkeletonList title="Phim Đề Cử" />
                            <SkeletonList title="Sắp Chiếu" />
                            <SkeletonList title="Phim Phổ Biến" />
                            <SkeletonList title="Đang Chiếu" />
                          </>
                        ) : (
                          <>
                            <List
                              title="Phim Hot"
                              data={trendingMovies.slice(0, 10)}
                              imgBaseUrl={IMG_BASE_URL}
                            />
                            <List
                              title="Phim Đề Cử"
                              data={topRatedMovies.slice(0, 10)}
                              imgBaseUrl={IMG_BASE_URL}
                            />
                            <List
                              title="Sắp Chiếu"
                              data={upcomingMovies.slice(0, 10)}
                              imgBaseUrl={IMG_BASE_URL}
                            />
                            <List
                              title="Phim Phổ Biến"
                              data={popularMovies.slice(0, 10)}
                              imgBaseUrl={IMG_BASE_URL}
                            />
                            <List
                              title="Đang Chiếu"
                              data={nowPlayingMovies.slice(0, 10)}
                              imgBaseUrl={IMG_BASE_URL}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <MovieSearch data={searchData} imgBaseUrl={IMG_BASE_URL} />
                    )}
                  </>
                }
              />
            </Routes>

            <Footer />
          </div>
        </Router>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;
