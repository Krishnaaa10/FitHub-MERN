// backend/routes/api/contact.js
const express = require('express');
const router = express.Router();

// Bring in the Message model we just created
const Message = require('../../models/Message');

// @route   POST api/contact
// @desc    Save a contact form message to the database
// @access  Public
router.post('/', async (req, res) => {
  // Get the data from the request body
  const { name, email, message } = req.body;

  try {
    // Create a new message instance using our Mongoose model
    const newMessage = new Message({
      name,
      email,
      message,
    });

    // Save the message to the database
    await newMessage.save();

    // Send a success response back to the frontend
    res.status(200).json({ msg: 'Message received and saved successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;