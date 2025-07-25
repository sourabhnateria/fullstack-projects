const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    proficiency: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        enum: ['frontend', 'backend', 'database', 'tools', 'other'],
        required: true
    },
    icon: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
