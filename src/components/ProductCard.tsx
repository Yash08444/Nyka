"use client";

import { useState } from "react";
import { Heart, Plus, Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
    id: string;
    name: string;
    brand: string;
    price: string;
    image: string;
    hoverImage?: string;
}

export const ProductCard = ({ id, name, brand, price, image, hoverImage }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group flex flex-col h-full bg-white rounded-md overflow-hidden transition-all duration-300 active:shadow-md border border-muted/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${id}`} className="relative aspect-[3/4] overflow-hidden bg-muted block">
                <img
                    src={isHovered && hoverImage ? hoverImage : image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700"
                />

                {/* Wishlist Button - Always visible in shell */}
                <button className="absolute top-2 right-2 tap-target p-2 bg-white/70 backdrop-blur-sm rounded-full text-foreground/70 active:text-primary transition-colors">
                    <Heart size={18} />
                </button>

                {/* Quick Add Overlay - Disabled for pure mobile shell in favor of Plus button */}
            </Link>

            <div className="p-2 md:p-3 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-primary truncate max-w-[70%]">{brand}</span>
                    <div className="flex items-center text-luxury-gold pt-0.5">
                        <Star size={9} className="fill-current" />
                        <span className="text-[9px] font-bold ml-0.5 text-luxury-stone">4.8</span>
                    </div>
                </div>

                <Link href={`/product/${id}`} className="block mb-2">
                    <h3 className="text-[10px] font-medium text-foreground line-clamp-2 leading-tight hover:text-primary transition-colors">{name}</h3>
                </Link>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs font-brand font-bold text-foreground">{price}</span>
                    <button className="tap-target p-2 -mr-2 text-primary active:scale-90 transition-transform">
                        <Plus size={18} />
                    </button>
                </div>

                {/* Trust Badge - Always visible in shell */}
                <div className="mt-2 flex">
                    <span className="text-[8px] bg-primary/5 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/10">
                        AI Verified Fit
                    </span>
                </div>
            </div>
        </div>
    );
};
