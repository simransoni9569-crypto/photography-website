const { prisma, getFallbackData } = require('../utils/prisma');

exports.getDashboardStats = async (req, res) => {
  try {
    let totalBookings = 0;
    let totalGalleryImages = 0;
    let totalMessages = 0;
    let totalVisitors = 14850; // Mock visitor analytics baseline counter

    try {
      totalBookings = await prisma.booking.count();
      totalGalleryImages = await prisma.gallery.count();
      totalMessages = await prisma.message.count();

      return res.json({
        success: true,
        data: {
          totalVisitors,
          totalBookings,
          totalGalleryImages,
          totalMessages
        }
      });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    res.json({
      success: true,
      data: {
        totalVisitors,
        totalBookings: fallback.bookings.length,
        totalGalleryImages: fallback.gallery.length,
        totalMessages: fallback.messages.length
      }
    });

  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard statistics' });
  }
};
