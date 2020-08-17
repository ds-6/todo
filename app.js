const express = require('express');
const mongoose = require('mongoose');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5000||process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`)
});

const URI = `mongodb+srv://${process.env.MONGODB_KEY}@todo.m73g9.mongodb.net/todo?retryWrites=true&w=majority`;
mongoose.connect(URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(result=>{
    console.log('Database is connected...');
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
}));

 app.use(passport.initialize());
 app.use(passport.session());app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_KEY]
}));

console.log(path.join(__dirname, 'build', 'index.html'))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
/*app.use('/auth',require('./routes/auth-routes'));
app.use('/todo',require('./routes/todo-routes'));


app.get('/',(req,res)=>{
    res.json('hello');
})*/