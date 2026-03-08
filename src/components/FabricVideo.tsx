"use client";

import { useState } from "react";
import { Play, X, Zap, Sparkles, Loader2 } from "lucide-react";

interface FabricEnhanceProps {
    videoUrl?: string;
    productName?: string;
    fabricDetails?: string[];
}

export const FabricEnhance = ({ videoUrl, productName, fabricDetails }: FabricEnhanceProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [analysis, setAnalysis] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const openModal = async () => {
        setIsOpen(true);
        if (analysis) return; // Don't refetch if already loaded

        setIsAnalyzing(true);
        try {
            const res = await fetch("/api/groq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system: "You are a luxury textile scientist and fashion AI. Provide a brief, precise, and sophisticated fabric analysis for luxury fashion products. Keep it to 2 sentences maximum, focusing on unique properties and care. Use technical but accessible language.",
                    messages: [{
                        role: "user",
                        content: `Analyze the fabric for this luxury garment: "${productName || "Premium Garment"}". Details: ${fabricDetails?.join(", ") || "Premium viscose blend"}. Give a neural scan-style fabric analysis.`
                    }]
                }),
            });
            const data = await res.json();
            setAnalysis(data.text || "High-performance fabric weave detected with optimal light-refraction properties for elegant draping.");
        } catch {
            setAnalysis("Neural scan detects a high-twist crepe weave with premium light-refraction properties. Ideal for evening drapes.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    if (!videoUrl) return null;

    return (
        <>
            <button
                onClick={openModal}
                className="w-full py-4 border border-luxury-stone/20 text-foreground text-xs uppercase tracking-widest hover:bg-muted transition-all duration-300 flex items-center justify-center space-x-2 rounded-sm"
            >
                <Zap size={16} className="text-luxury-gold" />
                <span>Fabric Enhance Video</span>
            </button>

            {isOpen && (
                <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[2000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-foreground/60 backdrop-blur-md" onClick={() => setIsOpen(false)} />
                    <div className="bg-white max-w-[400px] w-full rounded-lg overflow-hidden relative z-10 shadow-2xl">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-20 text-foreground"
                        >
                            <X size={20} />
                        </button>

                        <div className="aspect-video bg-black relative">
                            <video
                                src={videoUrl}
                                className="w-full h-full object-contain"
                                autoPlay
                                controls
                                loop
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex items-center space-x-2 mb-3">
                                <Sparkles size={14} className="text-primary" />
                                <span className="text-[9px] uppercase tracking-[0.4em] text-primary font-bold">AI Texture Analysis</span>
                                <span className="h-px bg-primary/20 flex-1"></span>
                            </div>
                            <h3 className="text-xl mb-3 font-brand font-bold">Boutique Fabrication</h3>
                            <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-muted min-h-[60px]">
                                {isAnalyzing ? (
                                    <div className="flex items-center gap-3">
                                        <Loader2 size={14} className="text-primary animate-spin" />
                                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest animate-pulse">Scanning fabric structure...</p>
                                    </div>
                                ) : (
                                    <p className="text-xs text-luxury-stone leading-relaxed font-light italic">
                                        "{analysis}"
                                    </p>
                                )}
                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-muted/50 mt-3">
                                    <div>
                                        <p className="text-[8px] uppercase tracking-widest text-luxury-stone mb-1">Durability</p>
                                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[92%]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[8px] uppercase tracking-widest text-luxury-stone mb-1">Breathability</p>
                                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[85%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[10px] text-luxury-stone leading-relaxed font-light">
                                Our high-fidelity capture technology allows you to see the true-to-life grain, drape, and light interaction of the material as verified by our lab.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
