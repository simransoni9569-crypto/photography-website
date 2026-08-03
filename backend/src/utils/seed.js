const bcrypt = require('bcryptjs');
const { prisma, getFallbackData, saveFallbackData } = require('./prisma');

async function seedDatabase() {
  console.log('Seeding initial data for Shree Ji Pictures...');
  const hashedPassword = await bcrypt.hash('Admin@123456', 10);

  try {
    // 1. Seed Admin User
    await prisma.user.upsert({
      where: { email: 'admin@shreejipictures.com' },
      update: {},
      create: {
        name: 'Shubham Soni',
        email: 'admin@shreejipictures.com',
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('✅ Admin user seeded into database: admin@shreejipictures.com / Admin@123456');
  } catch (err) {
    console.log('Prisma DB seed notice:', err.message);
  }

  // Ensure Fallback Store is populated
  const fallback = getFallbackData();
  saveFallbackData(fallback);
  console.log('✅ Fallback store seeded and verified!');
}

seedDatabase().then(() => {
  console.log('Seed completed successfully!');
  process.exit(0);
}).catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
