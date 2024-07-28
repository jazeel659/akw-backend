const { string } = require('joi');
const mongoose=require('mongoose');


// Define the schema for images
const roleSchema = new mongoose.Schema({
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
  // Optional fields (can be uncommented as needed)
  // phone: {
  //   type: String,
  //   required: true
  // },
  // address: {
  //   type: String,
  //   required: true
  // },
  // role: {
  //   type: String,
  //   required: true,
  //   default: 'user'
  // }
});

// Create a model using the schema


module.exports=mongoose.model('Role', roleSchema)
