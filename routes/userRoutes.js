const express = require('express');

module.exports = ({ userController,verifyToken  }) => {
  const router = express.Router();

  router.get('/user', (req, res) => userController.getUser(req, res));
  router.get("/", verifyToken, (req, res) => userController.getUsers(req, res));


router.post("/login", (req, res) => userController.loginUser(req, res))
router.post("/register", (req, res) => userController.registerUser(req, res))
router.post("/role",verifyToken, (req, res) => userController.changeRole(req, res))
router.post("/refreshToken", (req, res) => userController.refreshToken(req, res))
router.post("/logout", (req, res) => userController.logOutUser(req, res))
  

  return router;
};






// const express=require('express');
// const {getUsers,loginUser,registerUser,changeRole,refreshToken,logOutUser}=require('../Controller/userController')
// const verifyToken=require('../middleware/verifyToken')
// const router=express.Router();


// router.get("/", verifyToken,getUsers);


// router.post("/login",loginUser)
// router.post("/register",registerUser)
// router.post("/role",verifyToken,changeRole)
// router.post("/refreshToken",refreshToken)
// router.post("/logout",logOutUser)
  


// module.exports=router