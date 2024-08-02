const { createContainer, asClass, asValue, asFunction } = require('awilix');
const UserService = require('./services/userService');
const UserController = require('./Controllers/userController');
const ImageController=require('./Controllers/imageController');
const Image=require('./models/ImageModel')
const ImageService=require('./Services/imageService')
const userRoutes = require('./routes/userRoutes');
const verifyToken=require('./middleware/verifyToken')
const User = require('./models/userModel'); 
const container = createContainer();
const { addTokenToBlacklist, isTokenBlacklisted }=require('./tokenBlacklist');
const imageUploadRoutes = require('./routes/imageUploadRoutes');


container.register({
  userService: asClass(UserService).singleton(),
  imageUploadRoutes: asFunction(imageUploadRoutes).singleton(),

  imageService: asClass(ImageService).singleton(),
  userController: asClass(UserController).singleton(),
  imageController: asClass(ImageController).singleton(),
  userRoutes: asFunction(userRoutes).singleton(),
  verifyToken: asValue(verifyToken),
  userModel: asValue(User),
  imageModel: asValue(Image),
  isTokenBlacklisted: asValue(addTokenToBlacklist),
  addTokenToBlacklist: asValue(isTokenBlacklisted),
  
  

});

module.exports = container;
