const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');
//require('dotenv').config();

router.post('/add',async (req,res)=>{
    try{
       req.body.done = false;
       req.body.key = mongoose.Types.ObjectId();
        const todo = await new User({todos:req.body}).save();
        console.log(todo);
    }catch(err){
        console.log(err)
    }
})

router.get('/delete/:id',(req,res)=>{
    console.log(req.body);
})

router.post('/update/:id',(req,res)=>{
    console.log(req.body);
})

module.exports = router