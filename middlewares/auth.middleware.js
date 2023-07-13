var jwt = require('jsonwebtoken');

 const auth=(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if (token){
        try{
        const decoded= jwt.verify(token,"masai")
        if (decoded){
         
            next()
        }else{
            res.send("Not authorized")
        }
        }
        catch(err){
        res.send(err.message)
        }
    }
}
module.exports={auth}