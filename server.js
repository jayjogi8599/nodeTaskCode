const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const blogPostRoutes = require('./routes/blog');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {});
console.log("Connected to MongoDB");
app.use('/auth', authRoutes);
app.use('/api', blogPostRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
