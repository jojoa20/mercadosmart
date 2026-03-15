"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
    { id: 'cafes', label: 'Cafés', color: '#397dc1' },
    { id: 'streaming', label: 'Streaming', color: '#a898c9' },
    { id: 'domicilios', label: 'Domicilios', color: '#f36e53' }, // The Leak
    { id: 'transporte', label: 'Transporte', color: '#397dc1' },
    { id: 'compras', label: 'Compras impulsivas', color: '#a898c9' },
    { id: 'suscripciones', label: 'Suscripciones', color: '#d8a93f' }
];

export default function LeakBuster() {
    const [phase, setPhase] = useState(1); // 1: Flow, 2: Detection, 3: Analysis
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        let phaseTimer: NodeJS.Timeout;
        
        const startSequence = () => {
            setPhase(1);
            
            phaseTimer = setTimeout(() => {
                setPhase(2);
                phaseTimer = setTimeout(() => {
                    setPhase(3);
                    phaseTimer = setTimeout(() => {
                        startSequence(); // Loop
                    }, 4000);
                }, 3000);
            }, 4000);
        };

        startSequence();

        return () => clearTimeout(phaseTimer);
    }, []);

    // Radial layout for categories
    const categoryPositions = useMemo(() => {
        const radius = 220;
        return CATEGORIES.map((cat, i) => {
            const angle = (i * (360 / CATEGORIES.length) - 90) * (Math.PI / 180);
            return {
                ...cat,
                x: 400 + Math.cos(angle) * radius,
                y: 350 + Math.sin(angle) * radius
            };
        });
    }, []);

    if (!mounted) return null;

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-transparent overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-[#397dc1]/5 blur-[200px] rounded-[100%] pointer-events-none -z-10" />

            <div className="text-center mb-16 max-w-4xl mx-auto h-32">
                <span className="text-xs uppercase tracking-[0.4em] font-black text-[#397dc1] mb-6 block drop-shadow-sm">LUKAS LEAK BUSTER 3.0</span>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-white">
                            {phase === 1 && "Visualizando Flujo de Efectivo"}
                            {phase === 2 && <span className="text-[#f36e53]">Cluster Detectado: Gasto Hormiga</span>}
                            {phase === 3 && <span className="text-[#397dc1]">Lukas: Fuga Analizada y Estabilizada</span>}
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl font-medium">
                            {phase === 1 && "Lukas mapea cada transacción desde tus ingresos a las categorías de gasto."}
                            {phase === 2 && "Un patrón inusual ha sido detectado en el clúster de 'Domicilios'."}
                            {phase === 3 && "Optimizando clústers para maximizar tu FinScore."}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative w-full max-w-5xl mx-auto aspect-[16/10] sm:aspect-[4/3] md:aspect-video rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_rgba(33,66,141,0.2)]">
                {/* Visual Grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                <svg className="w-full h-full" viewBox="0 0 800 650">
                    <defs>
                        <filter id="glow-node">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="glow-leak">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Central Node: INGRESOS */}
                    <g transform="translate(400, 350)">
                        <motion.circle
                            r={60}
                            fill="#1e1b4b"
                            stroke="#a898c9"
                            strokeWidth="2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, type: "spring" }}
                        />
                        <text textAnchor="middle" dy="5" className="fill-white font-black text-xs tracking-widest pointer-events-none">INGRESOS</text>
                        <text textAnchor="middle" dy="25" className="fill-white/40 font-bold text-[8px] tracking-tighter">$4.500.000</text>
                    </g>

                    {/* Category Nodes and Particles */}
                    {categoryPositions.map((cat) => {
                        const isLeak = cat.id === 'domicilios';
                        const isDimmed = phase === 2 && !isLeak;
                        
                        return (
                            <g key={cat.id}>
                                {/* Connection Line */}
                                <motion.line
                                    x1="400" y1="350"
                                    x2={cat.x} y2={cat.y}
                                    stroke={cat.color}
                                    strokeWidth="1"
                                    strokeOpacity={isDimmed ? 0.05 : 0.2}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />

                                {/* Category Particles */}
                                {phase <= 2 && !isDimmed && (
                                    <g>
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <motion.circle
                                                key={i}
                                                r="2"
                                                fill={cat.color}
                                                filter="url(#glow-node)"
                                                initial={{ offsetDistance: "0%" }}
                                                animate={{ 
                                                    offsetDistance: "100%",
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{ 
                                                    duration: isLeak && phase === 2 ? 1.5 : 2.5, 
                                                    repeat: Infinity, 
                                                    delay: i * 0.5,
                                                    ease: "linear"
                                                }}
                                                style={{ 
                                                    offsetPath: `path('M 400 350 L ${cat.x} ${cat.y}')`,
                                                    position: 'absolute'
                                                }}
                                            />
                                        ))}
                                    </g>
                                )}

                                {/* Node */}
                                <motion.g
                                    initial={{ scale: 0 }}
                                    animate={{ 
                                        scale: isLeak && phase === 2 ? 1.4 : 1,
                                        opacity: isDimmed ? 0.2 : 1
                                    }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                >
                                    <circle
                                        cx={cat.x} cy={cat.y} r={isLeak && phase === 2 ? 45 : 35}
                                        fill="#0f172a"
                                        stroke={isLeak && phase >= 2 ? '#f36e53' : cat.color}
                                        strokeWidth="2"
                                        className={isLeak && phase === 2 ? "animate-pulse" : ""}
                                        style={{ filter: isLeak && phase === 2 ? "url(#glow-leak)" : "none" }}
                                    />
                                    <text
                                        x={cat.x} y={cat.y}
                                        textAnchor="middle" dy="5"
                                        className="fill-white font-black text-[10px] tracking-tight pointer-events-none"
                                    >
                                        {cat.label}
                                    </text>
                                    
                                    {isLeak && phase >= 2 && (
                                        <motion.text
                                            x={cat.x} y={cat.y + 15}
                                            textAnchor="middle"
                                            className="fill-[#f36e53] font-bold text-[8px] pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            $150.000 (30 tx)
                                        </motion.text>
                                    )}
                                </motion.g>

                                {/* Lukas Analysis UI Overlay */}
                                {isLeak && phase === 3 && (
                                    <g>
                                        <motion.circle
                                            cx={cat.x} cy={cat.y} r={60}
                                            fill="none"
                                            stroke="#397dc1"
                                            strokeWidth="1"
                                            strokeDasharray="5 5"
                                            className="animate-[spin_4s_linear_infinite]"
                                        />
                                        <motion.circle
                                            cx={cat.x} cy={cat.y}
                                            initial={{ r: 0, opacity: 0 }}
                                            animate={{ r: [0, 80, 100], opacity: [0, 0.5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            fill="none"
                                            stroke="#06b6d4"
                                            strokeWidth="2"
                                        />
                                        <rect x={cat.x - 60} y={cat.y - 70} width="120" height="20" rx="10" className="fill-[#397dc1] shadow-xl" />
                                        <text x={cat.x} y={cat.y - 57} textAnchor="middle" className="fill-white font-black text-[8px] tracking-[0.2em] uppercase">Fuga Detectada</text>
                                    </g>
                                )}
                            </g>
                        );
                    })}

                    {/* Scanning Line Overlay during Analysis */}
                    {phase === 3 && (
                        <motion.line
                            x1="0" x2="800"
                            initial={{ y: 0 }}
                            animate={{ y: [0, 650, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            stroke="#06b6d4"
                            strokeWidth="1"
                            strokeOpacity="0.4"
                            className="shadow-[0_0_20px_#06b6d4]"
                        />
                    )}
                </svg>

                {/* Phase Status Pill */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
                    <div className={`px-4 py-1.5 rounded-full border transition-all duration-500 text-[10px] font-black tracking-widest uppercase ${phase === 1 ? 'bg-[#397dc1]/20 border-[#397dc1] text-white' : 'bg-white/5 border-white/10 text-white/30'}`}>
                        Mapeo
                    </div>
                    <div className={`px-4 py-1.5 rounded-full border transition-all duration-500 text-[10px] font-black tracking-widest uppercase ${phase === 2 ? 'bg-[#f36e53]/20 border-[#f36e53] text-white shadow-[0_0_15px_rgba(243,110,83,0.3)]' : 'bg-white/5 border-white/10 text-white/30'}`}>
                        Detección
                    </div>
                    <div className={`px-4 py-1.5 rounded-full border transition-all duration-500 text-[10px] font-black tracking-widest uppercase ${phase === 3 ? 'bg-[#397dc1]/20 border-[#397dc1] text-white shadow-[0_0_15px_rgba(57,125,193,0.3)]' : 'bg-white/5 border-white/10 text-white/30'}`}>
                        Estabilización
                    </div>
                </div>

                {/* Lukas Status Text Bottom Right */}
                <div className="absolute bottom-8 right-8 text-right font-mono text-[10px] space-y-1">
                    <p className="text-[#397dc1] opacity-70 tracking-widest font-black flex items-center justify-end gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#397dc1] animate-pulse" />
                        LUKAS ENGINE V3.0
                    </p>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={phase}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-white/40 uppercase"
                        >
                            {phase === 1 && "Running money flux simulation..."}
                            {phase === 2 && "ALERT: High density cluster detected in /FOOD"}
                            {phase === 3 && "ANALYSIS COMPLETE: Savings optimized."}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
