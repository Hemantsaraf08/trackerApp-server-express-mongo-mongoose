const jwt=require('jsonwebtoken');
const mongoose=require('mongoose')
const User=mongoose.model('User');
module.exports=async (req, res, next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).send('User must be logged in!')
    }
    let token = authorization.replace('Bearer ', '');
    try{
        let decoded = jwt.verify(token, 'shhhhh');
        let userId=decoded.userId
        try{
            var user=await User.findOne({ _id: userId });
        }catch(e){
            console.log(e)
        }
        req.user=user;
        next();
    }catch(e){
        console.log(e)
        res.status(401).send('User must be logged in!')
    }

}