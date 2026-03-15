"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const CATEGORIES = [
    { id: 'cafes', label: 'Cafés', color: '#397dc1' },
    { id: 'streaming', label: 'Streaming', color: '#a898c9' },
    { id: 'domicilios', label: 'Domicilios', color: '#f36e53' }, // The Leak
    { id: 'transporte', label: 'Transporte', color: '#397dc1' },
    { id: 'compras', label: 'Compras impulsivas', color: '#a898c9' },
    { id: 'suscripciones', label: 'Suscripciones', color: '#d8a93f' }
];

const STATES = [
    { id: 1, message: "Mapeando transacciones..." },
    { id: 2, message: "Analizando patrones de gasto..." },
    { id: 3, message: "Anomalía detectada..." },
    { id: 4, message: "Fuga de dinero identificada" }
];

export default function LeakBuster() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.3 });
    const [state, setState] = useState(1);
    const timersRef = useRef<NodeJS.Timeout[]>([]);

    const clearAllTimers = () => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    };

    useEffect(() => {
        if (!isInView) {
            clearAllTimers();
            return;
        }

        const runCycle = () => {
            clearAllTimers();
            
            setState(1);
            timersRef.current.push(setTimeout(() => setState(2), 1500));
            timersRef.current.push(setTimeout(() => setState(3), 3000));
            timersRef.current.push(setTimeout(() => setState(4), 4500));
            
            // Wait 6s (end of state 4) + 2s pause = 8s
            timersRef.current.push(setTimeout(runCycle, 8000));
        };

        runCycle();

        return () => clearAllTimers();
    }, [isInView]);

    // Constant positions for context preservation
    const centerX = 450;
    const centerY = 350;
    const radius = 220;

    const categoryPositions = useMemo(() => {
        return CATEGORIES.map((cat, i) => {
            const angle = (i * (360 / CATEGORIES.length) - 90) * (Math.PI / 180);
            return {
                ...cat,
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            };
        });
    }, []);

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-transparent overflow-hidden">
            
            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">
                    Lukas Leak Buster
                </h2>
                <h3 className="text-white/60 text-lg md:text-xl font-medium max-w-[640px] mx-auto">
                    Lukas analiza automáticamente tus patrones de gasto y detecta fugas de dinero.
                </h3>
            </div>

            {/* AI Engine Container */}
            <div 
                ref={containerRef}
                className="relative w-full max-w-5xl mx-auto rounded-[24px] p-12 bg-black border border-white/5 overflow-hidden min-h-[750px] shadow-[0_0_100px_rgba(33,66,141,0.2)]"
                style={{ 
                    backgroundImage: 'radial-gradient(circle at center, #1e1b4b 0%, #000 100%)',
                }}
            >
                {/* Background Tech Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ 
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                        backgroundSize: '40px 40px' 
                    }} 
                />

                {/* Real-time System Message Header */}
                <div className="absolute top-12 left-0 right-0 z-20 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={state}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-2.5 h-2.5 rounded-full ${state === 3 ? 'bg-[#f36e53]' : 'bg-[#397dc1]'} animate-pulse`} />
                                <span className={`text-2xl font-bold tracking-tight ${state === 3 ? 'text-[#f36e53]' : 'text-white/90'}`}>
                                    {STATES.find(s => s.id === state)?.message}
                                </span>
                            </div>
                            <div className="h-[1px] w-48 bg-white/10" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <svg className="w-full h-full relative z-10" viewBox="0 0 900 700">
                    <defs>
                        <filter id="system-glow-fix">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="high-alert-glow-fix">
                            <feGaussianBlur stdDeviation="12" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Central Core: INGRESOS */}
                    <g transform={`translate(${centerX}, ${centerY})`}>
                        <circle
                            r={75}
                            fill="#0f172a"
                            stroke="#397dc1"
                            strokeWidth="1"
                            className="opacity-20"
                        />
                        <motion.circle
                            r={65}
                            fill="#1e1b4b"
                            stroke="#397dc1"
                            strokeWidth="2"
                            style={{ filter: "url(#system-glow-fix)" }}
                            animate={{ scale: state >= 1 ? 1 : 0.8 }}
                        />
                        <text textAnchor="middle" dy="5" className="fill-white font-black text-[11px] tracking-[0.3em] pointer-events-none uppercase">Ingresos</text>
                        
                        {/* Status Ring */}
                        <motion.circle
                            r={85}
                            fill="none"
                            stroke="#397dc1"
                            strokeWidth="0.5"
                            strokeDasharray="5 5"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="opacity-40"
                        />
                    </g>

                    {/* Infrastructure Connections */}
                    {categoryPositions.map((cat) => {
                        const isLeak = cat.id === 'domicilios';
                        return (
                            <g key={cat.id}>
                                <motion.line
                                    x1={centerX} y1={centerY}
                                    x2={cat.x} y2={cat.y}
                                    stroke={isLeak && state >= 3 ? "#f36e53" : "#397dc1"}
                                    strokeWidth="0.5"
                                    animate={{ 
                                        opacity: state >= 3 && !isLeak ? 0.05 : 0.2,
                                        strokeWidth: state === 2 ? 1 : 0.5
                                    }}
                                />

                                {/* Moving Particles: Transaction Data */}
                                {(state < 4 || isLeak) && (
                                    <g>
                                        {[0, 1, 2, 3].map((i) => (
                                            <motion.circle
                                                key={i}
                                                r="2"
                                                fill={isLeak && state >= 3 ? "#f36e53" : "#06b6d4"}
                                                filter="url(#system-glow-fix)"
                                                initial={{ offsetDistance: "0%", opacity: 0 }}
                                                animate={{ 
                                                    offsetDistance: "100%",
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{ 
                                                    duration: isLeak && state >= 3 ? 1.2 : 2.5, 
                                                    repeat: Infinity, 
                                                    delay: i * 0.6,
                                                    ease: "linear"
                                                }}
                                                style={{ 
                                                    offsetPath: `path('M ${centerX} ${centerY} L ${cat.x} ${cat.y}')`,
                                                }}
                                            />
                                        ))}
                                    </g>
                                )}

                                {/* Category Clusters */}
                                <motion.g
                                    animate={{ 
                                        scale: isLeak && state >= 3 ? 1.3 : 1,
                                        opacity: state >= 3 && !isLeak ? 0.3 : 1
                                    }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                >
                                    <circle
                                        cx={cat.x} cy={cat.y} r={35}
                                        fill="#0f172a"
                                        stroke={isLeak && state >= 3 ? '#f36e53' : cat.color}
                                        strokeWidth="1.5"
                                        className={isLeak && state === 3 ? "animate-pulse" : (state === 2 ? "animate-[pulse_4s_ease-in-out_infinite]" : "")}
                                        style={{ filter: isLeak && state >= 3 ? "url(#high-alert-glow-fix)" : "url(#system-glow-fix)" }}
                                    />
                                    <text
                                        x={cat.x} y={cat.y}
                                        textAnchor="middle" dy="5"
                                        className="fill-white font-black text-[9px] tracking-tight pointer-events-none uppercase opacity-80"
                                    >
                                        {cat.label}
                                    </text>

                                    {/* State 4: High resolution leak metrics */}
                                    {isLeak && state === 4 && (
                                        <motion.g
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <rect x={cat.x - 70} y={cat.y + 45} width="140" height="26" rx="13" fill="#000" stroke="#f36e53" strokeWidth="1" className="opacity-90 shadow-2xl" />
                                            <text x={cat.x} y={cat.y + 62} textAnchor="middle" className="fill-[#f36e53] font-black text-[10px] uppercase tracking-widest">$150.000 en 30 tx</text>
                                        </motion.g>
                                    )}
                                </motion.g>
                            </g>
                        );
                    })}

                    {/* Scanning Onda in State 2-3 */}
                    {(state === 2 || state === 3) && (
                        <motion.circle
                            cx={centerX} cy={centerY}
                            initial={{ r: 0, opacity: 0 }}
                            animate={{ r: [0, 500], opacity: [0.3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            fill="none"
                            stroke="#397dc1"
                            strokeWidth="1"
                        />
                    )}
                </svg>

                {/* Footer Technical Metadata */}
                <div className="absolute bottom-10 left-12 right-12 flex justify-between items-end bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                    <div className="space-y-1">
                        <p className="text-[8px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold">LUKAS ENGINE STATUS: <span className="text-[#397dc1] animate-pulse">ACTIVE_SCAN</span></p>
                        <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">LATENCY: <span className="text-[#397dc1]">1.2ms</span></p>
                    </div>
                    <div className="text-right space-y-2">
                        <p className="text-[10px] font-mono font-black text-white/50 tracking-[0.3em] uppercase">Analysis Cycle</p>
                        <div className="flex justify-end gap-1.5">
                            {[1, 2, 3, 4].map(idx => (
                                <div key={idx} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${state === idx ? (state === 3 ? 'bg-[#f36e53] w-10 shadow-[0_0_10px_#f36e53]' : 'bg-[#397dc1] w-10 shadow-[0_0_10px_#397dc1]') : 'bg-white/10'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Caption below Container */}
            <p className="text-center mt-8 text-[10px] font-mono font-black text-white/20 tracking-[0.5em] uppercase">
                Análisis financiero en tiempo real con Lukas AI Engine v4.2
            </p>
        </section>
    );
}
