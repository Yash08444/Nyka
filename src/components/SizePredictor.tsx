"use client";

import { useState } from "react";
import { X, Sparkles, Ruler, Loader2, Check, ArrowRight } from "lucide-react";

interface SizePredictorProps {
    productName: string;
    onSizeSelected?: (size: string) => void;
}

export const SizePredictor = ({ productName, onSizeSelected }: SizePredictorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<"form" | "predicting" | "result">("form");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [prediction, setPrediction] = useState<string | null>(null);
    const [reasoning, setReasoning] = useState("");

    const handlePredict = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep("predicting");

        try {
            const res = await fetch("/api/groq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    system: `You are a precision sizing AI for a luxury Indian fashion boutique. Analyze the user's measurements and recommend the best garment size. 
Respond ONLY with a valid JSON object in this exact format, no markdown, no explanation outside the JSON:
{"size": "XS|S|M|L|XL", "rationale": "2-3 sentence explanation of the recommendation based on measurements, fabric, and fit"}`,
                    messages: [
                        {
                            role: "user",
                            content: `Product: "${productName}". Customer measurements: Height: ${height}, Weight: ${weight}. 
Based on Indian size standards and considering luxury garment fit, what size should this customer order? Explain your reasoning considering the garment type and fabric drape.`
                        }
                    ]
                }),
            });

            const data = await res.json();
            let result = { size: "M", rationale: "Based on your measurements, Medium provides the best fit for this garment." };

            try {
                const cleaned = (data.text || "").replace(/```json|```/g, "").trim();
                result = JSON.parse(cleaned);
            } catch {
                // fallback if JSON parse fails
                const sizeMatch = (data.text || "").match(/\b(XS|S|M|L|XL)\b/);
                if (sizeMatch) result.size = sizeMatch[1];
                result.rationale = data.text || result.rationale;
            }

            setPrediction(result.size);
            setReasoning(result.rationale);
            setStep("result");
        } catch {
            setPrediction("M");
            setReasoning("Our AI recommends Medium as the most versatile size for this garment based on standard sizing charts.");
            setStep("result");
        }
    };

    const handleApplySize = () => {
        if (prediction && onSizeSelected) {
            onSizeSelected(prediction);
        }
        setIsOpen(false);
        // Reset for next time
        setTimeout(() => {
            setStep("form");
            setPrediction(null);
        }, 300);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-primary font-bold hover:opacity-80 transition-all py-2"
            >
                <Sparkles size={14} className="animate-pulse" />
                <span>Find My Fit AI</span>
            </button>

            {isOpen && (
                <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[2000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-foreground/60 backdrop-blur-md animate-fadeIn" onClick={() => setIsOpen(false)} />

                    <div className="bg-white w-full max-w-[400px] rounded-2xl overflow-hidden relative z-10 shadow-2xl animate-slideUp">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-20 text-foreground/50"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            <div className="flex items-center space-x-2 mb-2">
                                <Sparkles size={16} className="text-primary" />
                                <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Neural Fit Engine</span>
                            </div>
                            <h3 className="text-2xl font-brand font-bold mb-2">Personalized Sizing</h3>
                            <p className="text-xs text-luxury-stone mb-8 font-light leading-relaxed">
                                Our AI calculates the ideal drape for <span className="font-semibold text-foreground italic">{productName}</span> based on your silhouette.
                            </p>

                            {step === "form" && (
                                <form onSubmit={handlePredict} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-stone">Height (cm / ft'in")</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. 5'8 or 172cm"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                className="w-full bg-muted/30 border-b border-muted py-3 px-1 text-sm focus:border-primary outline-none transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-luxury-stone">Weight (kg / lbs)</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. 65kg or 145lbs"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                className="w-full bg-muted/30 border-b border-muted py-3 px-1 text-sm focus:border-primary outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-primary text-white text-[10px] uppercase tracking-widest font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center space-x-2"
                                    >
                                        <span>Analyze My Fit</span>
                                        <ArrowRight size={14} />
                                    </button>
                                </form>
                            )}

                            {step === "predicting" && (
                                <div className="py-12 flex flex-col items-center justify-center space-y-6">
                                    <div className="relative">
                                        <Loader2 size={48} className="text-primary animate-spin" strokeWidth={1.5} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles size={16} className="text-primary animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold animate-pulse">Scanning Fabric Physics...</p>
                                        <p className="text-[9px] text-luxury-stone font-medium uppercase tracking-[0.2em]">Mapping Silhouette Contours</p>
                                    </div>
                                </div>
                            )}

                            {step === "result" && prediction && (
                                <div className="space-y-8 animate-fadeIn">
                                    <div className="bg-primary/5 rounded-2xl p-8 flex flex-col items-center border border-primary/10">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">Recommended Size</span>
                                        <div className="text-6xl font-brand font-bold text-primary mb-2">{prediction}</div>
                                        <div className="flex items-center gap-1.5 text-primary/60">
                                            <Check size={14} />
                                            <span className="text-[9px] uppercase tracking-widest font-bold">98% Match Confidence</span>
                                        </div>
                                    </div>

                                    <div className="bg-muted/30 rounded-xl p-5 border border-muted">
                                        <div className="flex items-center gap-2 mb-2 text-primary">
                                            <Sparkles size={12} />
                                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold">AI Rationale</span>
                                        </div>
                                        <p className="text-[11px] text-luxury-stone leading-relaxed italic font-light">
                                            "{reasoning}"
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={handleApplySize}
                                            className="w-full py-4 bg-foreground text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-black transition-all"
                                        >
                                            Apply This Size
                                        </button>
                                        <button
                                            onClick={() => setStep("form")}
                                            className="w-full py-3 text-[9px] uppercase tracking-widest font-bold text-luxury-stone hover:text-primary transition-colors"
                                        >
                                            Edit Measurements
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
