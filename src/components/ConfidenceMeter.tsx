"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Info } from "lucide-react";

interface ConfidenceMeterProps {
    score: number;
    label?: string;
}

export const ConfidenceMeter = ({ score, label = "Confidence Score" }: ConfidenceMeterProps) => {
    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayScore(score);
        }, 500);
        return () => clearTimeout(timer);
    }, [score]);

    return (
        <div className="bg-white rounded-lg p-5 border border-luxury-stone/10 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <ShieldCheck size={18} className="text-primary" />
                    <span className="text-xs uppercase tracking-widest font-semibold">{label}</span>
                </div>
                <button className="text-luxury-stone hover:text-foreground transition-colors">
                    <Info size={14} />
                </button>
            </div>

            <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000 ease-out"
                    style={{ width: `${displayScore}%` }}
                />
            </div>

            <div className="flex justify-between items-end gap-4">
                <span className="text-3xl font-brand font-bold">{displayScore}%</span>
                <span className="text-[9px] uppercase tracking-wider text-luxury-stone flex-1 text-right leading-relaxed font-semibold">
                    Based on verified purchases & AI analysis
                </span>
            </div>
        </div>
    );
};
