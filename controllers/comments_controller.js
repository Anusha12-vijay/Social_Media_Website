const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = async function(req, res) {
    try {
        // Find the post by ID
        const post = await Post.findById(req.body.post);
        
        if (post) {
            // Create the comment
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            
            // Push the comment to the post's comments array and save the post
            post.comments.push(comment);
            await post.save();
            
            // Redirect to the home page or another appropriate route
            return res.redirect('/');
        } else {
            // Handle the case where the post is not found
            console.log('Post not found');
            return res.redirect('back');
        }
    } catch (err) {
        // Handle any errors
        console.log('Error in creating comment:', err);
        return res.redirect('back');
    }
};

module.exports.destroy = async function(req, res) {
    try {
        // Find the comment by ID
        let comment = await Comment.findById(req.params.id);

        if (comment.user.equals(req.user.id)) {
            let postId = comment.post;

            // Remove the comment
            await comment.deleteOne();

            // Remove the comment reference from the post
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in deleting comment:', err);
        return res.redirect('back');
    }
}
