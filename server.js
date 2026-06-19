const express = require("express");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
require("dotenv").config();
const db = require("./database");
const app = express();

app.use(express.json());

let posts = [
  {
    id: 1,
    title: "My First Post",
    likes: 10,
    status: "pending verification"
  },
  {
    id: 2,
    title: "Learning Express",
    likes: 25,
    status: "pending verification"
  }
];

let users = [
  {
    id: 1,
    name: "Anvii",
    curatorScore: 0,
    contributorScore: 0
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
  const newPost = {
     ...req.body,
     status: "pending verification"
  };

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
// VERIFY POST

app.put("/posts/:id/verify", (req, res) => {
  const id = parseInt(req.params.id);

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  post.status = "verified";

  res.json({
    message: "Post verified successfully",
    post
  });
});
app.get("/users/:id/reputation", (req, res) => {
  const user = users.find(
    u => u.id === parseInt(req.params.id)
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const totalLikes = posts.reduce(
    (sum, post) => sum + post.likes,
    0
  );

  user.contributorScore = totalLikes;
  user.curatorScore = Math.floor(totalLikes / 2);

  res.json(user);
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});