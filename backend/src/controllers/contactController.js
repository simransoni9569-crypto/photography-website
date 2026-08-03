const { prisma, getFallbackData, saveFallbackData } = require('../utils/prisma');

exports.sendMessage = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
      const msg = await prisma.message.create({
        data: { name, phone, email, message }
      });
      return res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! Your message has been sent to Shree Ji Pictures.',
        data: msg
      });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    const newMsg = {
      id: Date.now(),
      name,
      phone,
      email,
      message,
      createdAt: new Date().toISOString()
    };
    fallback.messages.unshift(newMsg);
    saveFallbackData(fallback);

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been sent to Shree Ji Pictures.',
      data: newMsg
    });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    try {
      const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.json({ success: true, data: messages });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    res.json({ success: true, data: fallback.messages });
  } catch (error) {
    console.error('Get Messages Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
};
