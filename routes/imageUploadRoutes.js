const express = require("express");
// * Note: This is my first experience working with dependency injection (DI).
// * I have applied DI in this project, specifically focusing on the user flow.
// * I am still learning about DI best practices and how to apply it effectively.
module.exports = ({ imageController,verifyToken  }) => {

const router = express.Router();

router.post("/", verifyToken, (req, res) => imageController.imageUpload(req, res));
router.post("/images", verifyToken, (req, res) => imageController.getImages(req, res));
router.get("/:id",(req, res) => imageController.getImage(req, res));
router.post("/delete", verifyToken,(req, res) => imageController.deleteImage(req, res));
return router
}
