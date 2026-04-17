import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory storage
let posts = [
  { id: 1, name: "Welcome Post", content: "This is the first post." },
  { id: 2, name: "Second Post", content: "Mini-Twitter is running!" }
];

let commentsByPostId = {
  1: [{ id: 1, comment: "Nice start!" }],
  2: [{ id: 2, comment: "Looks good!" }]
};

let nextPostId = 3;
let nextCommentId = 3;

const findPostById = (postId) => posts.find((p) => p.id === postId);

// GET /posts
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

// GET /posts/:postId
app.get("/posts/:postId", (req, res) => {
  const postId = Number(req.params.postId);
  const post = findPostById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json(post);
});

// GET /posts/:postId/comments
app.get("/posts/:postId/comments", (req, res) => {
  const postId = Number(req.params.postId);
  const post = findPostById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const comments = commentsByPostId[postId] || [];
  res.status(200).json(comments);
});

// POST /posts
app.post("/posts", (req, res) => {
  const { name, content } = req.body || {};

  if (!name || !content) {
    return res.status(400).json({ error: "Both name and content are required" });
  }

  const newPost = {
    id: nextPostId++,
    name: String(name).trim(),
    content: String(content).trim()
  };

  posts.push(newPost);
  commentsByPostId[newPost.id] = [];

  res.status(201).json(newPost);
});

// POST /posts/:postId/comments
app.post("/posts/:postId/comments", (req, res) => {
  const postId = Number(req.params.postId);
  const post = findPostById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const { comment } = req.body || {};
  if (!comment) {
    return res.status(400).json({ error: "Comment is required" });
  }

  const newComment = {
    id: nextCommentId++,
    comment: String(comment).trim()
  };

  if (!commentsByPostId[postId]) {
    commentsByPostId[postId] = [];
  }

  commentsByPostId[postId].push(newComment);
  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});