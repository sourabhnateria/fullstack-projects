import React, { useState, useEffect } from 'react';
import './Skills.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // You can fetch skills from your API or use static data
        const staticSkills = [
            { name: 'JavaScript', proficiency: 90, category: 'frontend' },
            { name: 'React', proficiency: 85, category: 'frontend' },
            { name: 'Node.js', proficiency: 80, category: 'backend' },
            { name: 'MongoDB', proficiency: 75, category: 'database' },
            { name: 'Express.js', proficiency: 82, category: 'backend' },
            { name: 'Postman', proficiency: 60, category: 'backend' },
            { name: 'Rust', proficiency: 50, category: 'backend' },
            { name: 'C++', proficiency: 50, category: 'backend' },
        ];
        setSkills(staticSkills);
    }, []);

    return (
        <section id="skills" className="skills">
            <div className="container">
                <div className="section-header">
                    <h2>My Skills</h2>
                    <p>Technologies I work with</p>
                </div>
                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <h3>{skill.name}</h3>
                            <div className="skill-bar">
                                <div 
                                    className="skill-progress" 
                                    style={{width: `${skill.proficiency}%`}}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
