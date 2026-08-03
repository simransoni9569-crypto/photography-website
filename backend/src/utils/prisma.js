const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

let prisma;
let isPrismaAvailable = false;

try {
  prisma = new PrismaClient();
} catch (err) {
  console.log('Prisma initializing fallback mode...');
}

// In-Memory Data Store Fallback for instant evaluation / demo without external MySQL setup
const DATA_FILE = path.join(__dirname, '../../db_fallback.json');

const initialData = {
  users: [
    {
      id: 1,
      name: "Shubham Soni",
      email: "admin@shreejipictures.com",
      // bcrypt hash for "Admin@123456"
      password: "$2a$10$vWdFzP8.A6qUjF.8o4xQYeLw8/L5K8zM1g6XN.F1F8p9H2Z1S8s7G",
      role: "admin",
      createdAt: new Date().toISOString()
    }
  ],
  gallery: [
    {
      id: 1,
      title: "Royal Rajputana Wedding",
      category: "Wedding",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      description: "A grand traditional wedding celebration featuring exquisite heritage attire and emotional rituals.",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Sunset Romance Pre Wedding",
      category: "Pre Wedding",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      description: "Golden hour couple portrait session captured by the tranquil lake side.",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: "Golden Engagement Ring Ceremony",
      category: "Engagement",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      description: "Intimate ring exchange ceremony captured with subtle lens flare.",
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      title: "First Birthday Magic",
      category: "Birthday",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
      description: "Joyful cake smash and balloon decorations for baby's 1st milestone.",
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      title: "Little Angel Newborn Shoot",
      category: "Baby Shoot",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80",
      description: "Peaceful sleeping baby photography with handmade props and organic fabrics.",
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      title: "High Fashion Editorial",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=1200&q=80",
      description: "Vogue style studio lighting with dramatic shadows and haute couture aesthetics.",
      createdAt: new Date().toISOString()
    },
    {
      id: 7,
      title: "Grand Sangeet Night",
      category: "Events",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
      description: "High energy music, dance performances, and vibrant lighting highlights.",
      createdAt: new Date().toISOString()
    },
    {
      id: 8,
      title: "Misty Mountain Sunrise",
      category: "Nature",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      description: "Breathtaking landscape composition of early morning mist over lush greenery.",
      createdAt: new Date().toISOString()
    },
    {
      id: 9,
      title: "Cinematic Portrait Studio",
      category: "Portrait",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      description: "Expressive studio portrait highlighting depth, sharp details, and personality.",
      createdAt: new Date().toISOString()
    }
  ],
  bookings: [
    {
      id: 1,
      name: "Rahul Verma",
      phone: "9876543210",
      email: "rahul.verma@example.com",
      eventType: "Wedding Photography",
      date: "2026-11-15",
      location: "Udaipur Palace, Rajasthan",
      message: "Looking for a 3-day full wedding shoot including pre-wedding drone videos.",
      status: "Confirmed",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "9812345678",
      email: "priya.s@example.com",
      eventType: "Baby Shoot",
      date: "2026-09-10",
      location: "Studio Indoor, Jaipur",
      message: "Newborn 10 days old photoshoot with cute cozy theme setups.",
      status: "Pending",
      createdAt: new Date().toISOString()
    }
  ],
  testimonials: [
    {
      id: 1,
      customerName: "Aarav & Ananya Roy",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      review: "Shree Ji Pictures captured our wedding so beautifully! Every picture feels like a movie frame. Shubham and his team are exceptionally creative, punctual, and friendly!"
    },
    {
      id: 2,
      customerName: "Vikram Singhania",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      review: "We booked them for our fashion catalog shoot and drone cinematography. The high-resolution editing and prompt delivery exceeded all our expectations!"
    },
    {
      id: 3,
      customerName: "Neha & Rohan Gupta",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      review: "The pre-wedding shoot was magical! They guided us through every pose and picked the dreamiest locations. Highly recommended for couples!"
    }
  ],
  services: [
    {
      id: 1,
      title: "Wedding Photography",
      description: "Royal full-coverage wedding stories captured with cinematic flair and traditional warmth.",
      price: "₹45,000 / Day",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Pre Wedding Shoot",
      description: "Romantic destination concept shoots with teaser video, aerial drone shots, and luxury prints.",
      price: "₹25,000",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Engagement Photography",
      description: "Candid emotional moments, ring exchange highlights, and family group portraits.",
      price: "₹18,000",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Birthday Photography",
      description: "Vibrant party coverage, cake ceremony, stage highlights, and fun candid photography.",
      price: "₹12,000",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Baby Shoot",
      description: "Safe, cozy, and ultra-cute newborn & milestone photography with specialized props.",
      price: "₹15,000",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Maternity Shoot",
      description: "Elegant, graceful portrait sessions celebrating the beautiful journey of motherhood.",
      price: "₹16,000",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Event Photography",
      description: "Corporate galas, anniversaries, social events, and cultural stage coverage.",
      price: "₹20,000 / Event",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "Product Photography",
      description: "Crisp commercial studio shoots for e-commerce, jewelry, fashion brands, and catalogs.",
      price: "₹10,000",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      title: "Fashion Photography",
      description: "High fashion editorial, model portfolio shoot, clothing line catalog with pro lighting.",
      price: "₹30,000",
      image: "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 10,
      title: "Cinematic Videography",
      description: "4K ultra-HD film production with custom color grading, sound design, and teaser edits.",
      price: "₹35,000",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 11,
      title: "Drone Photography",
      description: "Licensed high-altitude 4K aerial videography & panoramic venue landscapes.",
      price: "₹15,000",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 12,
      title: "Album Designing",
      description: "Custom flush mount glass-cover albums printed on premium velvet photo paper.",
      price: "₹12,000 / Album",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    }
  ],
  pricing: [
    {
      id: 1,
      packageName: "Silver",
      price: "₹35,000",
      description: "Ideal for intimate ceremonies. Includes 1 Lead Photographer, 200 HD Edited Photos, Traditional Video, and Web Gallery."
    },
    {
      id: 2,
      packageName: "Gold",
      price: "₹65,000",
      description: "Our most popular wedding package. 2 Photographers, 1 Videographer, Cinematic Teaser, Pre-Wedding Shoot & 1 Canvera Album."
    },
    {
      id: 3,
      packageName: "Premium",
      price: "₹1,10,000",
      description: "Comprehensive luxury coverage. 4K Drone, Cinematic Teaser, Full Length Movie, 2 Flush Mount Albums, Unlimited Edited Photos."
    },
    {
      id: 4,
      packageName: "Luxury",
      price: "₹1,85,000",
      description: "The ultimate VIP Experience. Destination Pre-Wedding Shoot, Celebrity Crew, Same-Day Edit Teaser, 3 Premium Velvet Albums."
    }
  ],
  messages: [
    {
      id: 1,
      name: "Amit Trivedi",
      phone: "9988776655",
      email: "amit@trivedi.com",
      message: "Hello! We would like to inquire about booking availability for a destination wedding in Udaipur for December 2026.",
      createdAt: new Date().toISOString()
    }
  ]
};

function getFallbackData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return initialData;
  }
}

function saveFallbackData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing fallback DB file:', err);
  }
}

module.exports = {
  prisma,
  getFallbackData,
  saveFallbackData
};
