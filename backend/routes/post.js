const express = require("express");
const postRouter = express.Router();
const Post = require("../models/Post");
const { validatePost } = require("../middlewares/auth");


postRouter.post("/",validatePost, async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const post = new Post({ title, content, author, tags });
    const savedPost = await post.save();

    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while creating post" });
  }
});


postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});


postRouter.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = postRouter;
