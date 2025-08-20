import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus('error');
            setIsSubmitting(false);
            return;
        }

        try {
            console.log('Submitting form data:', formData);
            
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-portfolio-api.onrender.com';
            const response = await axios.post(`${API_BASE_URL}/api/contact`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 15000, // 15 seconds timeout
            });

            console.log('Full response:', response);
            console.log('Response data:', response.data);

            // ✅ Check for success property
            if (response.status === 200 && response.data.success === true) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                console.log('✅ Message sent successfully!');
            } else {
                console.error('❌ Server responded but success is false:', response.data);
                setSubmitStatus('error');
            }

        } catch (error) {
            console.error('❌ Form submission error:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Get In Touch</h2>
                    <p>I'd love to hear from you. Send me a message!</p>
                    <p>I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology.</p>
                </motion.div>

                <motion.form 
                    className="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {submitStatus === 'success' && (
                        <p className="success-message">Message sent successfully!</p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="error-message">Failed to send message. Please try again.</p>
                    )}
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
