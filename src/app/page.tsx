"use client";

import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "1",
    name: "Slumber Jill Lacy Dreams Night Dress",
    brand: "Slumber Jill",
    price: "₹1,899",
    image: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/Slumber%20Jill%20Lacy%20Dreams%20Night%20Dress%20Made%20of%20Viscose%20in%20Livaeco/1.png",
    hoverImage: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/Slumber%20Jill%20Lacy%20Dreams%20Night%20Dress%20Made%20of%20Viscose%20in%20Livaeco/2.png"
  },
  {
    id: "2",
    name: "Tropical Print Viscose Kurta",
    brand: "The Kaftan Company",
    price: "₹2,450",
    image: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20and%20Green%20Tropical%20Print%20Viscose%20Kurta/1.png",
    hoverImage: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20and%20Green%20Tropical%20Print%20Viscose%20Kurta/2.png"
  },
  {
    id: "3",
    name: "Blue Floral Hooded Lounge Dress",
    brand: "The Kaftan Company",
    price: "₹2,800",
    image: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20Floral%20Hooded%20Lounge%20Dress/1.png",
    hoverImage: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20Floral%20Hooded%20Lounge%20Dress/2.png"
  },
  {
    id: "4",
    name: "Yellow Floral Maternity Dress",
    brand: "The Kaftan Company",
    price: "₹3,200",
    image: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Yellow%20Floral%20Maternity%20And%20Feeding%20Dress/1.png",
    hoverImage: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Yellow%20Floral%20Maternity%20And%20Feeding%20Dress/2.png"
  }
];

export default function Home() {
  return (
    <div className="bg-background overflow-x-hidden">
      <HeroSection />

      {/* AI Confidence Banner - Native App Style */}
      <section className="py-8 bg-white border-y border-muted/50 overflow-hidden">
        <div className="px-4">
          <div className="flex flex-col items-center justify-between gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shadow-sm">
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-base font-brand font-bold">Confidence in Every Click</h4>
                <p className="text-[10px] text-luxury-stone font-medium uppercase tracking-widest mt-1">Powered by AI Size Predictor</p>
              </div>
            </div>
            <div className="flex gap-10 border-t border-muted/50 pt-6 w-full justify-center">
              <div className="text-center">
                <p className="text-2xl font-serif text-primary font-bold">30%</p>
                <p className="text-[9px] uppercase tracking-widest text-luxury-stone font-bold">Higher Assurance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-serif text-primary font-bold">98%</p>
                <p className="text-[9px] uppercase tracking-widest text-luxury-stone font-bold">Size Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid - 2 Column Strictly on Mobile */}
      <section className="py-10 px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-primary mb-2 block font-bold">New Arrivals</span>
            <h2 className="text-3xl font-brand font-bold leading-tight">Curated <span className="italic font-light">Excellence</span></h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <Link href="/shop" className="block w-full py-4 mt-10 border border-primary/20 text-primary uppercase text-[10px] tracking-widest font-bold text-center rounded-sm sm:hidden hover:bg-primary/5 active:scale-95 transition-all">
          View All Collections
        </Link>
      </section>

      {/* Editorial Section - Stacked for Mobile Shell */}
      <section className="py-12 bg-white">
        <div className="px-4 space-y-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md img-zoom-container shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
              alt="Editorial"
              className="w-full h-full object-cover zoom-target"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000";
              }}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="space-y-6">
            <div>
              <span className="text-[9px] uppercase tracking-[0.4em] text-luxury-stone font-bold">The Journal</span>
              <h2 className="text-3xl leading-tight mt-4 font-brand font-bold">Beyond <br /> Modern <span className="italic font-light">Luxury</span></h2>
            </div>
            <p className="text-base text-luxury-stone font-light leading-relaxed">
              Explore the stories behind our collections. From sustainable craftsmanship to the future of digital fashion.
            </p>
            <button className="flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] font-bold group tap-target">
              <span className="luxury-link">Read the edit</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-primary" />
            </button>
          </div>
        </div>
      </section>

      {/* AI Try-On Promo - App Style Banner */}
      <section className="py-12 bg-background overflow-hidden relative border-t border-muted/50">
        <div className="px-4 text-center relative z-10">
          <Sparkles size={32} className="mx-auto text-primary mb-6 animate-pulse" />
          <h2 className="text-3xl mb-6 leading-tight italic font-light text-foreground font-brand">
            Experience Your Future <br /> <span className="not-italic font-bold">Wardrobe, Virtually</span>
          </h2>
          <p className="text-base text-luxury-stone font-light mb-8 leading-relaxed mx-auto uppercase tracking-wider text-[10px] font-bold">
            Unmatched Precision. boutique trial room on screen.
          </p>
          <Link href="/product/1">
            <button className="w-full px-10 py-5 bg-foreground text-white text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all rounded-sm shadow-xl active-scale">
              Launch Virtual Mirror
            </button>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full border border-foreground animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full border border-primary animate-pulse" />
        </div>
      </section>

      {/* Footer Padding for Mobile BottomNav */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
