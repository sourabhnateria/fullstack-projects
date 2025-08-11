const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Manually set CV path (for testing)
router.post('/set-cv-path', async (req, res) => {
  try {
    const { cvPath, cvFilename } = req.body;
    
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile({
        name: 'Sourabh Nateria',
        title: 'Full Stack Developer',
        bio: 'Passionate developer creating amazing web experiences',
        email: 'sourabh@example.com'
      });
    }

    profile.cvPath = cvPath;
    profile.cvFilename = cvFilename || 'Sourabh_Nateria_CV.pdf';
    profile.cvUpdatedAt = new Date();

    await profile.save();

    res.json({
      message: 'CV path set successfully',
      cvPath: profile.cvPath,
      cvFilename: profile.cvFilename
    });

  } catch (error) {
    console.error('Error setting CV path:', error);
    res.status(500).json({ message: 'Server error while setting CV path' });
  }
});

module.exports = router;
