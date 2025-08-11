import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        // Static data matching your screenshot - you can later fetch from API
        const staticExperiences = [
            {
                id: 1,
                position: "Software Engineer",
                company: "Qualyval",
                location: "Remote",
                duration: "Mar 2025 - Present",
                responsibilities: [
                    "Web automation and web crawling ",
                    "Web scraping and data extraction from various sources using rust programming.",
                    "Session control and tab management (multi-tab scraping)",
                    "Headless browser automation using Chrome DevTools Protocol (CDP)",
                    "DOM manipulation via CDP (e.g., click, scroll, extract HTML content)"
                ],
                achievements: [
                    "Automate and scrap robust websites like Uk bury council, Saudi Etimad tender etc .",
                    "Build a tool which can automate and scrap data from LinkedIn.",
                    "Successfully automate social media like Instagram, whatsApp etc.",
                    "Automate and scrap the trip advisor website "
                ],
                technologies: ["Rust", "Reqwest", "Chromium-Oxide", "HTML", "Rest Api", "OAuth","Chrome DevTools Protocol"]
            },
            {
                id: 2,
                position: "Software Engineer",
                company: "Self",
                location: "Remote",
                duration: "oct 2024 - present",
                responsibilities: [
                    "building Rest Apis",
                    "backend development",
                    
                ],
                achievements: [
                    "build a e-commerce website",
                    "created a restaurant app backend only",
                    "make a portfolio website "
                ],
                technologies: ["Node.js","Express.js","RestApi", "Mongodb", "mongoose", "React", "Postman", "git","github"]
            }
        ];
        
        setExperiences(staticExperiences);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="experience" className="experience">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Experience</h2>
                    <p>My professional journey and achievements</p>
                </motion.div>

                <motion.div 
                    className="experience-timeline"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="experience-card">
                                <div className="experience-header">
                                    <h3>{exp.position}</h3>
                                    <div className="company-info">
                                        <h4>{exp.company}</h4>
                                        <span className="location">{exp.location}</span>
                                    </div>
                                    <span className="duration">{exp.duration}</span>
                                </div>

                                <div className="experience-content">
                                    <div className="responsibilities">
                                        <h5>Key Responsibilities:</h5>
                                        <ul>
                                            {exp.responsibilities.map((resp, idx) => (
                                                <li key={idx}>{resp}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {exp.achievements && exp.achievements.length > 0 && (
                                        <div className="achievements">
                                            <h5>Key Achievements:</h5>
                                            <ul>
                                                {exp.achievements.map((achievement, idx) => (
                                                    <li key={idx}>{achievement}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="technologies">
                                        <h5>Technologies Used:</h5>
                                        <div className="tech-tags">
                                            {exp.technologies.map((tech) => (
                                                <span key={tech} className="tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-dot"></div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
