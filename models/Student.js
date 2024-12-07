// models/Student.js
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  birthDate: { type: Date, required: true },
  institution: { type: String, required: true },
  course: { type: String, required: true },
  issuer: { type: String, required: true },
  validity: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  profilePicture: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Student", StudentSchema);