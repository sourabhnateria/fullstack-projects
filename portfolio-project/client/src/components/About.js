import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <div className="section-header">
                    <h2>About Me</h2>
                    <p>Learn more about my background and experience</p>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <p>
                            I'm a passionate full-stack developer with experience in building
                            modern web applications using the MERN stack. I love creating
                            user-friendly interfaces and solving complex problems.
                        </p>
                        <p>
                            My journey in web development started several years ago, and I've
                            been continuously learning and adapting to new technologies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
