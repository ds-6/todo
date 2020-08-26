const router = require('express').Router();
const passport = require('passport');
//require('dotenv').config();

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/login');
})

router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req, res)=>{
  var id = req.user._id;
  res.redirect(`/?id=${id}`);
})

module.exports =  router;