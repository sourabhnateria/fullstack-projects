import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import axios from 'axios';

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/profile`;
      const response = await axios.get(apiUrl);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleDownloadCV = () => {
    const downloadUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/profile/download-cv`;
    window.open(downloadUrl, '_blank');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="hero" className="hero">
            <div className="hero-container">
                <motion.div 
                    className="hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={itemVariants} className="hero-title">
                        Hi, I'm {profile?.name || 'Sourabh Nateria'}
                    </motion.h1>
                    
                    <motion.h2 variants={itemVariants} className="hero-subtitle">
                        {profile?.title || 'Full Stack Developer'}
                    </motion.h2>
                    
                    <motion.p variants={itemVariants} className="hero-description">
                        {profile?.bio || 'Passionate developer creating amazing web experiences'}
                    </motion.p>
                    
                    <motion.div variants={itemVariants} className="hero-buttons">
                        <button className="btn btn-primary">View My Work</button>
                        <button className="btn secondary" onClick={handleDownloadCV}>Download CV</button>
                    </motion.div>
                </motion.div>
                
                <motion.div 
                    className="hero-image"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <img 
                        src={profile?.profileImage || 'https://pbs.twimg.com/profile_images/1928857677490188289/rkGjJV64_400x400.jpg'} 
                        alt="Profile" 
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
