const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());

let posts = [
  {
    id: 1,
    title: "My First Post",
    likes: 10
  },
  {
    id: 2,
    title: "Learning Express",
    likes: 25
  }
];

// GET all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// GET single post
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.json({
      message: "Post not found"
    });
  }

  res.json(post);
});

// POST new post
app.post("/posts", (req, res) => {
  const newPost = req.body;

  posts.push(newPost);

  res.json({
    message: "Post added successfully!",
    post: newPost
  });
});

// PUT update post
app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.json({
      message: "Post not found"
    });
  }

  post.title = req.body.title;
  post.likes = req.body.likes;

  res.json({
    message: "Post updated successfully!",
    post
  });
});

// DELETE post
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex === -1) {
    return res.json({
      message: "Post not found"
    });
  }

  const deletedPost = posts.splice(postIndex, 1);

  res.json({
    message: "Post deleted successfully!",
    deletedPost: deletedPost[0]
  });
});
//console.log(process.env.MONGO_URI);
//mongoose.connect(process.env.MONGO_URI)
//.then(() => {
    //console.log("MongoDB Connected");
//})
//.catch((err) => {
    //console.log("MongoDB Error:", err);
//});
// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});