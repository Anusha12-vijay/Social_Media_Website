const User=require('../models/users')


// module.exports.profile=function(req,res){
    module.exports.profile = function(req, res) {
        // Assuming user data is attached to req.user by your authentication middleware
        if (!req.isAuthenticated()) {
            return res.redirect('/users/profile');
        }
        
        // Render the profile page with user data
        return res.render('user_profile', {
            title: 'User Profile',
            user: req.user
        });
    }
    
    // res.end('<h1>User Profile</h1>');

// }

module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"SocialNet | Sign Up"
    })
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"SocialNet | Sign In"
    })
    
}

// get the sign

module.exports.create = async function(req, res) {
    // Check if passwords match
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        // Find the user by email
        let user = await User.findOne({ email: req.body.email });

        // If the user doesn't exist, create a new user
        if (!user) {
            user = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error in finding or creating user during sign up:', err);
        return res.redirect('back');
    }
};


module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error during logout:', err);
            return res.redirect('/'); // Redirect to home or show an error message
        }
        return res.redirect('/'); // Redirect to home after successful logout
    });
};
