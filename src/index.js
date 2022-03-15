const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
require('./Models/Users');
require('./Models/Track')
const authRoutes=require('./Routes/authRoute')
const requireAuth=require('./middlewares/requireAuth');
const trackRoute=require('./Routes/trackRoute')

const app=express();

const PORT=process.env.PORT||3000;

mongoose.connect('mongodb+srv://admin:PasswordPassword@cluster0.kqvjh.mongodb.net/Cluster0?retryWrites=true&w=majority')

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo cluster');
})

mongoose.connection.on('error',(e)=>{
    console.error('error is ',e);
})

app.use(bodyParser.json());

app.use(authRoutes)
app.use(trackRoute)

app.listen(PORT, ()=>{
    console.log('Listening to port: ', PORT);
})

app.get('/',requireAuth, (req, res)=>{
    // console.log(req.user);
    res.send(`Your email id is ${req.user.email}`);
})
