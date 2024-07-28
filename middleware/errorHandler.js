const errorHandler=(err,req,res,next)=>{
    console.log(err);
    res.json({message:err.message,stackrate:err.stack})
}


module.exports=errorHandler