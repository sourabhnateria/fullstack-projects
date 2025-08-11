const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const path = require('path');        // ← ADD THIS LINE
const fs = require('fs');

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

// Download CV endpoint
router.get('/download-cv', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    console.log('=== CV Download Debug ===');
    console.log('Profile found:', !!profile);
    console.log('CV Path from DB:', profile?.cvPath);
    console.log('CV Filename from DB:', profile?.cvFilename);
    
    if (!profile || !profile.cvPath) {
      return res.status(404).json({ message: 'CV not found in database' });
    }

    const cvPath = path.join(__dirname, '../uploads', profile.cvPath);
    console.log('Current directory (__dirname):', __dirname);
    console.log('Constructed file path:', cvPath);
    console.log('File exists check:', fs.existsSync(cvPath));
    
    // Also check if uploads directory exists
    const uploadsDir = path.join(__dirname, '../uploads');
    console.log('Uploads directory:', uploadsDir);
    console.log('Uploads directory exists:', fs.existsSync(uploadsDir));
    
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      console.log('Files in uploads directory:', files);
    }
    
    if (!fs.existsSync(cvPath)) {
      return res.status(404).json({ 
        message: 'CV file not found on server',
        expectedPath: cvPath,
        cvPathFromDB: profile.cvPath
      });
    }

    res.setHeader('Content-Disposition', `attachment; filename="${profile.cvFilename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.sendFile(path.resolve(cvPath));

  } catch (error) {
    console.error('Error downloading CV:', error);
    res.status(500).json({ message: 'Server error while downloading CV' });
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
