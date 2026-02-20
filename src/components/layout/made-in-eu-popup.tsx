"use client";

import { useEffect, useState } from "react";

export default function MadeInEuPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        // Show the popup shortly after the page loads
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    if (isMinimized) {
        return (
            <button
                onClick={() => setIsMinimized(false)}
                className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-full w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-400/30 flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-blue-500/20 transition-all cursor-pointer group"
                aria-label="Expand Made in EU info"
            >
                <span className="text-sm font-bold text-yellow-400 tracking-wider group-hover:animate-pulse" aria-hidden="true">EU</span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center gap-3 shadow-elegant-lg max-w-[240px] relative group hover:border-blue-500/30 transition-colors duration-300">
                <button
                    onClick={() => setIsMinimized(true)}
                    className="absolute -top-2 -right-2 bg-black border border-white/10 rounded-full w-6 h-6 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors z-10 opacity-0 group-hover:opacity-100"
                    aria-label="Minimize popup"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="shrink-0 bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-400/30 rounded-full w-10 h-10 flex items-center justify-center shadow-inner animate-pulse">
                    <span className="text-sm font-bold text-yellow-400 tracking-wider" aria-hidden="true">EU</span>
                </div>
                <div className="flex flex-col pr-2">
                    <span className="text-white text-sm font-semibold tracking-wide">Produs în UE</span>
                    <span className="text-white/50 text-xs mt-0.5">Calitate garantată</span>
                </div>
            </div>
        </div>
    );
}
