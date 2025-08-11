const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    location: {
        type: String
    },
    profileImage: {
        type: String
    },
    resume: {
        type: String
    },
     cvPath: {
        type: String,
        default: null
    },
    cvFilename: {
        type: String,
        default: 'CV.pdf'
    },
    cvUpdatedAt: {
        type: Date,
        default: Date.now
    },
    socialLinks: {
        linkedin: String,
        github: String,
        twitter: String,
        instagram: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
