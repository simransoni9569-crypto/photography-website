const { prisma, getFallbackData, saveFallbackData } = require('../utils/prisma');

exports.getServices = async (req, res) => {
  try {
    try {
      const services = await prisma.service.findMany();
      return res.json({ success: true, data: services });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    res.json({ success: true, data: fallback.services });
  } catch (error) {
    console.error('Get Services Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch services' });
  }
};

exports.addService = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ success: false, message: 'Title, description and price are required.' });
    }

    const img = image || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80";

    try {
      const service = await prisma.service.create({
        data: { title, description, price, image: img }
      });
      return res.status(201).json({ success: true, message: 'Service created successfully', data: service });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    const newService = { id: Date.now(), title, description, price, image: img };
    fallback.services.push(newService);
    saveFallbackData(fallback);

    res.status(201).json({ success: true, message: 'Service created successfully', data: newService });
  } catch (error) {
    console.error('Add Service Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create service' });
  }
};
