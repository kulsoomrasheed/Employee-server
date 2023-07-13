const express= require('express')
const { EmployeeModel } = require('../model/user.model')
const { auth } = require('../middlewares/auth.middleware')
const employeeRouter = express.Router()


employeeRouter.get("/",(req,res)=>{
    res.send("Employ")
})
employeeRouter.use(auth)
employeeRouter.post("/",async(req,res)=>{
    const {  firstName,  lastName,email,   department,  salary}= req.body
    try{
    const employee= new EmployeeModel({firstName,  lastName,email,   department,  salary})
    await employee.save()
    res.json({msg:"A new employee has been added"})
    }catch{
        res.json({msg:"Error saving employee"})

    }
})
employeeRouter.patch("/edit/:id",async(req,res)=>{
        let ID=req.params.id
        let payload=req.body
        let data =await EmployeeModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
                 if((userID_post==userID_req)){
                    await EmployeeModel.findByIdAndUpdate({
                     _id:ID
                },payload)
                res.send(`data with ${ID} is updated`)
            }else{
                res.send("Not authorized")
            }
            
        } catch (error) {
            res.send(error)
        }
    })
    employeeRouter.delete("/delete/:id",async(req,res)=>{
        let ID=req.params.id
        let data =await EmployeeModel.findOne({_id:ID})
        let userID_post=data.userID
        let userID_req=req.body.userID
        try {
                 if((userID_post==userID_req)){
                    await EmployeeModel.findByIdAndDelete({
                     _id:ID
                })
                res.send(`data with ${ID} is deleted`)
            }else{
                res.send("Not authorized")
            }
            
        } catch (error) {
            res.send(error)
        }
    })
module.exports={
    employeeRouter
}