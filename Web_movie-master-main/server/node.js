import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password, cfToken } = req.body;

  // Xác minh token với Cloudflare
  const verifyURL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const response = await axios.post(
    verifyURL,
    new URLSearchParams({
      secret: "YOUR_SECRET_KEY", // secret key từ Cloudflare
      response: cfToken,
    })
  );

  if (!response.data.success) {
    return res.status(400).json({ message: "CAPTCHA không hợp lệ" });
  }

  // TODO: Xử lý logic đăng nhập ở đây (check email + password DB)
  if (email === "test@gmail.com" && password === "123456") {
    return res.json({ message: "Login successful", user: { name: "Test" } });
  } else {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }
});
