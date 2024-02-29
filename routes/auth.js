const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
        
        let user = await User.findOne({ $or: [{ username }, { email }] });
    
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }
    
        user = new User({
          username,
          email,
          password,
        });
    
        await user.save();
    
        
        const payload = {
          user: {
            id: user.id,
          },
        };
    
        jwt.sign(payload,  process.env.JWT_TOKEN, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
    
        let user = await User.findOne({ username });
    
        if (!user) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid credentials' });
        }
    
        const payload = {
          user: {
            id: user.id,
          },
        };
    
        jwt.sign(payload,  process.env.JWT_TOKEN, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

module.exports = router;
