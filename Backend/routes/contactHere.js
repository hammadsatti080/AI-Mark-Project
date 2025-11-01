const express = require('express');
const router = express.Router();
const Contact = require('../models/contactHere');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, businessName, subject, message } = req.body;

    if (!name || !email || !phone || !businessName || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      businessName,
      subject,
      message
    });

    await newContact.save();
    console.log('💾 New contact saved:', newContact); // Debug log
    return res.status(200).json({
      success: true,
      message: "Message received successfully"
    });
  } catch (err) {
    console.error("Contact Form Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
