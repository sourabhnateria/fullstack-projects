const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET profile
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST/UPDATE profile
router.post('/', async (req, res) => {
    try {
        const existingProfile = await Profile.findOne();
        
        if (existingProfile) {
            // Update existing profile
            const updatedProfile = await Profile.findByIdAndUpdate(
                existingProfile._id, 
                req.body, 
                { new: true }
            );
            res.json(updatedProfile);
        } else {
            // Create new profile
            const profile = new Profile(req.body);
            const newProfile = await profile.save();
            res.status(201).json(newProfile);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
