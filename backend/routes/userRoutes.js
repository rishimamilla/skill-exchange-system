const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// Add skills to the current user
router.put('/me/skills', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.skillsOffered.push(req.body.skillsOffered);
    user.skillsNeeded.push(req.body.skillsNeeded);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Remove skills from the current user
router.put('/me/skills/remove', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { skillType, skill } = req.body;

    if (skillType === 'skillsOffered') {
      user.skillsOffered = user.skillsOffered.filter(s => s !== skill);
    } else if (skillType === 'skillsNeeded') {
      user.skillsNeeded = user.skillsNeeded.filter(s => s !== skill);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Find matches for the current user
router.get('/matches', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const matches = await User.find({
      _id: { $ne: user._id }, // Exclude the current user
      skillsOffered: { $in: user.skillsNeeded },
      skillsNeeded: { $in: user.skillsOffered }
    }).select('-password');
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;