"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

const recommendedProducts = [
    {
        id: "2",
        name: "Tropical Print Viscose Kurta",
        brand: "The Kaftan Company",
        price: "₹2,450",
        image: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20and%20Green%20Tropical%20Print%20Viscose%20Kurta/1.png"
    },
    {
        id: "3",
        name: "Blue Floral Hooded Lounge Dress",
        brand: "The Kaftan Company",
        price: "₹2,800",
        image: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20Floral%20Hooded%20Lounge%20Dress/1.png"
    },
    {
        id: "4",
        name: "Yellow Floral Maternity Dress",
        brand: "The Kaftan Company",
        price: "₹3,200",
        image: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Yellow%20Floral%20Maternity%20And%20Feeding%20Dress/1.png"
    }
];

export const RecommendedProducts = () => {
    return (
        <section className="py-12 bg-white">
            <div className="px-4 mb-6 flex items-center justify-between">
                <div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold block mb-1">Curated For You</span>
                    <h2 className="text-xl font-brand font-bold">You May Also Like</h2>
                </div>
                <button className="text-[10px] uppercase tracking-widest font-bold text-luxury-stone hover:text-primary transition-colors flex items-center gap-1">
                    View All <ChevronRight size={12} />
                </button>
            </div>

            <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-4">
                {recommendedProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="flex-shrink-0 w-[150px] group"
                    >
                        <div className="aspect-[3/4] overflow-hidden rounded-sm mb-3 bg-muted">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] uppercase tracking-[0.2em] text-luxury-stone font-bold leading-tight">
                                {product.brand}
                            </p>
                            <h3 className="text-[11px] font-medium text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors min-h-[28px]">
                                {product.name}
                            </h3>
                            <p className="text-[12px] font-bold text-foreground">
                                {product.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
