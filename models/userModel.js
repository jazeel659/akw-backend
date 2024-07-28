const { string } = require('joi');
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name: {type:String, required:true},
    password: {type:String, required:true},
    email: { 
        type: String, 
        required: true, 
        unique: true // Ensure email is unique
      },
      is_admin:{
        type: Boolean,
        default: false 
      },
      img_access: {
        type: String,
        enum: ['full', 'self', null], 
        default: 'full',
        required: true
      },
      img_edit: {
        type: String,
        enum: ['full', 'self', null], 
        default: 'self',
        required: true
      },
      img_delete: {
        type: String,
        enum: ['full', 'self', null], 
        default: 'self',
        required: true
      },
    // phone: {type:String, required:true},
    // address: {type:String, required:true},
    // role: {type:String, required:true, default:'user'}
})
module.exports=mongoose.model('User', userSchema)
