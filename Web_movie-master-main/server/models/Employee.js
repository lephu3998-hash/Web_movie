const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  favorites: [
    {
      id: String, // id phim từ TMDB
      title: String,
      poster_path: String,
      backdrop_path: String,
    },
  ],
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

module.exports = EmployeeModel;
