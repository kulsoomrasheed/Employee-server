const express= require('express')
const { UserModel } = require('../model/user.model')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

userRouter.get("/",(req,res)=>{
    res.json({msg:"success"})
})
userRouter.post("/register",(req,res)=>{
    const {email,pass,confirmPass}= req.body
   try{
    if (pass===confirmPass){
 bcrypt.hash(confirmPass,5,async(err,hash)=>{
        if (err){
            res.json({err:err})
        }else{
            const user= new UserModel({email,pass:hash,confirmPass:hash})
            await user.save()
        }
    }) 
       res.json({msg:"User has been registered!!!"})

    }else{
       res.send("Password and Confirm Password does not match")
    }
   


   }catch{
    res.json({err:err.message})

   }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
   const user = await UserModel.findOne({email})
if (user){
    bcrypt.compare(pass,user.pass,(err,result)=>{
        if (result){
            let token = jwt.sign({course:"BE"},"masai")
            res.json({msg:"Login Successful!!!", token})

        }else{
            res.json({msg:"Invalid Credentials"})

        }
    })
}else{
    res.json({msg:"User does not exist"})

}
    }catch(err){
    res.json({err:err.message})
    }
})

module.exports={
    userRouter
}