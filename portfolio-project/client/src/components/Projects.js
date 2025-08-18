import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Modal from 'react-modal';
import './Projects.css';

Modal.setAppElement('#root');

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    // const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [selectedProject]);

    const fetchProjects = async () => {
        try {
            // **ROBUST FIX**: Use the live URL as a fallback.
            // This prevents the build from crashing if the environment variable is not set.
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-portfolio-api.onrender.com';
            const apiUrl = `${API_BASE_URL}/api/projects`;
            
            const response = await axios.get(apiUrl);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
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

    // Handle overlay clicks for project links
    const handleOverlayClick = (e, project, action) => {
        e.stopPropagation();
        if (action === 'live' && project.liveLink) {
            window.open(project.liveLink, '_blank', 'noopener,noreferrer');
        } else if (action === 'code' && project.githubLink) {
            window.open(project.githubLink, '_blank', 'noopener,noreferrer');
        }
    };

    if (loading) return <div className="loading">Loading projects...</div>;

    return (
        <section id="projects" className="projects">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>My Projects</h2>
                    <p>Here are some of my recent works</p>
                </motion.div>

                <div className="project-filters">
                    {['all', 'web', 'mobile', 'desktop', 'api'].map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${filter === category ? 'active' : ''}`}
                            onClick={() => setFilter(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                <motion.div 
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project._id}
                            className="project-card"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="project-image">
                                <img src={project.imageUrl} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="overlay-content">
                                        <span>View Details</span>
                                        <div className="project-links">
                                            {project.liveLink && (
                                                <button 
                                                    className="overlay-btn"
                                                    onClick={(e) => handleOverlayClick(e, project, 'live')}
                                                >
                                                    Live Demo
                                                </button>
                                            )}
                                            {project.githubLink && (
                                                <button 
                                                    className="overlay-btn"
                                                    onClick={(e) => handleOverlayClick(e, project, 'code')}
                                                >
                                                    Source Code
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                    {project.technologies && project.technologies.length > 3 && (
                                        <span className="tech-more">+{project.technologies.length - 3} more</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {selectedProject && (
                <Modal
                    isOpen={!!selectedProject}
                    onRequestClose={() => setSelectedProject(null)}
                    className="project-modal"
                    overlayClassName="project-modal-overlay"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    ariaHideApp={false}
                >
                    <button className="close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">✕</button>
                    <div className="modal-content">
                        <h2>{selectedProject.title}</h2>
                        {selectedProject.category && (
                            <span className="modal-category">
                                {selectedProject.category.toUpperCase()}
                            </span>
                        )}
                        <img className="modal-hero" src={selectedProject.imageUrl} alt={selectedProject.title} />
                        <p>{selectedProject.longDescription || selectedProject.description}</p>
                        {/* Gallery Section */}
                        {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                            <div className="modal-gallery">
                                <h4>Screenshots</h4>
                                <div className="gallery-grid">
                                    {selectedProject.gallery.map((image, index) => (
                                        <img 
                                            key={index} 
                                            src={image} 
                                            alt={`${selectedProject.title} screenshot ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Technologies Section */}
                        {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                            <div className="modal-tech">
                                <h4>Technologies Used</h4>
                                <div className="tech-list">
                                    {selectedProject.technologies.map((tech) => (
                                        <span key={tech} className="tech-tag-modal">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="modal-actions">
                            {selectedProject.liveLink && (
                                <a 
                                    href={selectedProject.liveLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    Live Demo
                                </a>
                            )}
                            {selectedProject.githubLink && (
                                <a 
                                    href={selectedProject.githubLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    Source Code
                                </a>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default Projects;
