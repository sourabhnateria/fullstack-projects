import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
<<<<<<< HEAD
import Modal from 'react-modal';
=======
>>>>>>> 041ff76a5df923e93d076d99fd9a3789bd20d1d9
import './Projects.css';

Modal.setAppElement('#root');

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
<<<<<<< HEAD
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/api/projects`;
            const response = await axios.get(apiUrl);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };
=======
    try {
        // Use the environment variable to construct the full API URL
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/projects`;
        const response = await axios.get(apiUrl);
        setProjects(response.data);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
    }
};
>>>>>>> 041ff76a5df923e93d076d99fd9a3789bd20d1d9

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
                                    </div>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies.slice(0, 3).map((tech) => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
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
                >
                    <button className="close-btn" onClick={() => setSelectedProject(null)}>✕</button>
                    <div className="modal-content">
                        <h2>{selectedProject.title}</h2>
                        <img className="modal-hero" src={selectedProject.imageUrl} alt={selectedProject.title} />
                        <p>{selectedProject.longDescription || selectedProject.description}</p>
                        <div className="modal-actions">
                            {selectedProject.liveLink && <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>}
                            {selectedProject.githubLink && <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Source Code</a>}
                        </div>
                    </div>
                </Modal>
            )}
        </section>
    );
};

export default Projects;
