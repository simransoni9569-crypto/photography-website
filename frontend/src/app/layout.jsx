import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';
import CookieConsent from '../components/CookieConsent';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'Shree Ji Pictures | Luxury Wedding & Fashion Photography Studio',
  description: 'Premier professional photography studio specializing in royal weddings, pre-wedding shoots, maternity, baby shoots, fashion editorials, and 4K cinematic videography.',
  keywords: 'Photography Studio, Shree Ji Pictures, Wedding Photography, Pre Wedding Shoot, Engagement Photography, Baby Shoot, Maternity Shoot, Fashion Photography, Cinematic Videography, Drone Photography',
  openGraph: {
    title: 'Shree Ji Pictures | Luxury Photography Studio',
    description: 'Capturing Your Precious Moments Forever with timeless elegance and high-end cinematic editing.',
    url: 'https://shreejipictures.com',
    siteName: 'Shree Ji Pictures',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Shree Ji Pictures Wedding Photography',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#111111',
                  color: '#FFFFFF',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  fontSize: '14px',
                  borderRadius: '12px'
                },
                success: {
                  iconTheme: {
                    primary: '#D4AF37',
                    secondary: '#000000',
                  },
                },
              }}
            />
            <div className="flex flex-col min-h-screen relative overflow-x-hidden">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
              <FloatingButtons />
              <CookieConsent />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
