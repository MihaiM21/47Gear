"use client";

import { useEffect, useState } from "react";

function EuStarsIcon({ className = "h-5 w-5" }: { className?: string }) {
    const positions = [
        [16, 3],
        [22.5, 4.8],
        [27.2, 9.5],
        [29, 16],
        [27.2, 22.5],
        [22.5, 27.2],
        [16, 29],
        [9.5, 27.2],
        [4.8, 22.5],
        [3, 16],
        [4.8, 9.5],
        [9.5, 4.8],
    ];

    return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
            <g fill="#FDE047">
                {positions.map(([x, y], index) => (
                    <path
                        key={index}
                        transform={`translate(${x} ${y}) scale(0.7)`}
                        d="M0 -3 L0.88 -0.95 L3.24 -0.95 L1.33 0.37 L2.05 2.7 L0 1.4 L-2.05 2.7 L-1.33 0.37 L-3.24 -0.95 L-0.88 -0.95 Z"
                    />
                ))}
            </g>
        </svg>
    );
}

export default function MadeInEuPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        // Show the popup shortly after the page loads
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isDetailsOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsDetailsOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isDetailsOpen]);

    if (!isVisible) return null;

    return (
        <>
        {isMinimized ? (
            <button
                onClick={() => setIsMinimized(false)}
                className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500 h-12 w-12 rounded-full border border-blue-300/40 bg-gradient-to-br from-blue-600/95 to-blue-800/95 backdrop-blur-xl flex items-center justify-center shadow-[0_10px_28px_rgba(29,78,216,0.35)] hover:scale-[1.04] hover:shadow-[0_14px_34px_rgba(29,78,216,0.45)] transition-all cursor-pointer group"
                aria-label="Expand Made in EU info"
            >
                <EuStarsIcon className="h-6 w-6" />
            </button>
        ) : (
            <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="relative flex max-w-[250px] items-center gap-3 rounded-2xl border border-blue-300/35  p-3 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-300 hover:border-yellow-300/40">
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Minimize popup"
                    >
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-yellow-300/45 bg-gradient-to-br from-blue-500/90 to-blue-700/90 shadow-inner">
                        <EuStarsIcon className="h-7 w-7" />
                    </div>
                    <button
                        onClick={() => setIsDetailsOpen(true)}
                        className="flex flex-col pr-2 text-left"
                        aria-label="Deschide informatii despre produs in UE"
                    >
                        <span className="text-sm font-semibold tracking-wide text-white">Produs in UE</span>
                        <span className="mt-0.5 text-xs text-white/75">Calitate garantata</span>
                    </button>
                </div>
            </div>
        )}
        {isDetailsOpen && (
            <div
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
                onClick={() => setIsDetailsOpen(false)}
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="eu-details-title"
                    className="w-full max-w-md rounded-3xl border border-white/15 bg-white/[0.07] shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="p-6 md:p-7">
                        

                        <h3 id="eu-details-title" className="mt-5 text-xl font-semibold tracking-tight text-white">
                            Calitate premium in standard european
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-white/75 text-justify">
                            Fiecare mousepad este produs in UE cu materiale atent selectate si control al calitatii in fiecare etapa.
                            Rezultatul este o suprafata consistenta, durabila si placuta la utilizare, gandita pentru performanta pe termen lung.
                        </p>

                        <div className="mt-5 space-y-2.5 text-sm text-white/80">
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary/90" />
                                <span>Materiale testate pentru uz intens zilnic</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary/90" />
                                <span>Finisaje premium si control riguros al productiei</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary/90" />
                                <span>Livrare rapida din stocuri locale</span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsDetailsOpen(false)}
                                className="rounded-full border border-white/25 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                            >
                                Am inteles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
