# Shree Ji Pictures - Luxury Photography Studio Full-Stack Web Application

A full-stack photography studio website and administration suite for **Shree Ji Pictures**, crafted with modern web technologies, luxury obsidian & gold aesthetics, glassmorphism UI, Framer Motion animations, REST APIs, Prisma ORM, and MySQL database.

---

## 🌟 Features Overview

- **Luxury Design System**: Theme with obsidian black (`#111111`), metallic gold accents (`#D4AF37`), Google Fonts Playfair Display & Inter typography, and glassmorphism panels.
- **Home Hero & Animations**: Full-screen photography carousel, animated statistics counters, scroll parallax transitions, call to actions.
- **Service Catalog**: 12 detailed photography & videography service cards with price tags and instant booking links.
- **Masterpiece Gallery**: Multi-category filterable photo grid (Wedding, Pre-Wedding, Birthday, Baby Shoot, Fashion, Events, Nature, Portrait) with high-res Lightbox modal & zoom controls.
- **Interactive Booking System**: Form with real-time field validation saving reservations to SQL database (`POST /api/booking`).
- **Client Testimonials**: Animated customer review cards with star ratings & client photos.
- **Pricing Packages**: Silver, Gold, Premium, and Luxury package feature breakdown.
- **Contact & Google Maps**: Contact form (`POST /api/contact`), phone `8887647811`, email `shubhamsoniphotography07@gmail.com`, working hours `Mon-Sun 9AM-8PM`, and embedded responsive Google Maps.
- **Secure Admin Dashboard**: JWT authentication protected suite (`/admin`) with dashboard analytics, drag-and-drop Multer image uploader, booking status manager, and contact inbox.
- **SEO & Security**: XML Sitemap, Robots.txt, Helmet security headers, Cors configuration, bcrypt password hashing, and express-rate-limit protection.

---

## 📁 Directory Structure

```
C:\Users\hp\.gemini\antigravity\scratch\shree-ji-pictures\
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # Prisma ORM MySQL Schema
│   ├── src/
│   │   ├── controllers/         # REST API Controllers
│   │   ├── middleware/          # JWT Auth, Multer Upload, Rate Limiting
│   │   ├── routes/              # Express API Routes
│   │   ├── utils/               # Prisma client & fallback data store
│   │   └── server.js            # Express Entrypoint (Port 5000)
│   ├── uploads/                 # Uploaded photography storage
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router Pages
│   │   ├── components/          # Reusable UI Components (Hero, Navbar, Footer, Lightbox)
│   │   ├── context/             # Theme & Auth Context
│   │   └── services/            # Axios API Client
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Start the Backend API Server
```bash
cd backend
npm install
npm run seed      # Seeds admin user (admin@shreejipictures.com / Admin@123456)
npm start         # Runs Express server on http://localhost:5000
```

### 2. Start the Frontend Next.js Web App
```bash
cd frontend
npm install
npm run dev       # Runs Next.js app on http://localhost:3000
```

---`

---

## 🌐 Deployment Guide

### Vercel (Frontend)
1. Push `frontend/` directory to GitHub repository.
2. Import repository into Vercel.
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api`
4. Deploy!

### Render / Railway (Backend)
1. Push `backend/` directory to GitHub repository.
2. Connect MySQL database (e.g., PlanetScale / Railway MySQL / AWS RDS).
3. Set environment variables: `DATABASE_URL`, `JWT_SECRET`, `PORT=5000`.
4. Run `npx prisma db push`.
5. Start command: `node src/server.js`.
