"use client";

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CATEGORIES = [
    { id: 'cafes', label: 'Cafés', color: '#a898c9' },
    { id: 'streaming', label: 'Streaming', color: '#a898c9' },
    { id: 'domicilios', label: 'Domicilios', color: '#f36e53' }, // The Leak
    { id: 'transporte', label: 'Transporte', color: '#397dc1' },
    { id: 'compras', label: 'Compras impulsivas', color: '#a898c9' },
    { id: 'suscripciones', label: 'Suscripciones', color: '#397dc1' }
];

export default function LeakBuster() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Smooth scroll progress for fluidity
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Narrative Phase Mappings (Scale 0 to 1)
    // 0.0 - 0.2: Entry
    // 0.2 - 0.4: Phase 1 (Money Flow)
    // 0.4 - 0.6: Phase 2 (Spending Cluster)
    // 0.6 - 0.8: Phase 3 (Lukas Analysis)
    // 0.8 - 1.0: Phase 4 (Leak Detected)

    const phase1Opacity = useTransform(smoothProgress, [0.1, 0.2, 0.4, 0.5], [0, 1, 1, 1]);
    const phase2Opacity = useTransform(smoothProgress, [0.35, 0.45, 0.65, 0.75], [0, 1, 1, 1]);
    const phase3Opacity = useTransform(smoothProgress, [0.55, 0.65, 0.85, 0.95], [0, 1, 1, 1]);
    const phase4Opacity = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1]);

    // Positions
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

    // Derived animations for specific nodes
    const leakScale = useTransform(smoothProgress, [0.4, 0.5], [1, 1.3]);
    const leakColor = useTransform(smoothProgress, [0.4, 0.5], ["#a898c9", "#f36e53"]);
    const otherNodesDim = useTransform(smoothProgress, [0.4, 0.5], [1, 0.2]);

    return (
        <section ref={sectionRef} className="relative py-[50vh] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            
            {/* Sticky Content Container */}
            <div className="sticky top-[15vh] w-full">
                <div className="text-center mb-16 max-w-4xl mx-auto h-32">
                    <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">
                        Lukas Leak Buster
                    </h2>
                    <p className="text-white/85 text-lg md:text-xl font-medium max-w-[640px] mx-auto">
                        Lukas analiza automáticamente tus patrones de gasto y detecta fugas de dinero.
                    </p>
                </div>

                {/* Cinematic Container */}
                <div className="relative w-full max-w-5xl mx-auto rounded-[24px] p-12 bg-gradient-to-b from-[#1e1b4b] to-[#0f172a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden min-h-[700px]"
                    style={{ 
                        backgroundImage: 'radial-gradient(circle at center, #21428d 0%, #120c2c 100%)',
                        boxShadow: 'inset 0 0 100px rgba(57, 125, 193, 0.1), 0 20px 50px rgba(0,0,0,0.5)'
                    }}
                >
                    {/* Background Data Grid */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                        style={{ 
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                            backgroundSize: '100px 100px' 
                        }} 
                    />

                    {/* Status Overlays */}
                    <div className="absolute top-12 left-12 z-20 space-y-4">
                        <motion.div style={{ opacity: phase2Opacity }}>
                            <span className="text-[#f36e53] font-mono text-xs font-black tracking-[0.2em] uppercase block mb-1">Actividad inusual detectada</span>
                        </motion.div>
                        <motion.div style={{ opacity: phase3Opacity }}>
                            <span className="text-[#397dc1] font-mono text-xs font-black tracking-[0.2em] uppercase block mb-1">Lukas está analizando tus patrones de gasto...</span>
                        </motion.div>
                        <motion.div style={{ opacity: phase4Opacity }} className="flex gap-4 items-center">
                            <span className="px-3 py-1 bg-[#f36e53]/20 border border-[#f36e53]/40 rounded text-[#f36e53] text-[10px] font-black uppercase tracking-widest">Cluster detectado</span>
                            <span className="text-white font-black text-sm">Ahorro potencial identificado</span>
                        </motion.div>
                    </div>

                    <svg className="w-full h-full relative z-10" viewBox="0 0 900 700">
                        <defs>
                            <filter id="node-glow-cinematic">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <filter id="leak-glow-cinematic">
                                <feGaussianBlur stdDeviation="10" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Central Node: INGRESOS - 20% LARGER */}
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            {/* Inner Ring Animation */}
                            <motion.circle
                                r={90}
                                fill="none"
                                stroke="#397dc1"
                                strokeWidth="0.5"
                                strokeDasharray="5 5"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.circle
                                r={78}
                                fill="#1e1b4b"
                                stroke="#397dc1"
                                strokeWidth="2"
                                style={{ filter: "url(#node-glow-cinematic)" }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.2, type: "spring" }}
                            />
                            <text textAnchor="middle" dy="5" className="fill-white font-black text-[12px] tracking-[0.3em] pointer-events-none uppercase">Ingresos</text>
                            
                            {/* Radial Pulse */}
                            <motion.circle
                                r={78}
                                fill="none"
                                stroke="#397dc1"
                                strokeWidth="1"
                                animate={{ r: [78, 120], opacity: [0.3, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity }}
                            />
                        </g>

                        {/* Connections and Particles */}
                        {categoryPositions.map((cat) => {
                            const isLeak = cat.id === 'domicilios';
                            
                            return (
                                <g key={cat.id}>
                                    {/* Connection Line */}
                                    <motion.line
                                        x1={centerX} y1={centerY}
                                        x2={cat.x} y2={cat.y}
                                        stroke={isLeak ? "#f36e53" : "#397dc1"}
                                        strokeWidth="1"
                                        style={{ 
                                            opacity: isLeak ? 0.3 : useTransform(smoothProgress, [0.4, 0.5], [0.15, 0.05])
                                        }}
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 2, delay: 0.5 }}
                                    />

                                    {/* Cyan Transaction Particles */}
                                    {categoryPositions.map((_, pIdx) => (
                                        <motion.circle
                                            key={`p-${cat.id}-${pIdx}`}
                                            r="1.5"
                                            fill="#06b6d4" // Cyan
                                            filter="url(#node-glow-cinematic)"
                                            style={{ 
                                                offsetPath: `path('M ${centerX} ${centerY} L ${cat.x} ${cat.y}')`,
                                                opacity: phase1Opacity
                                            }}
                                            animate={{ 
                                                offsetDistance: "100%",
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{ 
                                                duration: isLeak && smoothProgress.get() > 0.4 ? 1 : 2.5, 
                                                repeat: Infinity, 
                                                delay: pIdx * 0.7,
                                                ease: "linear"
                                            }}
                                        />
                                    ))}

                                    {/* Category Node */}
                                    <motion.g
                                        style={{ 
                                            scale: isLeak ? leakScale : otherNodesDim,
                                            opacity: isLeak ? 1 : otherNodesDim
                                        }}
                                    >
                                        <motion.circle
                                            cx={cat.x} cy={cat.y} r={35}
                                            fill="#0f172a"
                                            stroke={isLeak ? leakColor : cat.color}
                                            strokeWidth="1.5"
                                            style={{ 
                                                filter: isLeak && smoothProgress.get() > 0.4 ? "url(#leak-glow-cinematic)" : "url(#node-glow-cinematic)" 
                                            }}
                                        />
                                        <text
                                            x={cat.x} y={cat.y}
                                            textAnchor="middle" dy="5"
                                            className="fill-white font-bold text-[10px] tracking-tight pointer-events-none uppercase"
                                            style={{ opacity: 0.8 }}
                                        >
                                            {cat.label}
                                        </text>

                                        {/* Phase 4: Specific Alert for Leak */}
                                        {isLeak && (
                                            <motion.g style={{ opacity: phase4Opacity }}>
                                                <text x={cat.x} y={cat.y - 55} textAnchor="middle" className="fill-[#f36e53] font-black text-[10px] tracking-widest uppercase">Cluster detectado</text>
                                                <text x={cat.x} y={cat.y - 40} textAnchor="middle" className="fill-white font-bold text-[9px] uppercase">$150.000 en 30 tx</text>
                                            </motion.g>
                                        )}
                                    </motion.g>

                                    {/* Lukas Analysis Scanning Ring (Phase 3) */}
                                    {isLeak && (
                                        <motion.circle
                                            cx={cat.x} cy={cat.y}
                                            r={60}
                                            fill="none"
                                            stroke="#397dc1"
                                            strokeWidth="1.5"
                                            strokeDasharray="4 4"
                                            style={{ opacity: phase3Opacity }}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        />
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Final state message bottom center */}
                    <motion.div 
                        style={{ opacity: phase4Opacity }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[11px] font-mono font-black text-[#06b6d4] tracking-[0.4em] uppercase"
                    >
                        Ahorro potencial identificado
                    </motion.div>

                    {/* Technical Caption */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono font-black text-white/20 tracking-[0.2em] uppercase">
                        Análisis financiero en tiempo real con Lukas AI Engine
                    </div>
                </div>
            </div>
        </section>
    );
}
