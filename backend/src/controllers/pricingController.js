const { prisma, getFallbackData, saveFallbackData } = require('../utils/prisma');

exports.getPricing = async (req, res) => {
  try {
    try {
      const pricing = await prisma.pricing.findMany();
      return res.json({ success: true, data: pricing });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    res.json({ success: true, data: fallback.pricing });
  } catch (error) {
    console.error('Get Pricing Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch pricing packages' });
  }
};

exports.addPricing = async (req, res) => {
  try {
    const { packageName, price, description } = req.body;
    if (!packageName || !price || !description) {
      return res.status(400).json({ success: false, message: 'Package name, price and description are required.' });
    }

    try {
      const pkg = await prisma.pricing.create({
        data: { packageName, price, description }
      });
      return res.status(201).json({ success: true, message: 'Pricing package added', data: pkg });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    const newPkg = { id: Date.now(), packageName, price, description };
    fallback.pricing.push(newPkg);
    saveFallbackData(fallback);

    res.status(201).json({ success: true, message: 'Pricing package added', data: newPkg });
  } catch (error) {
    console.error('Add Pricing Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add pricing package' });
  }
};
