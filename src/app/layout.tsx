import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { CartProvider } from '@/contexts/CartContext';
import { Footer } from '@/components/common/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['800'],
});

export const metadata: Metadata = {
  title: 'SRE Clothing - A Modern E-Commerce Platform',
  description: 'A role-based e-commerce platform for Admins, Vendors, and Customers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
          roboto.variable,
          inter.variable
        )}
      >
        <CartProvider>
            <div className="flex-grow">
              {children}
            </div>
        </CartProvider>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
