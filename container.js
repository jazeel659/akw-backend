const { createContainer, asClass, asValue, asFunction } = require('awilix');
const UserService = require('./services/userService');
const UserController = require('./controllers/userController');
const userRoutes = require('./routes/userRoutes');
const verifyToken=require('./middleware/verifyToken')
const User = require('./models/userModel'); 
const container = createContainer();


container.register({
  userService: asClass(UserService).singleton(),
  userController: asClass(UserController).singleton(),
  userRoutes: asFunction(userRoutes).singleton(),
  verifyToken: asValue(verifyToken),
  userModel: asValue(User),
  

});

module.exports = container;
