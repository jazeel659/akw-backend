const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const { addTokenToBlacklist, isTokenBlacklisted }=require('../tokenBlacklist')

class UserController {
  constructor({ userService,addTokenToBlacklist, isTokenBlacklisted }) {
    this.userService = userService
    this.addTokenToBlacklist=addTokenToBlacklist
    this.isTokenBlacklisted=isTokenBlacklisted
  }

  

getUsers = async (req, res) => {
  try {
    if (!req.user.role.isAdmin) {
      res.status(200).json({ message: "restricted" });
      return;
    }
    const row = await this.userService.getUsersService();
    if (!row) {
      res.status(200).json({ message: "User not found" });
    }
    res.status(200).json({ message: "success", status: "ok", data: row });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

loginUser = async (req, res, next) => {
  //    throw new Error(`Could not`)

  const { email, password } = req.body;
  const user = await this.userService.getUserByEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    // for dummy used directly jwt expiry
    const refreshToken = jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res
      .status(200)
      .json({
        status: "ok",
        token,
        refreshToken,
        isAdmin: user.is_admin,
        img_access: user.img_access,
        img_edit: user.img_edit,
        img_delete: user.img_delete,
      });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
 registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log(email, password, name);
    const hashed = await bcrypt.hash(req.body.password, 10);

    const data = await this.userService.createUserService({
      email: email,
      password: hashed,
      name: name,
    });
    console.log(data);
    res.status(200).json({ message: "success user registerd", status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
 changeRole = async (req, res) => {
  const { user_id, role_type, role } = req.body;
  try {
    const user = await this.userService.changeRoleService(user_id, role_type, role);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ message: "Role changed successfully", status: "ok", data: user });
  } catch (error) {
    console.log(error);
  }
};
 refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({ message: "Token not provided" });
    }
    if(this.isTokenBlacklisted(refreshToken)){
      return res.status(403).json({ message: "Token blacklisted" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Token expired" });
    }
    const user = await this.userService.changeRoleService(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign(
      {
        user: {
          id: user._id,
          username: user.name,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.status(200).json({ status: "ok", token });
  } catch (e) {
    console.log(e,'error');
    res.status(500).json({ status: "cannot authorize" });
  }
};

 logOutUser = async(req,response)=>{

  try {
const token =req.body.access_token
    const refreshToken = req.body.refresh_token
   this.addTokenToBlacklist(token);
    this.addTokenToBlacklist(refreshToken);
    response.status(200).json({message: 'Sucessfully logged Out',status: 'ok'});
  } catch (error) {
    throw new Error(error.message)
  }
    
}



}

module.exports = UserController;










// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const {
//   getUsersService,
//   getUserByEmail,
//   createUserService,
//   changeRoleService,
// } = require("../Services/userService");
// const { addTokenToBlacklist, isTokenBlacklisted }=require("../tokenBlacklist")

// const getUsers = async (req, res) => {
//   try {
//     if (!req.user.role.isAdmin) {
//       res.status(200).json({ message: "restricted" });
//       return;
//     }
//     const row = await getUsersService();
//     if (!row) {
//       res.status(200).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "success", status: "ok", data: row });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const loginUser = async (req, res, next) => {
//   //    throw new Error(`Could not`)

//   const { email, password } = req.body;
//   const user = await getUserByEmail(email);
//   if (user && (await bcrypt.compare(password, user.password))) {
//     const token = jwt.sign(
//       {
//         user: {
//           id: user.id,
//           username: user.username,
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "1m" }
//     );
//     const refreshToken = jwt.sign(
//       {
//         user: {
//           id: user.id,
//         },
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: "1d" }
//     );
//     res
//       .status(200)
//       .json({
//         status: "ok",
//         token,
//         refreshToken,
//         isAdmin: user.is_admin,
//         img_access: user.img_access,
//         img_edit: user.img_edit,
//         img_delete: user.img_delete,
//       });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// };
// const registerUser = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;
//     console.log(email, password, name);
//     const hashed = await bcrypt.hash(req.body.password, 10);

//     const data = await createUserService({
//       email: email,
//       password: hashed,
//       name: name,
//     });
//     console.log(data);
//     res.status(200).json({ message: "success user registerd", status: "ok" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// const changeRole = async (req, res) => {
//   const { user_id, role_type, role } = req.body;
//   try {
//     const user = await changeRoleService(user_id, role_type, role);
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }
//     res
//       .status(200)
//       .json({ message: "Role changed successfully", status: "ok", data: user });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const refreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.body.refreshToken;
//     if (!refreshToken) {
//       return res.status(403).json({ message: "Token not provided" });
//     }
//     if(isTokenBlacklisted(refreshToken)){
//       return res.status(403).json({ message: "Token blacklisted" });
//     }
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     if (!decoded) {
//       return res.status(403).json({ message: "Token expired" });
//     }
//     const user = await changeRoleService(decoded.user.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const token = jwt.sign(
//       {
//         user: {
//           id: user._id,
//           username: user.name,
//         },
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "1m" }
//     );
//     res.status(200).json({ status: "ok", token });
//   } catch (e) {
//     res.status(500).json({ status: "cannot authorize" });
//   }
// };

// const logOutUser = async(req,response)=>{

//   try {
// const token =req.body.access_token
//     const refreshToken = req.body.refresh_token
//     addTokenToBlacklist(token);
//     addTokenToBlacklist(refreshToken);
//     response.status(200).json({message: 'Sucessfully logged Out',status: 'ok'});
//   } catch (error) {
//     throw new Error(error.message)
//   }
    
// }

// module.exports = {
//   getUsers,
//   loginUser,
//   registerUser,
//   changeRole,
//   refreshToken,
//   logOutUser

// };
