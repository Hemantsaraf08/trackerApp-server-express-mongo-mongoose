const express=require('express')
const mongoose=require('mongoose')
const requireAuth=require('../middlewares/requireAuth');
const TrackModel=mongoose.model('TrackModel')

const trackRoute=express.Router();

trackRoute.use(requireAuth)

trackRoute.get('/tracks', async(req, res)=>{
    const tracks=await TrackModel.find({userId: req.user._id})
    res.send(tracks)
})
trackRoute.post('/tracks', async (req, res)=>{
    //need userId, name and locations Arr

    const {locations, name}=req.body;

    if(!name||!locations) {
        return res.status(422).send({error: 'You must provide name and location'})
    }

    const userId=req.user._id;

    try{
        const track=new TrackModel({name, locations, userId})
        await track.save();
        res.send(track);
    }catch(e){
        res.status(422).send({error: e.message});
        console.log(e)
    }


})
module.exports=trackRoute