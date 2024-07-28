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
        },
        filename: {type:String, required:true},
      
    
})
module.exports=mongoose.model('Image', imageSchema)
