const { string } = require('joi');
const mongoose=require('mongoose');

const imageSchema=mongoose.Schema({
     filename: {type:String, required:true},
        path: {type:String, required:true},
        mimetype: {type:String, required:true},
        size: {type:String, required:true},
        label: {type:String},
        uploaded_by:{
            type:String, 
            required:true
        }
      
    // phone: {type:String, required:true},
    // address: {type:String, required:true},
    // role: {type:String, required:true, default:'user'}
})
module.exports=mongoose.model('Image', imageSchema)
