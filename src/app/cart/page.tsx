"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, ChevronLeft, Trash2, PackageCheck, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
    const { items, removeFromCart, totalItems } = useCart();
    const router = useRouter();
    const [savedMsg, setSavedMsg] = useState("");

    const showToast = (msg: string) => {
        setSavedMsg(msg);
        setTimeout(() => setSavedMsg(""), 2500);
    };

    const subtotal = items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[₹,]/g, ""));
        return sum + price * item.quantity;
    }, 0);

    return (
        <div className="bg-background min-h-screen pb-36">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] bg-white/95 backdrop-blur-md h-14 flex items-center px-4 border-b border-muted/30">
                <button onClick={() => router.back()} className="p-2 -ml-2 text-foreground">
                    <ChevronLeft size={22} />
                </button>
                <div className="flex-1 text-center pr-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-stone">
                        My Bag {totalItems > 0 && `(${totalItems})`}
                    </span>
                </div>
            </div>

            <div className="pt-14">
                {items.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center">
                        <div className="w-20 h-20 bg-muted/40 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag size={36} className="text-luxury-stone/40" />
                        </div>
                        <h2 className="text-xl font-brand font-bold mb-2">Your Bag is Empty</h2>
                        <p className="text-xs text-luxury-stone font-light leading-relaxed mb-8">
                            Discover our curated luxury collection and add your favourites here.
                        </p>
                        <Link
                            href="/"
                            className="bg-primary text-white text-[10px] uppercase tracking-widest font-bold px-10 py-4 rounded-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            Explore Collection
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Items List */}
                        <div className="divide-y divide-muted/30">
                            {items.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4">
                                    <div className="w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-muted">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[8px] uppercase tracking-[0.25em] text-primary font-bold mb-1">{item.brand}</p>
                                        <h3 className="text-[12px] font-medium text-foreground leading-tight line-clamp-2 mb-1">{item.name}</h3>
                                        {item.size && (
                                            <p className="text-[9px] text-luxury-stone uppercase tracking-widest font-medium mb-2">
                                                Size: <span className="font-bold text-foreground">{item.size}</span>
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-brand font-bold">{item.price}</p>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-luxury-stone/50 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        {item.quantity > 1 && (
                                            <p className="text-[9px] text-luxury-stone">Qty: {item.quantity}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mx-4 mt-6 p-5 bg-muted/20 rounded-lg border border-muted/40">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 text-foreground">Order Summary</h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between text-luxury-stone">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-luxury-stone">
                                    <span>Shipping</span>
                                    <span className="font-bold text-green-600">Free</span>
                                </div>
                                <div className="border-t border-muted/40 pt-3 flex justify-between font-bold text-sm">
                                    <span>Total</span>
                                    <span className="text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mx-4 mt-4 flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
                            <PackageCheck size={14} className="text-green-600 flex-shrink-0" />
                            <p className="text-[9px] uppercase tracking-widest font-bold text-green-700">
                                Free Express Delivery on Orders Above ₹999
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Sticky Bottom Action Bar */}
            {items.length > 0 && (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[110] bg-white/95 backdrop-blur-md border-t border-muted p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
                    <div className="flex gap-3 h-12">
                        <button
                            onClick={() => showToast("✓ Saved to Wishlist")}
                            className="flex-1 tap-target border border-foreground text-foreground text-[9px] uppercase tracking-widest font-bold active:bg-muted transition-all rounded-sm flex items-center justify-center gap-1"
                        >
                            <Heart size={11} />
                            Save for Later
                        </button>
                        <button
                            onClick={() => router.push("/checkout")}
                            className="flex-[2] tap-target bg-primary text-white text-[9px] uppercase tracking-widest font-bold active:bg-primary/90 transition-all shadow-lg shadow-primary/20 rounded-sm"
                        >
                            Checkout → ₹{subtotal.toLocaleString("en-IN")}
                        </button>
                    </div>
                </div>
            )}
            {/* In-App Toast */}
            {savedMsg && (
                <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[200] bg-foreground text-white text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full shadow-xl animate-fadeIn font-bold">
                    {savedMsg}
                </div>
            )}
        </div>
    );
}
