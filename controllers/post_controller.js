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


module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){

        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}