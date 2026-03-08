"use client";

import { useState, useEffect } from "react";
import { User, ShoppingBag, Menu, X, Heart, Search, MessageCircle, Sparkles, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useChat } from "@/context/ChatContext";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { openChat } = useChat();
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <nav
            className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-muted/30" : "bg-transparent"
                } ${isMobileMenuOpen ? "h-screen" : "h-16"}`}
        >
            <div className={`container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4 ${isMobileMenuOpen ? "hidden" : "flex"}`}>
                {/* Left: Mobile Menu */}
                <div className="flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 -ml-2 tap-target text-foreground hover:bg-muted/50 rounded-full transition-colors"
                    >
                        <Menu size={22} />
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="flex-1 flex justify-center">
                    <Link href="/" className="flex flex-col items-center group transition-transform active:scale-95">
                        <span className="text-xl font-brand font-bold tracking-tight text-foreground leading-none">
                            NYKAA<span className="text-primary">FASHION</span>
                        </span>
                        <span className="text-[7px] uppercase tracking-[0.4em] font-medium text-luxury-stone mt-1 ml-0.5">Luxury Boutique</span>
                    </Link>
                </div>

                {/* Desktop Links hidden in mobile shell */}
                <div className="flex items-center">
                    <Link href="/cart" className="p-2 tap-target text-foreground/80 hover:text-primary transition-colors relative active-scale">
                        <ShoppingBag size={22} />
                        {totalItems > 0 && (
                            <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-white text-[9px] flex items-center justify-center rounded-full font-bold border-2 border-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay within Shell */}
            {isMobileMenuOpen && (
                <div className="absolute inset-0 z-[120] animate-fadeIn">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="absolute top-0 left-0 bottom-0 w-[85%] bg-white shadow-2xl animate-slideRight">
                        <div className="p-6 flex flex-col h-full overflow-y-auto no-scrollbar">
                            <div className="flex items-center justify-between mb-10">
                                <span className="font-brand font-bold text-xl uppercase">Nykaa<span className="text-primary">Fashion</span></span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            openChat();
                                        }}
                                        className="p-2 tap-target text-primary"
                                    >
                                        <MessageCircle size={22} />
                                    </button>
                                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 tap-target"><X size={24} /></button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                {[
                                    { label: "Women", href: "#", icon: null },
                                    { label: "Men", href: "#", icon: null },
                                    { label: "Luxe", href: "#", icon: Sparkles },
                                    { label: "Designers", href: "#", icon: null },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-center py-4 text-[11px] uppercase tracking-widest font-bold border-b border-muted group active:bg-muted/30 transition-colors px-2 rounded-sm"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.icon && <item.icon size={14} className="text-primary" />}
                                            <span className="group-active:text-primary">{item.label}</span>
                                        </div>
                                    </Link>
                                ))}

                                <div className="mt-8 mb-4 px-2">
                                    <p className="text-[9px] uppercase tracking-widest font-bold text-luxury-stone opacity-50 mb-4">Orders & AI Tools</p>
                                    <div className="space-y-2">
                                        {[
                                            { label: "Track My Order", href: "/order-confirmation", icon: Truck },
                                            { label: "AI Virtual Try-On", href: "#", icon: User },
                                            { label: "Find My Fit (AI)", href: "#", icon: ShieldCheck },
                                            { label: "Fabric Analysis", href: "#", icon: Search },
                                            { label: "My Wishlist", href: "#", icon: Heart },
                                        ].map((item: any) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="flex items-center justify-between p-4 bg-muted/20 rounded-xl group active:bg-primary active:text-white transition-all duration-300"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon size={16} className="text-primary group-active:text-white transition-colors" />
                                                    <span className="text-[11px] uppercase tracking-widest font-bold">{item.label}</span>
                                                </div>
                                                <ChevronRight size={14} className="text-luxury-stone group-active:text-white opacity-50" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-10 border-t border-muted pb-8 text-center sm:text-left">
                                <p className="text-[10px] text-luxury-stone uppercase tracking-widest mb-4 font-bold">Luxury Support</p>
                                <div className="flex flex-col space-y-3 text-xs font-light">
                                    <Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link>
                                    <Link href="#" className="hover:text-primary transition-colors">Contact Boutique</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
