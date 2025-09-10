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
        console.log(postsaved);
        res.status(201).json(post);

    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
});

module.exports = postRouter;