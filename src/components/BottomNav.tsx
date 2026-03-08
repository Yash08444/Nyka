"use client";

import { Home, Search, ShoppingBag, User, Star, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChat } from "@/context/ChatContext";
import { useCart } from "@/context/CartContext";

export const BottomNav = () => {
    const pathname = usePathname();
    const { openChat } = useChat();
    const { totalItems } = useCart();

    // Hide BottomNav on Product Detail Pages to focus on Add to Bag actions
    const isPDP = pathname?.startsWith("/product/");
    if (isPDP) return null;

    const navItems = [
        { label: "Home", icon: Home, path: "/" },
        { label: "Search", icon: Search, action: "search" },
        { label: "Chat", icon: MessageCircle, action: "chat" },
        { label: "Bag", icon: ShoppingBag, path: "/cart", count: totalItems },
        { label: "Account", icon: User, path: "/profile" },
    ];

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] bg-white/95 backdrop-blur-lg border-t border-muted/50 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-5 h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    const content = (
                        <div className="flex flex-col items-center justify-center space-y-1 relative h-full w-full">
                            <div className={`transition-all duration-200 ${isActive ? "text-primary scale-110" : "text-luxury-stone"}`}>
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`text-[9px] font-bold tracking-wider uppercase transition-colors ${isActive ? "text-primary" : "text-luxury-stone"}`}>
                                {item.label}
                            </span>

                            {(item.count ?? 0) > 0 && (
                                <span className="absolute top-2.5 right-[20%] w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">
                                    {item.count}
                                </span>
                            )}

                            {isActive && (
                                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full shadow-[0_2px_8px_rgba(252,39,121,0.4)]" />
                            )}
                        </div>
                    );

                    if (item.action === "search") {
                        return (
                            <button key={item.label} className="tap-target active-scale flex items-center justify-center">
                                {content}
                            </button>
                        );
                    }

                    if (item.action === "chat") {
                        return (
                            <button
                                key={item.label}
                                onClick={openChat}
                                className="tap-target active-scale flex items-center justify-center"
                            >
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.label}
                            href={item.path || "#"}
                            className="tap-target active-scale flex items-center justify-center"
                        >
                            {content}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
