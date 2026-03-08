"use client";

import { useState } from "react";
import { Ruler, X } from "lucide-react";

export const SizeChart = () => {
    const [isOpen, setIsOpen] = useState(false);

    const sizes = [
        { label: "XS", bust: "32", waist: "26", hip: "35" },
        { label: "S", bust: "34", waist: "28", hip: "37" },
        { label: "M", bust: "36", waist: "30", hip: "39" },
        { label: "L", bust: "38", waist: "32", hip: "41" },
        { label: "XL", bust: "40", waist: "34", hip: "43" },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-luxury-stone hover:text-primary transition-colors"
            >
                <Ruler size={14} />
                <span>Size Guide</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="bg-white max-w-lg w-full rounded-lg overflow-hidden relative z-10 shadow-2xl p-5 md:p-8">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-2xl mb-6">Size Guide</h3>
                        <p className="text-sm text-luxury-stone mb-8 font-light">
                            Measurements are in inches. For the best fit, we recommend measuring over your undergarments.
                        </p>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-luxury-stone/10">
                                        <th className="py-4 text-[10px] uppercase tracking-widest font-semibold">Size</th>
                                        <th className="py-4 text-[10px] uppercase tracking-widest font-semibold">Bust</th>
                                        <th className="py-4 text-[10px] uppercase tracking-widest font-semibold">Waist</th>
                                        <th className="py-4 text-[10px] uppercase tracking-widest font-semibold">Hip</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sizes.map((size) => (
                                        <tr key={size.label} className="border-b border-luxury-stone/5 hover:bg-muted/30 transition-colors">
                                            <td className="py-4 font-medium">{size.label}</td>
                                            <td className="py-4 text-sm text-luxury-stone font-light">{size.bust}"</td>
                                            <td className="py-4 text-sm text-luxury-stone font-light">{size.waist}"</td>
                                            <td className="py-4 text-sm text-luxury-stone font-light">{size.hip}"</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 p-4 bg-muted/50 rounded-sm">
                            <p className="text-[10px] uppercase tracking-widest font-semibold mb-2 text-primary">AI Size Tip</p>
                            <p className="text-xs text-luxury-stone leading-relaxed font-light">
                                Our AI suggests a size <strong>M</strong> for your profile (5'6", 140lbs) for a comfortable, regular fit.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
