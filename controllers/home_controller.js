const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = async function(req, res) {
    try {
        // Fetch posts and populate the user and comments fields
        const posts = await Post.find({})
            .populate('user') // Populate the user field for each post
            .populate({
                path: 'comments', // Populate the comments field
                populate: {
                    path: 'user' // Populate the user field within each comment
                }
            });
        
        // Fetch all users
        const users = await User.find({});

        // Render the home view with the fetched posts and users
        return res.render('home', {
            title: "SocialNet/Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log('Error in fetching posts:', err);
        // Optionally, render an error view or redirect to an error page
        return res.redirect('back');
    }
};
