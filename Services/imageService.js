const Image = require("../models/ImageModel");

const imageUploadService = async (
  files,
  key,
  lastSegment,
  labels,
  req,
  path
) => {
  try {
    const data = await Image.create({
      filename: files[key].name,
      path: path.join(
        `http://localhost:${process.env.port}/static`,
        `/${lastSegment}`
      ),
      mimetype: files[key].mimetype,
      size: files[key].size,
      label: labels["label" + key.split("image")[1]],
      uploaded_by: req.user.user.id,
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

getImageService = async (options) => {
  try {
    const images = await Image.find(options);

    return images;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteImageService = async (options) => {
  try {
    const data = await Image.deleteOne(options);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { imageUploadService, getImageService, deleteImageService };
