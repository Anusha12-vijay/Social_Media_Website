const express= require('express');
const cookieParser =require('cookie-parser')
const app=express();
const port= 8000;
const expressLayouts =require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up views engine

app.set('view engine','ejs');
app.set('views','./views');
// use express-ejs-layout


//mongo store is used to store the session cookie in db
app.use(session({
    name:'socialnet',
    //todo change the secret before deployment
    secret:'babablacksheep',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/socialnet_db',
        collectionName: 'sessions',
        autoRemove: 'disabled'
    }).on('error', function(err) {
        console.log('Connect-Mongo Error:', err);

    // function(err){
    //     console.log(err || 'connect-mongodb setup ok');
    // }

})

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));






app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port:${port}`);

});


