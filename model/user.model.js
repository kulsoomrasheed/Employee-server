const mongoose= require('mongoose')
const userSchema=mongoose.Schema({
    email:String,
    pass:String,
    confirmPass:String,

},{
    versionKey:false}
    )
    const UserModel=mongoose.model('User',userSchema)


    const employeeSchema=mongoose.Schema({
        firstName:String,
        lastName:String,
        email:String,
        department:String,
        salary:Number,

    },{
        versionKey:false}
        )
        const EmployeeModel=mongoose.model('Employee',employeeSchema)
        module.exports={
            UserModel,EmployeeModel
        }