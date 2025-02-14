const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// Find matches for the current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const matches = await User.find({
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