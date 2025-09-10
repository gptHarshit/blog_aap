const express = require('express');

const postRouter = express.Router();

const Post = require("../models/Post");

postRouter.post('/',async (req,res) => {
    try {
        const {title ,content, author,tags} = req.body;
        if(!title){
            throw new Error("Title is required");
        }
        if(!content || content.length < 20){
            throw new Error("Content is required and should be of minimum 20 length");
        }

        const post = new Post({title,content,author,tags});
        const postsaved = await post.save();
       // console.log(postsaved);
        res.status(201).json(post);

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

postRouter.get('/',async (req,res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
       // console.log(posts);
    } catch (error) {
        res.status(400).send("Post not found");
    }
});

postRouter.get('/:id', async (req, res) => {
try {
    const IsAvaible = await Post.findById(req.params.id);
    if(!IsAvaible){
        throw new Error("This post is not avaible"); 
    }
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(404).send("ERRROR : " + err.message);
  }
});



postRouter.delete('/:id', async (req, res) => {
try {
    const IsAvaible = await Post.findById(req.params.id);
    if(!IsAvaible){
        throw new Error("This post is not avaible"); 
    }
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted Successfully' });
} catch (err) {
    console.error(err);
    res.status(404).send("ERRROR : " + err.message);
}
});


module.exports = postRouter;





