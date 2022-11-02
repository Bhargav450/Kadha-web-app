const express=require('express');
const path=require('path');
const dotenv=require('dotenv');
const createHttpError=require('http-errors');
const morgan=require('morgan');
const mongoose=require('mongoose');
const connectDB=require('./config/db');
const exbs = require('express-handlebars');
const passport=require('passport');
const session=require('express-session');
const MongoStore = require('connect-mongo');

//load config 
dotenv.config({ path: './config/config.env' });

//passport config
require('./config/passport')(passport);

connectDB();

const app=express();

const PORT=process.env.PORT || 3000;
//logging
if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));//to know on which router we are hitting 
    }

// Handlebars
app.engine('hbs', exbs.engine({
  defaultView: 'main',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

//sessions
//sessions shuld be above passsport
app.use(session({
    secret: 'keyboard cat',
    resave: false,//resave session if nothing is modified
    saveUninitialized: false,//dnt create session untill something is stored
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
    //cookie: { secure: true }
  }))


//passport middleware
app.use(passport.initialize()); 
app.use(passport.session());



//static folder
app.use(express.static(path.join(__dirname,'public')));

//json
app.use(express.json());


//Routes 
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));

app.use((req,res,next)=>
{
    next(createHttpError.NotFound());
});//all routes coming here which're not handled by our app

app.use((err,req,res,next)=>{
    err.status=err.status || 500;
    res.status(err.status);
    res.send(err); 
});//set error which comes from above status 

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `);
}); 