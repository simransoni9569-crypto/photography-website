const { prisma, getFallbackData, saveFallbackData } = require('../utils/prisma');

exports.getTestimonials = async (req, res) => {
  try {
    try {
      const testimonials = await prisma.testimonial.findMany();
      return res.json({ success: true, data: testimonials });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    res.json({ success: true, data: fallback.testimonials });
  } catch (error) {
    console.error('Get Testimonials Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' });
  }
};

exports.addTestimonial = async (req, res) => {
  try {
    const { customerName, photo, rating, review } = req.body;
    if (!customerName || !review) {
      return res.status(400).json({ success: false, message: 'Customer name and review are required.' });
    }

    const defaultPhoto = photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
    const numRating = parseInt(rating) || 5;

    try {
      const testimonial = await prisma.testimonial.create({
        data: {
          customerName,
          photo: defaultPhoto,
          rating: numRating,
          review
        }
      });
      return res.status(201).json({ success: true, message: 'Testimonial added successfully', data: testimonial });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    const newTestimonial = {
      id: Date.now(),
      customerName,
      photo: defaultPhoto,
      rating: numRating,
      review
    };
    fallback.testimonials.unshift(newTestimonial);
    saveFallbackData(fallback);

    res.status(201).json({ success: true, message: 'Testimonial added successfully', data: newTestimonial });
  } catch (error) {
    console.error('Add Testimonial Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add testimonial' });
  }
};
