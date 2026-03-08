"use client";

import { useState } from "react";
import {
    User,
    Settings,
    ShoppingBag,
    Heart,
    MapPin,
    CreditCard,
    LogOut,
    ChevronRight,
    Sparkles,
    Ruler,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    // Mock user data
    const [user, setUser] = useState({
        name: "Yash Saxena",
        email: "yash.saxena@example.com",
        memberSince: "March 2024",
        tier: "Platinum Member",
        measurements: {
            height: "175 cm",
            weight: "72 kg"
        }
    });

    const menuItems = [
        { icon: ShoppingBag, label: "My Orders", path: "/orders" },
        { icon: Heart, label: "Wishlist", path: "/wishlist" },
        { icon: MapPin, label: "Saved Addresses", path: "/addresses" },
        { icon: CreditCard, label: "Saved Cards", path: "/payments" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <div className="bg-background min-h-screen pb-24">
            {/* Header Section */}
            <div className="relative pt-12 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent -z-10" />

                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl border border-primary/20 relative">
                            <div className="w-full h-full rounded-full bg-luxury-cream flex items-center justify-center text-primary overflow-hidden">
                                <User size={48} strokeWidth={1} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                                <Sparkles size={12} fill="currentColor" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-brand font-bold text-foreground mb-1 tracking-tight">
                        {user.name}
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">
                        {user.tier}
                    </p>

                    <div className="flex items-center space-x-2 text-luxury-stone font-light text-xs">
                        <span>{user.email}</span>
                        <span className="w-1 h-1 rounded-full bg-muted/50" />
                        <span>Since {user.memberSince}</span>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
                <div className="absolute bottom-10 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 blur-2xl" />
            </div>

            <div className="px-5 space-y-6 -mt-10 relative z-10">
                {/* AI Measurements Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-black/5 border border-white">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                <Ruler size={18} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-sm font-brand font-bold">Neural Fit Profile</h3>
                                <p className="text-[9px] uppercase tracking-widest text-primary/60 font-medium">Syncing with AI Predictor</p>
                            </div>
                        </div>
                        <button className="text-[9px] uppercase tracking-widest font-bold text-primary hover:opacity-80 transition-all border-b border-primary/20 pb-0.5">
                            Update
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/30 rounded-xl p-4 border border-muted/50">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-stone font-bold mb-1">Height</p>
                            <p className="text-lg font-serif font-bold text-foreground">{user.measurements.height}</p>
                        </div>
                        <div className="bg-muted/30 rounded-xl p-4 border border-muted/50">
                            <p className="text-[9px] uppercase tracking-[0.2em] text-luxury-stone font-bold mb-1">Weight</p>
                            <p className="text-lg font-serif font-bold text-foreground">{user.measurements.weight}</p>
                        </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-muted/50 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-primary">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Verified by AI engine</span>
                        </div>
                        <div className="text-[10px] text-luxury-stone font-light italic">
                            98% prediction accuracy
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/[0.03] border border-muted/30">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`flex items-center justify-between px-6 py-5 hover:bg-muted/30 active:bg-muted/50 transition-all group ${index !== menuItems.length - 1 ? "border-b border-muted/30" : ""
                                }`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-luxury-stone group-hover:text-primary transition-colors">
                                    <item.icon size={20} strokeWidth={1.5} />
                                </div>
                                <span className="text-sm font-medium text-foreground">{item.label}</span>
                            </div>
                            <ChevronRight size={16} className="text-muted group-hover:text-primary transition-colors group-hover:translate-x-0.5" />
                        </Link>
                    ))}
                </div>

                {/* Logout Button */}
                <button className="w-full py-5 flex items-center justify-center space-x-3 text-luxury-stone hover:text-red-500 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">
                    <LogOut size={16} />
                    <span>Secure Sign Out</span>
                </button>
            </div>

            {/* Version Info */}
            <div className="mt-8 text-center">
                <p className="text-[9px] uppercase tracking-widest text-muted font-medium">Nykaa Fashion Luxury v2.4.0</p>
            </div>
        </div>
    );
}
