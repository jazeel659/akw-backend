const Joi=require("joi");
const userSchema=Joi.object({
    name: Joi.string(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
,
    password: Joi.string(),

})
const userValidator=(req,res,next) =>{
console.log('okkk');
    userSchema.validate(req.body)
    next()

}


module.exports=userValidator;