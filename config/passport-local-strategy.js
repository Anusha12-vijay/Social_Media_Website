const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  async function(email, password, done) {
    try {
      // Use async/await for findOne
      const user = await User.findOne({ email: email }).exec();
      if (!user || user.password !== password) {
        console.log('Invalid Username/Password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user');
      return done(err);
    }
  }
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialization
passport.deserializeUser(async function(id, done) {
  try {
    // Use async/await for findById
    const user = await User.findById(id).exec();
    if (!user) {
      console.log('User not found');
      return done(new Error('User not found'));
    }
    return done(null, user);
  } catch (err) {
    console.log('Error in finding user');
    return done(err);
  }
});


//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  //if the user is not signed in
  return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
  if(res.isAuthenticated()){
    //re.user contains the current signed in user from the session and we just sending it to locals for the views
    
    res.locals.user=req.user;
  }
  next();
}








module.exports = passport;
