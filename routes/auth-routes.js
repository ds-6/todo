const router = require('express').Router();
const passport = require('passport');
//require('dotenv').config();


router.get('/login', (req,res)=>{
    console.log('Login is here');
})

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})

router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req, res)=>{
    res.redirect('/');
})

module.exports =  router;