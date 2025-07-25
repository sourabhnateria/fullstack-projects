import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Portfolio</h3>
                        <p>Building amazing web experiences</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#about">About</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#skills">Skills</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Connect with me</h4>
                        <div className="social-links">
                            <a href="https://github.com/sourabhnateria" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://www.linkedin.com/in/sourabh-nateria-15b187221/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://x.com/sourabh_nateria" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://www.instagram.com/nateriasourabh/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {currentYear} All rights reserved. This website is developed by <p className='name'>Sourabh Nateria</p></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
