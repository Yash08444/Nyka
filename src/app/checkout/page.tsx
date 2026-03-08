"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, CreditCard, Tag, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, totalItems } = useCart();
    const router = useRouter();
    const [isPlacing, setIsPlacing] = useState(false);

    const subtotal = items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[₹,]/g, ""));
        return sum + price * item.quantity;
    }, 0);

    const handlePlaceOrder = () => {
        setIsPlacing(true);
        // Simulate a brief processing delay then navigate
        setTimeout(() => {
            router.push("/order-confirmation");
        }, 1200);
    };

    return (
        <div className="bg-background min-h-screen pb-36">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] bg-white/95 backdrop-blur-md h-14 flex items-center px-4 border-b border-muted/30">
                <button onClick={() => router.back()} className="p-2 -ml-2 text-foreground">
                    <ChevronLeft size={22} />
                </button>
                <div className="flex-1 text-center pr-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-stone">
                        Checkout · {totalItems} {totalItems === 1 ? "item" : "items"}
                    </span>
                </div>
            </div>

            <div className="pt-14 space-y-3">
                {/* Delivery Address */}
                <div className="bg-white mx-4 mt-4 p-5 rounded-xl border border-muted/40">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin size={16} className="text-primary flex-shrink-0" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Delivery Address</span>
                    </div>
                    <div className="space-y-2">
                        <input type="text" placeholder="Full Name" className="w-full bg-muted/30 border-b border-muted py-2.5 px-1 text-sm focus:border-primary outline-none transition-colors" />
                        <input type="text" placeholder="Phone Number" className="w-full bg-muted/30 border-b border-muted py-2.5 px-1 text-sm focus:border-primary outline-none transition-colors" />
                        <input type="text" placeholder="Address Line 1" className="w-full bg-muted/30 border-b border-muted py-2.5 px-1 text-sm focus:border-primary outline-none transition-colors" />
                        <div className="flex gap-3">
                            <input type="text" placeholder="City" className="flex-1 bg-muted/30 border-b border-muted py-2.5 px-1 text-sm focus:border-primary outline-none transition-colors" />
                            <input type="text" placeholder="PIN Code" className="flex-1 bg-muted/30 border-b border-muted py-2.5 px-1 text-sm focus:border-primary outline-none transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white mx-4 p-5 rounded-xl border border-muted/40">
                    <div className="flex items-center gap-3 mb-4">
                        <Tag size={16} className="text-primary flex-shrink-0" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Your Order ({totalItems})</span>
                    </div>
                    <div className="space-y-3">
                        {items.map(item => (
                            <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                                <div className="w-12 h-14 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-medium text-foreground truncate">{item.name}</p>
                                    {item.size && <p className="text-[9px] text-luxury-stone uppercase tracking-widest">Size: {item.size}</p>}
                                    <p className="text-[9px] text-luxury-stone">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-sm font-bold flex-shrink-0">{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white mx-4 p-5 rounded-xl border border-muted/40">
                    <div className="flex items-center gap-3 mb-4">
                        <CreditCard size={16} className="text-primary flex-shrink-0" />
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Payment Method</span>
                    </div>
                    <div className="space-y-2">
                        {["UPI / PhonePe / GPay", "Credit / Debit Card", "Cash on Delivery"].map((method, i) => (
                            <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-muted cursor-pointer hover:border-primary transition-colors">
                                <input type="radio" name="payment" className="accent-primary" defaultChecked={i === 0} />
                                <span className="text-xs font-medium">{method}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white mx-4 p-5 rounded-xl border border-muted/40">
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between text-luxury-stone">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-luxury-stone">
                            <span>Shipping</span>
                            <span className="font-bold text-green-600">Free</span>
                        </div>
                        <div className="border-t border-muted/40 pt-3 flex justify-between font-bold text-sm">
                            <span>Total Payable</span>
                            <span className="text-primary">₹{subtotal.toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 py-4 px-4">
                    <div className="flex items-center gap-1.5 text-luxury-stone">
                        <ShieldCheck size={14} className="text-green-600" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">100% Secure</span>
                    </div>
                    <div className="w-px h-4 bg-muted" />
                    <div className="flex items-center gap-1.5 text-luxury-stone">
                        <Truck size={14} className="text-primary" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Free Returns</span>
                    </div>
                </div>
            </div>

            {/* Sticky Place Order Button */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[110] bg-white/95 backdrop-blur-md border-t border-muted p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
                <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacing}
                    className="w-full h-14 bg-primary text-white text-[10px] uppercase tracking-widest font-bold rounded-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                    {isPlacing ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        `Place Order · ₹${subtotal.toLocaleString("en-IN")}`
                    )}
                </button>
                <p className="text-[8px] text-center text-luxury-stone mt-2 uppercase tracking-widest font-bold opacity-50">
                    By placing order you agree to our Terms & Conditions
                </p>
            </div>
        </div>
    );
}
