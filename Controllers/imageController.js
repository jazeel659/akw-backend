const path = require("path");
const fs = require("fs");
const {
  imageUploadService,
  getImageService,
  deleteImageService,
} = require("../Services/imageService");
const imageUpload = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const files = req.files;
    const labels = req.body;
    const label = req.body.label || "";
    const uploadPath = path.join(__dirname, "../", "public");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    const uploadedFiles = [];
    for (const key in files) {
      const filePath = path.join(
        uploadPath,
        Date.now() + path.extname(files[key].name)
      );
      const fileName=Date.now() + path.extname(files[key].name)
      const dataInside = await new Promise((resolve, reject) => {
        files[key].mv(filePath, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
      const segments = filePath.split("\\");
      console.log(req.user.user.id);
      // Get the last segment from the array
      const lastSegment = segments.pop();
      data = await imageUploadService(
        files,
        key,
        lastSegment,
        labels,
        req,
        path,
        fileName
      );
      uploadedFiles.push(data);
    }
    res.status(200).json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading files", error });
  }
};
const getImages = async (req, res) => {
  console.log(req.user.role.img_access);
  if (req.user.role.img_access == null) {
    res.status(200).json({ message: "restrictrd bt admin" });
    return;
  }
  let options;
  req.user.role.img_access == "full"
    ? (options = {})
    : (options = { uploaded_by: req.user.user.id });
  const images = await getImageService(options);
  res.status(200).json({ status: "ok", data: images });
};

const getImage = async (req, res) => {
  res.status(200)
    .sendFile(path.join(__dirname, "../public", req.params.id));
};
const deleteImage = async (req, res) => {
  let access = req.user.role.img_delete;
  let options = { _id: req.body.id };
  if (access == null) {
    res.status(200).json({ message: "restrictrd b admin" });
    return;
  }
  if (access == "self") {
    options.uploaded_by = req.user.user.id;
  }
  try {
    const data = await deleteImageService(options);
    res.status(200).json({ status: "ok", message: "deleted" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: "filedtodelte" });
  }
};
module.exports = { imageUpload, getImages, getImage, deleteImage };
