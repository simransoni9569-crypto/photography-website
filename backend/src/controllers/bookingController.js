const { prisma, getFallbackData, saveFallbackData } = require('../utils/prisma');

exports.createBooking = async (req, res) => {
  try {
    const { name, phone, email, eventType, date, location, message } = req.body;
    if (!name || !phone || !email || !eventType || !date || !location) {
      return res.status(400).json({ success: false, message: 'Please fill out all required fields.' });
    }

    try {
      const booking = await prisma.booking.create({
        data: {
          name,
          phone,
          email,
          eventType,
          date,
          location,
          message: message || '',
          status: 'Pending'
        }
      });
      return res.status(201).json({
        success: true,
        message: 'Booking request submitted successfully! Our team will contact you shortly.',
        data: booking
      });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    const newBooking = {
      id: Date.now(),
      name,
      phone,
      email,
      eventType,
      date,
      location,
      message: message || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    fallback.bookings.unshift(newBooking);
    saveFallbackData(fallback);

    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully! Our team will contact you shortly.',
      data: newBooking
    });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ success: false, message: 'Failed to process booking' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    try {
      const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.json({ success: true, data: bookings });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    res.json({ success: true, data: fallback.bookings });
  } catch (error) {
    console.error('Get Bookings Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updated = await prisma.booking.update({
        where: { id: parseInt(id) },
        data: { status }
      });
      return res.json({ success: true, message: 'Booking status updated', data: updated });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    const booking = fallback.bookings.find(b => b.id === parseInt(id));
    if (booking) {
      booking.status = status;
      saveFallbackData(fallback);
      return res.json({ success: true, message: 'Booking status updated', data: booking });
    }

    res.status(404).json({ success: false, message: 'Booking not found' });
  } catch (error) {
    console.error('Update Booking Status Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking' });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await prisma.booking.delete({ where: { id: parseInt(id) } });
      return res.json({ success: true, message: 'Booking deleted successfully' });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    fallback.bookings = fallback.bookings.filter(b => b.id !== parseInt(id));
    saveFallbackData(fallback);

    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Delete Booking Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete booking' });
  }
};
