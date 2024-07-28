const express = require("express");
// * Note: This is my first experience working with dependency injection (DI).
// * I have applied DI in this project, specifically focusing on the user flow.
// * I am still learning about DI best practices and how to apply it effectively.
const {
  imageUpload,
  getImages,
  getImage,
  deleteImage,
} = require("../Controllers/imageController");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, imageUpload);
router.post("/images", verifyToken, getImages);
router.get("/:id", getImage);
router.post("/delete", verifyToken, deleteImage);

module.exports = router;
