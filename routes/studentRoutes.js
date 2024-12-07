// routes/studentRoutes.js
const express = require("express");
const multer = require("multer");
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 153600 } });

router
  .route("/")
  .get(protect, getStudents)
  .post(protect, upload.single("profilePicture"), createStudent);
router
  .route("/:id")
  .get(protect, getStudent)
  .put(protect, upload.single("profilePicture"), updateStudent)
  .delete(protect, deleteStudent);

module.exports = router;