const Post = require('../models/posts');

module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        // Redirect back after successfully creating a post
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating a post:', err);
        // Optionally, you can render an error view or redirect to an error page
        return res.redirect('back');
    }
};
