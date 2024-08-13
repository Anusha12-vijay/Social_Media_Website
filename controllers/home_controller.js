const Post = require('../models/posts');

module.exports.home = async function(req, res) {
    try {
        // Fetch posts and populate the user field
        const posts = await Post.find({})
            .populate('user') // Populate the user field for each post
            .populate({
                path: 'comments', // Populate the comments field
                populate: {
                    path: 'user' // Populate the user field within each comment
                }
            })
            .exec();
        
        // Render the home view with the fetched posts
        return res.render('home', {
            title: "SocialNet/Home",
            posts: posts
        });
    } catch (err) {
        console.log('Error in fetching posts:', err);
        // Optionally, render an error view or redirect to an error page
        return res.redirect('back');
    }
};
