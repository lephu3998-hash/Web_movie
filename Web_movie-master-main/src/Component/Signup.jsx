// src/Component/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:4000/register", { name, email, password });
      
      if (result.data.message === "User registered successfully") {
        toast.success("Đăng ký thành công!", {
          position: "top-center"
        });
        // Sau khi đăng ký thành công, điều hướng người dùng tới trang đăng nhập
        setTimeout(() => {
          navigate("/login");
        }, 1500); // Điều hướng sau 1.5 giây
      } else {
        toast.error(result.data.message || "Đăng ký thất bại.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white p-4">
      {/* Signup Card */}
      <div className="bg-[#1a1a1a] p-8 rounded-lg shadow-2xl w-full max-w-sm border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">Đăng Ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-400 text-sm font-semibold mb-2">
              Họ và Tên
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-400 text-sm font-semibold mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 mb-4"
          >
            Đăng Ký
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm">
          Bạn đã có tài khoản?
        </p>
        <Link
          to="/login"
          className="block w-full text-center text-yellow-500 font-bold py-3 mt-2 rounded-md border border-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors duration-300 no-underline"
        >
          Đăng Nhập
        </Link>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;