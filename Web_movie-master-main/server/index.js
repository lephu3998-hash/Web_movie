const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

// ========================
//  Kết nối MongoDB
// ========================
mongoose
  .connect("mongodb://localhost:27017/employee")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect MongoDB:", err));

// ========================
//  Đăng ký
// ========================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await EmployeeModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const employee = await EmployeeModel.create({ name, email, password, favorites: [] });
    res.json({ message: "User created successfully", user: employee });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Failed to create user", details: err.message });
  }
});

// ========================
//  Đăng nhập
// ========================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Internal server error", details: err.message });
  }
});

// ========================
//  Favorites API
// ========================

// Lấy danh sách yêu thích
app.get("/favorites/:userId", async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ message: "Error fetching favorites", details: err.message });
  }
});

// Thêm phim vào yêu thích
app.post("/favorites/:userId", async (req, res) => {
  try {
    const { movie } = req.body;
    const user = await EmployeeModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exists = user.favorites.find((fav) => fav.id === movie.id);
    if (!exists) {
      user.favorites.push(movie);
      await user.save();
    }

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Error adding favorite", details: err.message });
  }
});

// Xóa phim khỏi yêu thích
app.delete("/favorites/:userId/:movieId", async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const user = await EmployeeModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favorites = user.favorites.filter((fav) => fav.id !== movieId);
    await user.save();

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Error removing favorite", details: err.message });
  }
});

// ========================
//  Start server
// ========================
const PORT = 4000; // bạn có thể đổi sang 3000, 4000, ...
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
