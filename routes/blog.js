const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../jwtmiddleware');
const BlogPost = require('../models/blogPost');

router.use(jwtMiddleware);

router.get('/posts', async (req, res) => {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  
      const skip = (page - 1) * limit;
      const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
  
      const posts = await BlogPost.find()
        .populate('author', 'username') 
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit));
  
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.get('/posts/:id', async (req, res) => {
    try {
      const post = await BlogPost.findById(req.params.id).populate('author', 'username');
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.post('/posts', async (req, res) => {
    try {
      const { title, content } = req.body;
      const newPost = new BlogPost({ title, content, author: req.user.userId });
      const savedPost = await newPost.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.put('/posts/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const updatedPost = await BlogPost.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.delete('/posts/:id', async (req, res) => {
    try {
      const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;