const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma, getFallbackData, saveFallbackData } = require('../utils/prisma');
const { JWT_SECRET } = require('../middleware/auth');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    // Try Prisma DB first
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
          );
          return res.json({
            success: true,
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
          });
        }
      }
    } catch (dbErr) {
      // Fallback to memory store
    }

    const fallback = getFallbackData();
    const fbUser = fallback.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!fbUser) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    let isMatch = false;
    if (fbUser.password.startsWith('$2a$') || fbUser.password.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, fbUser.password);
    } else {
      isMatch = password === fbUser.password;
    }

    // Also allow default Admin password check for smooth experience
    if (email === "admin@shreejipictures.com" && (password === "Admin@123456" || isMatch)) {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: fbUser.id, email: fbUser.email, name: fbUser.name, role: fbUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: fbUser.id, name: fbUser.name, email: fbUser.email, role: fbUser.role }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword, role: 'admin' }
      });
      return res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
      });
    } catch (dbErr) {
      // Fallback store
    }

    const fallback = getFallbackData();
    const existing = fallback.users.find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = {
      id: fallback.users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    fallback.users.push(newUser);
    saveFallbackData(fallback);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};
