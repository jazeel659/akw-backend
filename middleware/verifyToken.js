const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const {
  addTokenToBlacklist,
  isTokenBlacklisted,
} = require("../tokenBlacklist");

const jwt = require("jsonwebtoken");

const verifyToken = expressAsyncHandler(async (req, res, next) => {
  let authHeader = req.headers.authorization || req.headers.Authorization;
  let userData;
  if (authHeader && authHeader.startsWith("Bearer")) {
    if (isTokenBlacklisted(authHeader)) {
      res.status(401).json({ message: "token expired" });
      return;
    }
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
      if (err) {
        console.log("verifyTokenerrf", err);

        res.status(401).json({ message: "not authorized" });
        throw new Error("jwt expired")
      }

      req.user = decodedUser;
      userData = decodedUser;
    });
    const user = await User.findOne({ _id: userData?.user?.id });
    req.user.role = {
      isAdmin: user?.is_admin,
      img_access: user?.img_access,
      img_edit: user?.img_edit,
      img_delete: user?.img_delete,
    };
    next();
  } else {
    throw new Error("invalid user");
  }
});
module.exports = verifyToken;
