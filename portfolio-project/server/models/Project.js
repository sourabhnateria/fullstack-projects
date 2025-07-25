const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    technologies: [{
        type: String,
        required: true
    }],
    liveLink: {
        type: String
    },
    githubLink: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'desktop', 'api', 'other'],
        default: 'web'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
