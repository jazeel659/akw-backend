class userService {
  constructor({userModel}) {
   this.userModel = userModel
  }
   getUsersService = async () => {
    try {
      const row = await  this.userModel.find({}, { password: 0 });
      return row;
    } catch (e) {
      throw new Error(e);
    }
  };
  
   createUserService = async (args) => {
    try {
      const data = await  this.userModel.create(args);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };
   getUserByEmail = async (email) => {
    try {
      const user = await  this.userModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
  
   changeRoleService = async (user_id, role_type, role) => {
    try {
      const update = { [role_type]: role };
  
      const user = await  this.userModel.findByIdAndUpdate(user_id, update, { new: true });
  
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  

  
}

module.exports = userService;








// const User = require("../Model/userModel.js");
// const getUsersService = async () => {
//   try {
//     const row = await User.find({}, { password: 0 });
//     return row;
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// const createUserService = async (args) => {
//   try {
//     const data = await User.create(args);
//     return data;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
// const getUserByEmail = async (email) => {
//   try {
//     const user = await User.findOne({ email: email });
//     return user;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const changeRoleService = async (user_id, role_type, role) => {
//   try {
//     const update = { [role_type]: role };

//     const user = await User.findByIdAndUpdate(user_id, update, { new: true });

//     return user;
//   } catch (error) {
//     throw new Error(error);
//   }
// };


// module.exports = {
//   getUsersService,
//   createUserService,
//   getUserByEmail,
//   changeRoleService,
// };
