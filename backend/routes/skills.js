// backend/routes/skills.js

const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add a new skill
router.post('/', async (req, res) => {
  try {
    const newSkill = new Skill({ skill: req.body.skill });
    await newSkill.save();
    res.json(newSkill);
  } catch (error) {
    res.status(400).send('Error adding skill');
  }
});

// Delete a skill
router.delete('/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.send('Skill deleted');
  } catch (error) {
    res.status(500).send('Error deleting skill');
  }
});

module.exports = router;
