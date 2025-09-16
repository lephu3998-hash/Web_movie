import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      if (result.data.message === "Login successful") {
        localStorage.setItem("userName", result.data.user.name);
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Đăng nhập thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        setError(result.data.message || "Đăng nhập thất bại.");
      }
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng thử lại!");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-[#1a1a40] text-white p-8 rounded-xl shadow-lg w-[400px] relative">
        {/* Nút đóng */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
          onClick={() => navigate("/")} // ví dụ: quay về home khi đóng
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

        {error && (
          <div className="bg-red-500 text-white text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 px-3 py-2 rounded bg-[#2a2a50] text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full mb-3 px-3 py-2 rounded bg-[#2a2a50] text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Cloudflare Captcha giả lập */}
          <div className="bg-[#0f0f2b] border border-gray-700 rounded py-3 px-2 mb-4 text-sm flex items-center justify-center">
            <span>Đang xác minh... Cloudflare</span>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition"
          >
            Đăng nhập
          </button>
        </form>

        <button className="w-full mt-3 border border-gray-500 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#2a2a50] transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Đăng nhập bằng Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-300">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-yellow-400 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginModal;
