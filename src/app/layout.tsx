import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { GlobalChat } from "@/components/GlobalChat";
import { ChatProvider } from "@/context/ChatContext";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nykaa Fashion | Luxury Curated Fashion",
  description: "Experience the ultimate luxury in fashion and beauty with curated collections.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorantGaramond.variable} antialiased font-sans bg-muted/30`}>
        <div className="flex justify-center min-h-screen overflow-x-hidden">
          <div className="w-full max-w-[430px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] relative min-h-screen flex flex-col">
            <CartProvider>
              <ChatProvider>
                <Navbar />
                <main className="flex-1 pt-14 pb-20">
                  {children}
                </main>
                <BottomNav />
                <GlobalChat />
                {/* Footer is typically not used in a strict mobile app shell, but keeping it inside if needed */}
                <Footer />
              </ChatProvider>
            </CartProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
