const { prisma, getFallbackData, saveFallbackData } = require('../utils/prisma');

exports.getGallery = async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;

    try {
      const where = category && category !== 'All' ? { category } : {};
      const galleryItems = await prisma.gallery.findMany({
        where,
        orderBy: { createdAt: 'desc' }
      });
      return res.json({ success: true, data: galleryItems });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    let data = fallback.gallery;
    if (category && category !== 'All') {
      data = data.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get Gallery Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch gallery' });
  }
};

exports.addGallery = async (req, res) => {
  try {
    const { title, category, description, imageUrl } = req.body;
    let finalImageUrl = imageUrl;

    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    if (!title || !category || !finalImageUrl) {
      return res.status(400).json({ success: false, message: 'Title, category and image are required.' });
    }

    try {
      const item = await prisma.gallery.create({
        data: {
          title,
          category,
          image: finalImageUrl,
          description: description || ''
        }
      });
      return res.status(201).json({ success: true, message: 'Gallery item added successfully', data: item });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    const newItem = {
      id: Date.now(),
      title,
      category,
      image: finalImageUrl,
      description: description || '',
      createdAt: new Date().toISOString()
    };
    fallback.gallery.unshift(newItem);
    saveFallbackData(fallback);

    res.status(201).json({ success: true, message: 'Gallery item added successfully', data: newItem });
  } catch (error) {
    console.error('Add Gallery Error:', error);
    res.status(500).json({ success: false, message: 'Failed to add gallery item' });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, imageUrl } = req.body;

    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    try {
      const updated = await prisma.gallery.update({
        where: { id: parseInt(id) },
        data: {
          title,
          category,
          description,
          ...(finalImageUrl && { image: finalImageUrl })
        }
      });
      return res.json({ success: true, message: 'Gallery item updated', data: updated });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    const idx = fallback.gallery.findIndex(g => g.id === parseInt(id));
    if (idx !== -1) {
      fallback.gallery[idx] = {
        ...fallback.gallery[idx],
        title: title || fallback.gallery[idx].title,
        category: category || fallback.gallery[idx].category,
        description: description !== undefined ? description : fallback.gallery[idx].description,
        image: finalImageUrl || fallback.gallery[idx].image
      };
      saveFallbackData(fallback);
      return res.json({ success: true, message: 'Gallery item updated', data: fallback.gallery[idx] });
    }

    res.status(404).json({ success: false, message: 'Gallery item not found' });
  } catch (error) {
    console.error('Update Gallery Error:', error);
    res.status(500).json({ success: false, message: 'Failed to update gallery item' });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await prisma.gallery.delete({ where: { id: parseInt(id) } });
      return res.json({ success: true, message: 'Gallery item deleted' });
    } catch (dbErr) {
      // Fallback
    }

    const fallback = getFallbackData();
    fallback.gallery = fallback.gallery.filter(g => g.id !== parseInt(id));
    saveFallbackData(fallback);

    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    console.error('Delete Gallery Error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete gallery item' });
  }
};
