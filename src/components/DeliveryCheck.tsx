"use client";

import { useState } from "react";
import { MapPin, CheckCircle2 } from "lucide-react";

export const DeliveryCheck = () => {
    const [zipCode, setZipCode] = useState("");
    const [status, setStatus] = useState<"idle" | "checking" | "success">("idle");

    const handleCheck = () => {
        if (zipCode.length === 6) {
            setStatus("checking");
            setTimeout(() => setStatus("success"), 1000);
        }
    };

    return (
        <div className="py-6 border-y border-muted my-8">
            <div className="flex items-center space-x-2 mb-4">
                <MapPin size={16} className="text-luxury-stone" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Delivery Options</span>
            </div>

            <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Enter Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="w-full bg-muted/30 border border-muted rounded-sm h-14 px-4 text-xs font-light focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                    {status === "success" && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
                            <CheckCircle2 size={16} />
                        </div>
                    )}
                </div>
                <button
                    onClick={handleCheck}
                    disabled={zipCode.length < 6 || status === "checking"}
                    className="px-6 h-14 bg-foreground text-white text-[10px] uppercase tracking-widest font-bold rounded-sm disabled:opacity-50 hover:bg-black transition-colors"
                >
                    {status === "checking" ? "Checking..." : "Check"}
                </button>
            </div>

            {status === "success" && (
                <div className="mt-4 space-y-2">
                    <p className="text-[11px] text-green-600 font-medium">Free delivery within 2-3 business days.</p>
                    <p className="text-[10px] text-luxury-stone font-light italic">Express shipping available for this location.</p>
                </div>
            )}
        </div>
    );
};
