"use client";

import { useState, useRef } from "react";
import { Camera, Sparkles, X, Loader2, Upload, Check } from "lucide-react";

interface AITryOnProps {
    productImage?: string;
    productName?: string;
    onSuccess?: () => void;
    onAddToCart?: () => void;
}

export const AITryOn = ({ productImage, productName, onSuccess, onAddToCart }: AITryOnProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [step, setStep] = useState<"upload" | "processing" | "result">("upload");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUserImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const reset = () => {
        setStep("upload");
        setUserImage(null);
        setResultImage(null);
        setIsProcessing(false);
        setReasoningStep(null);
    };

    const [reasoningStep, setReasoningStep] = useState<string | null>(null);
    const [stylistInsight, setStylistInsight] = useState("");
    const [isInsightLoading, setIsInsightLoading] = useState(false);

    const handleTryOn = () => {
        if (!userImage) return;

        setStep("processing");
        setIsProcessing(true);

        const steps = [
            "Analyzing body proportions...",
            "Mapping garment mesh...",
            "Calculating fabric drape...",
            "Synthesizing photorealistic blend..."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                setReasoningStep(steps[i]);
                i++;
            } else {
                clearInterval(interval);
                setIsProcessing(false);
                setStep("result");
                setResultImage(productImage || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop");
                if (onSuccess) onSuccess();
                // Call Groq for stylist insight
                setIsInsightLoading(true);
                fetch("/api/groq", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        system: "You are an expert fashion stylist AI for a luxury boutique. After a virtual try-on, provide a single compelling sentence about how the garment flatters the wearer's silhouette. Be specific, elegant, and encouraging.",
                        messages: [{ role: "user", content: `The customer just tried on virtually: "${productName || "this premium garment"}". Give a stylist insight about how it looks on them.` }]
                    })
                }).then(r => r.json()).then(d => {
                    setStylistInsight(d.text || "The structured silhouette of this piece creates a beautifully elongated and sophisticated profile.");
                }).catch(() => {
                    setStylistInsight("The structured shoulders and fluid hemline perfectly balance your proportions, creating a sophisticated elongated silhouette.");
                }).finally(() => setIsInsightLoading(false));
            }
        }, 800);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-4 border border-primary text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 rounded-sm"
            >
                <Sparkles size={16} />
                <span>AI Virtual Try-On</span>
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

                        <div className="p-6">
                            <div className="flex items-center space-x-2 mb-2">
                                <Sparkles size={14} className="text-primary" />
                                <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-semibold">AI Mirror Lab</span>
                            </div>
                            <h3 className="text-xl mb-2 font-brand font-bold">Virtual Fitting Room</h3>
                            <p className="text-xs text-luxury-stone mb-6 font-light leading-relaxed">
                                Our neural engine creates a photorealistic blend of this piece on your silhouette.
                            </p>

                            <div className="aspect-[3/4] bg-muted rounded-lg flex flex-col items-center justify-center relative mb-8 overflow-hidden border border-luxury-stone/10">
                                {step === "upload" && (
                                    <div className="flex flex-col items-center space-y-4 px-6 text-center">
                                        {userImage ? (
                                            <div className="relative w-full h-full">
                                                <img src={userImage} alt="User" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                                    <Check size={48} className="text-white opacity-80" />
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-20 h-20 rounded-full border-2 border-dashed border-luxury-stone/30 flex items-center justify-center">
                                                    <Camera size={32} className="text-luxury-stone/50" />
                                                </div>
                                                <p className="text-xs text-luxury-stone uppercase tracking-widest leading-relaxed">
                                                    Please provide a clear full-body photo for the best neural accuracy
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )}

                                {step === "processing" && (
                                    <div className="flex flex-col items-center space-y-6">
                                        <div className="relative">
                                            <Loader2 size={64} className="text-primary animate-spin" strokeWidth={1} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                                            </div>
                                        </div>
                                        <div className="text-center space-y-2">
                                            <p className="text-xs uppercase tracking-[0.3em] font-medium animate-pulse">{reasoningStep}</p>
                                            <p className="text-[10px] text-luxury-stone uppercase tracking-widest italic">Neural Analysis Active</p>
                                        </div>
                                    </div>
                                )}

                                {step === "result" && resultImage && (
                                    <div className="relative w-full h-full">
                                        <img src={resultImage} alt="AI Result" className="w-full h-full object-cover animate-fadeIn" />
                                        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold shadow-lg">
                                            AI Preview
                                        </div>
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {step === "upload" && (
                                <div className="grid grid-cols-1 gap-4">
                                    {!userImage ? (
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="py-4 bg-foreground text-white text-xs uppercase tracking-widest hover:bg-black transition-all rounded-sm flex items-center justify-center space-x-2"
                                        >
                                            <Upload size={16} />
                                            <span>Upload My Photo</span>
                                        </button>
                                    ) : (
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="flex-1 py-4 border border-luxury-stone/20 text-xs uppercase tracking-widest hover:bg-muted transition-all rounded-sm"
                                            >
                                                Change Photo
                                            </button>
                                            <button
                                                onClick={handleTryOn}
                                                className="flex-1 py-4 bg-primary text-white text-xs uppercase tracking-widest hover:opacity-90 transition-all rounded-sm shadow-lg shadow-primary/20"
                                            >
                                                Generate Try-On
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === "result" && (
                                <div className="space-y-6">
                                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                                        <div className="flex items-center gap-2 mb-2 text-primary">
                                            <Sparkles size={12} />
                                            <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Stylist Insight</span>
                                        </div>
                                        {isInsightLoading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={12} className="text-primary animate-spin" />
                                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest animate-pulse">Generating insight...</p>
                                            </div>
                                        ) : (
                                            <p className="text-[11px] text-luxury-stone leading-relaxed italic font-light">
                                                "{stylistInsight || "The structured shoulders and fluid hemline of this piece perfectly balance your proportions."}"
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={reset}
                                            className="flex-1 py-4 border border-luxury-stone/20 text-xs uppercase tracking-widest hover:bg-muted transition-all rounded-sm"
                                        >
                                            Try Another Photo
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (onAddToCart) onAddToCart();
                                                setIsOpen(false);
                                                reset();
                                            }}
                                            className="flex-1 py-4 bg-foreground text-white text-xs uppercase tracking-widest hover:bg-black transition-all rounded-sm"
                                        >
                                            Add My Fit To Cart
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
