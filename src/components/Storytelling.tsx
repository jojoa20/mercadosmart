"use client";

import React, { useState, useEffect } from 'react';

// Color palette reference
// Alert coral: #f36e53 (Score 420)
// Warning orange: #f97316 (Score 550)
// Accent gold: #d8a93f (Score 650)
// Success green: #10b981 (Score 760)

const STEPS = [
    {
        id: 1,
        title: "Día 1: El desorden",
        description: "Sobreviviendo quincena a quincena sin un mapa claro.",
        score: 420,
        color: "#f36e53",
        event: "Inicio"
    },
    {
        id: 2,
        title: "Día 10: Detección",
        description: "Lukas identifica $150k en domicilios y suscripciones fantasma.",
        score: 550,
        color: "#f97316",
        event: "+130 pts"
    },
    {
        id: 3,
        title: "Día 20: Acción",
        description: "Cortas las fugas de dinero y configuras un ahorro automático.",
        score: 650,
        color: "#d8a93f",
        event: "+100 pts"
    },
    {
        id: 4,
        title: "Día 30: Control",
        description: "Terminas el mes con saldo positivo y una racha de ahorro impecable.",
        score: 760,
        color: "#10b981",
        event: "+110 pts"
    }
];

export default function Storytelling() {
    const [currentStep, setCurrentStep] = useState(0);
    const [displayScore, setDisplayScore] = useState(STEPS[0].score);

    // Animate the score when changing steps
    useEffect(() => {
        const targetScore = STEPS[currentStep].score;
        const diff = targetScore - displayScore;
        const steps = 20; // Animation frames
        const increment = diff / steps;
        
        let current = displayScore;
        let frame = 0;

        const interval = setInterval(() => {
            frame++;
            current += increment;
            setDisplayScore(Math.round(current));
            
            if (frame >= steps) {
                setDisplayScore(targetScore);
                clearInterval(interval);
            }
        }, 30); // 30ms per frame

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentStep]);


    // SVG Gauge Mechanics
    const radius = 90;
    const strokeWidth = 14;
    const circumference = Math.PI * radius; // Half circle
    const offset = circumference - (displayScore / 1000) * circumference;
    const activeColor = STEPS[currentStep].color;

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            <div className="absolute inset-0 pt-24 -z-10 pointer-events-none fade-in">
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] blur-[150px] rounded-[100%] transition-colors duration-1000"
                    style={{ backgroundColor: `${activeColor}15` /* 15 hex opacity */ }}
                ></div>
            </div>

            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
                    Un mes usando Lukas
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Así es como pasas de sobrevivir la quincena a tener el control total de tus finanzas en solo 30 días.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-5xl mx-auto">
                
                {/* Steps Timeline (Left Side) */}
                <div className="flex-1 w-full space-y-6 relative">
                    {/* Vertical connecting line */}
                    <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-white/10 z-0 hidden sm:block"></div>

                    {STEPS.map((step, index) => (
                        <div 
                            key={step.id}
                            className={`relative z-10 flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl transition-all duration-500 cursor-pointer border ${
                                currentStep === index 
                                    ? 'bg-white/10 border-white/20 shadow-lg scale-[1.02] ml-0 sm:ml-2' 
                                    : 'bg-transparent border-transparent hover:bg-white/5 opacity-50 hover:opacity-100'
                            }`}
                            onClick={() => setCurrentStep(index)}
                        >
                            {/* Number Circle / Icon */}
                            <div 
                                className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-500 ${
                                    currentStep === index 
                                    ? 'text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                    : 'bg-white/5 text-white/50'
                                }`}
                                style={currentStep === index ? { backgroundColor: step.color } : {}}
                            >
                                {step.id}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 pt-1">
                                <h3 className="text-xl font-bold text-white mb-2 tracking-wide flex items-center justify-between">
                                    {step.title}
                                    <span 
                                        className={`text-xs px-2 py-1 rounded-md font-mono ${currentStep === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                                        style={{ backgroundColor: `${step.color}30`, color: step.color }}
                                    >
                                        {step.event}
                                    </span>
                                </h3>
                                <p className="text-white/60 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Interactive Dynamic Gauge (Right Side) */}
                <div className="w-full lg:w-[400px] shrink-0 bg-[#1e1b4b]/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(12,6,24,0.3)] flex flex-col items-center justify-center h-[400px] relative transition-colors duration-700">
                    
                    {/* Background subtle pulse */}
                    <div 
                        className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none transition-colors duration-700"
                        style={{ background: `radial-gradient(circle at center, ${activeColor}40 0%, transparent 70%)` }}
                    ></div>

                    <p className="text-white/50 text-sm uppercase tracking-widest font-bold mb-8 relative z-10">Tu FinScore</p>
                    
                    <div className="relative w-[280px] h-[150px] flex justify-center items-end z-10">
                        <svg width="280" height="150" viewBox="0 0 240 130" className="overflow-visible">
                            {/* Track */}
                            <path
                                d="M 20 110 A 100 100 0 0 1 220 110"
                                fill="none"
                                stroke="rgba(255,255,255,0.05)"
                                strokeWidth={strokeWidth}
                                strokeLinecap="round"
                            />
                            {/* Dynamic Fill */}
                            <path
                                d="M 20 110 A 100 100 0 0 1 220 110"
                                fill="none"
                                stroke={activeColor}
                                strokeWidth={strokeWidth}
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                                style={{ filter: `drop-shadow(0px 0px 15px ${activeColor}80)` }}
                            />
                        </svg>

                        <div className="absolute -bottom-4 flex flex-col items-center">
                            <span 
                                className="text-6xl font-black font-mono tracking-tighter transition-colors duration-500"
                                style={{ color: activeColor, textShadow: `0 0 20px ${activeColor}60` }}
                            >
                                {displayScore}
                            </span>
                            <span className="text-xs text-white/40 uppercase font-bold tracking-widest mt-2">{displayScore >= 750 ? "Excelente" : displayScore >= 600 ? "Bueno" : displayScore >= 500 ? "Regular" : "Crítico"}</span>
                        </div>
                    </div>

                    {/* Progression Indicators */}
                    <div className="flex justify-center gap-3 mt-12 z-10">
                        {STEPS.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setCurrentStep(i)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-white' : 'bg-white/20 hover:bg-white/40'}`}
                                aria-label={`Go to step ${i + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
