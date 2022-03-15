const express=require('express')
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const User=mongoose.model('User');

const authRouter=express.Router()


authRouter.post('/signup', async (req, res)=>{
    const {email, password}=req.body
    const user=new User({email,password})
    try{
        await user.save();
        let token = jwt.sign({userId:user._id}, 'shhhhh');
        res.send({token})
    }catch(e){
        return res.status(422).send(e.message)
    }
})

authRouter.post('/signin', async (req,res)=>{
    const {email, password}=req.body;

    if(!email||!password){
        return res.status(422).send({error: "must provide email and password"});
    }
    const user=await User.findOne({email});
    if(!user) return res.status(422).send({error: "Invalid email or password"});

    try{
        console.log(user);
        await user.comparepassword(password);
        let token=jwt.sign({userId: user._id}, 'shhhhh');
        res.send({token});

    }catch(err){
        console.log(err);
        res.status(422).send({error: "Invalid email or password"});
    }
})


module.exports=authRouter;