const Post = require('../models/posts');
const Comment=require('../models/comment')

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


module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            // await post.remove();
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({ post: req.params.id });
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleting post:', err);
        return res.redirect('back');
    }
}

