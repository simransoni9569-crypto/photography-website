const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const galleryController = require('../controllers/galleryController');
const bookingController = require('../controllers/bookingController');
const testimonialController = require('../controllers/testimonialController');
const serviceController = require('../controllers/serviceController');
const pricingController = require('../controllers/pricingController');
const contactController = require('../controllers/contactController');
const dashboardController = require('../controllers/dashboardController');

const { authenticateJWT } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Auth API Routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Booking API Routes
router.post('/booking', bookingController.createBooking);
router.get('/bookings', authenticateJWT, bookingController.getBookings);
router.put('/booking/:id/status', authenticateJWT, bookingController.updateBookingStatus);
router.delete('/booking/:id', authenticateJWT, bookingController.deleteBooking);

// Gallery API Routes
router.get('/gallery', galleryController.getGallery);
router.post('/gallery', authenticateJWT, upload.single('image'), galleryController.addGallery);
router.put('/gallery/:id', authenticateJWT, upload.single('image'), galleryController.updateGallery);
router.delete('/gallery/:id', authenticateJWT, galleryController.deleteGallery);

// Testimonial API Routes
router.get('/testimonial', testimonialController.getTestimonials);
router.post('/testimonial', authenticateJWT, testimonialController.addTestimonial);

// Services API Routes
router.get('/services', serviceController.getServices);
router.post('/services', authenticateJWT, serviceController.addService);

// Pricing API Routes
router.get('/pricing', pricingController.getPricing);
router.post('/pricing', authenticateJWT, pricingController.addPricing);

// Contact & Messages API Routes
router.post('/contact', contactController.sendMessage);
router.get('/messages', authenticateJWT, contactController.getMessages);

// Dashboard Analytics Route
router.get('/dashboard/stats', authenticateJWT, dashboardController.getDashboardStats);

module.exports = router;
