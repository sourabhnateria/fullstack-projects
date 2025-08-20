const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure nodemailer (replace with your email service)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

         // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        console.log('Sending email with data:', { name, email, subject });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${subject || 'New Message'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        // Send auto-reply to user
        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for your message!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                    <h2 style="color: #667eea;">Thank you for reaching out!</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for your message. I've received it and will get back to you as soon as possible.</p>
                    <p>Best regards,<br>Sourabh</p>
                </div>
            `
        };

        await transporter.sendMail(autoReplyOptions);

        // ✅ IMPORTANT: Send response with success property
        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send message' , error:process.env.NODE_ENV === 'development' ? error.message : undefined });
    }
});

module.exports = router;
