"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative h-[80vh] min-h-[500px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Fashion Hero"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-2xl mt-auto md:mt-0">
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/90 mb-4 block font-bold animate-fadeIn">
                        Spring Summer Collection 2026
                    </span>
                    <h1 className="text-5xl text-white mb-6 leading-tight animate-slideUp font-brand font-bold">
                        The <span className="italic font-light">Art</span> of <br /> Dressing Well
                    </h1>
                    <p className="text-base text-white/80 mb-8 font-light leading-relaxed animate-fadeIn">
                        Discover a curated world of high-fashion and luxury essentials.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn">
                        <Link
                            href="/shop"
                            className="tap-target px-8 py-4 bg-primary text-white text-[10px] uppercase tracking-widest font-bold hover:bg-primary/90 transition-all flex items-center justify-center space-x-3 group active-scale rounded-sm shadow-xl shadow-primary/20"
                        >
                            <span>Explore Store</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/luxury-edits"
                            className="tap-target px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white text-[10px] uppercase tracking-widest font-bold hover:bg-white/20 transition-all active-scale rounded-sm text-center"
                        >
                            Designer Edits
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Desktop Only */}
            <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-end space-y-4">
                <div className="w-px h-24 bg-white/20" />
                <span className="text-[10px] uppercase tracking-widest text-white/40 transform rotate-90 origin-right translate-y-24">
                    Discover More
                </span>
            </div>
        </section>
    );
};
