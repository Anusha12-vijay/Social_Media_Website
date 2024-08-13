const Post = require('../models/posts');

module.exports.home = async function(req, res) {
    try {
        // Fetch posts and populate the user field
        const posts = await Post.find({}).populate('user').exec();
        
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


// try {
//     const posts = await Post.find({});
//     return res.render('home', {
//         title: "Home",
//         posts: posts
//     });
// } catch (err) {
//     console.log('Error in fetching posts:', err);
//     // Optionally, render an error view or redirect to an error page
//     return res.redirect('back');
// }