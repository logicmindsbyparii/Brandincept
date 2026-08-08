import express from 'express';
import { sendNotificationEmail } from '../controllers/mailController.js';
import { projectsData, partnersData } from '../companyData.js';

const router = express.Router();


// In-memory storage for inquiries
const inquiriesData = [];

// --- INQUIRIES ---

// @route   POST /api/inquiries
// @desc    Submit a new inquiry
router.post('/inquiries', async (req, res) => {
    try {
        const { name, email, phone, interest, message } = req.body;

        const newInquiry = {
            id: Date.now(),
            name,
            email,
            phone,
            interest,
            message,
            createdAt: new Date()
        };

        // ✅ Save inquiry first (this works)
        inquiriesData.push(newInquiry);

        // 🔥 Try sending email BUT don't break API if it fails
        try {
            await sendNotificationEmail(req.body);
            console.log("✅ Email sent successfully");
        } catch (emailError) {
            console.error("❌ Email failed:", emailError.message);
        }

        // ✅ Always send success response
        res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully',
            data: newInquiry,
        });

    } catch (error) {
        console.error('❌ Error saving inquiry:', error);

        res.status(500).json({
            success: false,
            message: 'Server Error: Could not save inquiry',
            error: error.message
        });
    }
});

// @route   GET /api/inquiries
// @desc    Get all inquiries (For admin purposes)
router.get('/inquiries', (req, res) => {
    res.status(200).json({
        success: true,
        data: [...inquiriesData].reverse()
    });
});

// --- PROJECTS ---

// @route   GET /api/projects
// @desc    Get all project archives
router.get('/projects', (req, res) => {
    res.status(200).json({
        success: true,
        data: projectsData
    });
});

// --- PARTNERS ---

// @route   GET /api/partners
// @desc    Get all brand partners
router.get('/partners', (req, res) => {
    res.status(200).json({
        success: true,
        data: partnersData
    });
});

export default router;
