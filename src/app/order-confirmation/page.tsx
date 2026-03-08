"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Package, Truck, MapPin, Home, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

const ORDER_ID = `NYK${Math.floor(100000000 + Math.random() * 900000000)}`;

const trackingSteps = [
    { icon: CheckCircle, label: "Order Confirmed", sub: "Just now", done: true },
    { icon: Package, label: "Processing", sub: "In 2 hours", done: false },
    { icon: Truck, label: "Out for Delivery", sub: "Tomorrow", done: false },
    { icon: MapPin, label: "Delivered", sub: "2-3 Days", done: false },
];

export default function OrderConfirmationPage() {
    const router = useRouter();
    const [orderId] = useState(ORDER_ID);
    const [showContent, setShowContent] = useState(false);
    const [isTracking, setIsTracking] = useState(false);
    const [toast, setToast] = useState("");
    const trackingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const t = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleTrackOrder = () => {
        setIsTracking(true);
        setToast("✓ Tracking Updated");

        trackingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
            setIsTracking(false);
            setTimeout(() => setToast(""), 2000);
        }, 1500);
    };

    return (
        <div className="bg-background min-h-screen pb-36">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] bg-white/95 backdrop-blur-md h-14 flex items-center justify-center px-4 border-b border-muted/30">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-stone">Order Placed</span>
            </div>

            {/* Toast */}
            {toast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-foreground text-white text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-full shadow-2xl animate-fadeIn font-bold">
                    {toast}
                </div>
            )}

            <div className={`pt-14 transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {/* Hero Confirmation */}
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-gradient-to-b from-primary/5 to-transparent">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle size={48} strokeWidth={1.5} className="text-primary" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                            <Sparkles size={14} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-brand font-bold mb-2">Order Confirmed!</h1>
                    <p className="text-xs text-luxury-stone font-light leading-relaxed max-w-xs">
                        Your luxury piece has been confirmed. We'll notify you when it's on its way.
                    </p>
                    <div className="mt-4 bg-white border border-muted rounded-full px-6 py-2 shadow-sm">
                        <p className="text-[9px] uppercase tracking-widest text-luxury-stone font-bold">Order ID</p>
                        <p className="text-sm font-brand font-bold text-foreground">{orderId}</p>
                    </div>
                </div>

                {/* Estimated Delivery */}
                <div className="mx-4 mb-4 p-5 bg-white rounded-xl border border-muted/40 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Estimated Delivery</span>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Free Express</span>
                    </div>
                    <p className="text-lg font-brand font-bold text-foreground">
                        {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                </div>

                {/* Live Tracking Timeline */}
                <div ref={trackingRef} className="mx-4 mb-4 p-5 bg-white rounded-xl border border-muted/40 shadow-sm relative overflow-hidden">
                    {isTracking && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-[20] flex items-center justify-center animate-fadeIn">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Updating Status...</p>
                            </div>
                        </div>
                    )}

                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-5">Track Your Order</p>
                    <div className="relative">
                        {/* Progress line */}
                        <div className="absolute left-4 top-4 bottom-4 w-px bg-muted/50" />
                        <div className="absolute left-4 top-4 w-px bg-primary transition-all duration-1000" style={{ height: "12%" }} />

                        <div className="space-y-6">
                            {trackingSteps.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <div key={i} className="flex items-start gap-4 relative">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 ${step.done ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-muted text-luxury-stone/40"}`}>
                                            <Icon size={14} />
                                        </div>
                                        <div className="pt-1">
                                            <p className={`text-xs font-bold ${step.done ? "text-foreground" : "text-luxury-stone/50"}`}>{step.label}</p>
                                            <p className={`text-[10px] ${step.done ? "text-primary" : "text-luxury-stone/40"}`}>{step.sub}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mx-4 mb-4 bg-white rounded-xl border border-muted/40 shadow-sm divide-y divide-muted/30">
                    <Link href="/" className="flex items-center justify-between p-4 hover:bg-muted/20 transition-colors">
                        <span className="text-xs font-medium">Continue Shopping</span>
                        <ChevronRight size={16} className="text-luxury-stone" />
                    </Link>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors"
                    >
                        <span className="text-xs font-medium">Go to Home</span>
                        <ChevronRight size={16} className="text-luxury-stone" />
                    </button>
                </div>

                {/* Nykaa Promise */}
                <div className="mx-4 mb-4 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                    <Sparkles size={16} className="text-primary mx-auto mb-2" />
                    <p className="text-[9px] uppercase tracking-widest font-bold text-primary">The Nykaa Fashion Promise</p>
                    <p className="text-[10px] text-luxury-stone mt-1 leading-relaxed font-light">
                        100% authentic luxury. Free returns within 30 days. Premium packaging included.
                    </p>
                </div>
            </div>

            {/* Sticky Bottom */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[110] bg-white/95 backdrop-blur-md border-t border-muted p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
                <div className="flex gap-3 h-12">
                    <button
                        onClick={() => router.push("/")}
                        className="flex-1 tap-target border border-foreground text-foreground text-[9px] uppercase tracking-widest font-bold active:bg-muted transition-all rounded-sm"
                    >
                        <Home size={14} className="inline mr-1" />
                        Home
                    </button>
                    <button
                        onClick={handleTrackOrder}
                        className="flex-[2] tap-target bg-primary text-white text-[9px] uppercase tracking-widest font-bold active:bg-primary/90 transition-all shadow-lg shadow-primary/20 rounded-sm"
                    >
                        <Truck size={14} className="inline mr-1" />
                        Track My Order
                    </button>
                </div>
            </div>
        </div>
    );
}
