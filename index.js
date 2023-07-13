const express= require('express')
const cors= require('cors')
const { connection } = require('./db')
const { userRouter } = require('./routes/user.routes')
const { employeeRouter } = require('./routes/employee.routes')
const app = express()
app.use(cors())
app.get("/",(req,res)=>{
    res.json({msg:"success"})
})
app.use(express.json())
app.use("/users",userRouter)
app.use("/employees",employeeRouter)
app.listen(4000,async()=>{
    try{
        await connection
        console.log("listening on port 4000");

    }catch(e){

    }
})