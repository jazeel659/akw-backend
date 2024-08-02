
class imageService {
  constructor({imageModel}) {
   this.Image = imageModel
  }

imageUploadService = async (
  files,
  key,
  lastSegment,
  labels,
  req,
  path,
  fileName
) => {
  try {
    
    const data = await this.Image.create({
      filename: files[key].name,
      path: path.join(
        `http://localhost:${process.env.port}/static`,
        `/${lastSegment}`
      ),
      mimetype: files[key].mimetype,
      size: files[key].size,
      label: labels["label" + key.split("image")[1]],
      uploaded_by: req.user.user.id,
      filename: fileName
    })
    
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

getImageService = async (options) => {
  try {
    const images = await this.Image.find(options);

    return images;
  } catch (error) {
    throw new Error(error);
  }
};
deleteImageService = async (options) => {
  try {
    const data = await this.Image.deleteOne(options);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
}
module.exports = imageService
