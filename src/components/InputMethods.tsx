"use client";

import React, { useEffect, useState } from 'react';

export default function InputMethods() {
    // Basic state to trigger animations in sequence if needed, but we can rely mostly on CSS
    const [scanActive, setScanActive] = useState(true);

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a]">
            
            {/* Background Ambient */}
            <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[#397dc1]/30 to-transparent"></div>

            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                    <span className="text-white">Cero formularios. </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#397dc1] to-[#a898c9]">
                        Solo habla con Lukas.
                    </span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Olvídate de las hojas de cálculo aburridas y los registros manuales. Ingresa tus gastos como si estuvieras chateando con un amigo de confianza.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                
                {/* 1. Chat Method */}
                <div className="bg-[#1e1b4b]/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-[#397dc1]/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#397dc1]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#397dc1]/20 transition-colors"></div>
                    
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-[#397dc1]/10 flex items-center justify-center border border-[#397dc1]/30 text-[#397dc1]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">Chat</h3>
                    </div>

                    <div className="flex flex-col gap-4 min-h-[160px] justify-end relative">
                        {/* Fake Chat Input */}
                        <div className="absolute bottom-[-16px] w-full bg-[#0f172a] border border-white/10 rounded-full px-4 py-2 flex items-center justify-between opacity-50 pointer-events-none">
                            <span className="text-xs text-white/30">Escribe un mensaje...</span>
                            <div className="w-6 h-6 rounded-full bg-[#397dc1] flex items-center justify-center text-white">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            </div>
                        </div>

                        {/* Animated Message Bubble */}
                        <div className="bg-[#397dc1] text-white p-4 rounded-2xl rounded-br-sm shadow-[0_4px_20px_rgba(57,125,193,0.3)] self-end max-w-[90%] transform origin-bottom-right animate-[float_4s_ease-in-out_infinite] mb-8">
                            <p className="text-sm font-medium leading-relaxed">
                                "Lukas, gasté 15 lucas en empanadas."
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Voice Method */}
                <div className="bg-[#1e1b4b]/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-[#a898c9]/30 transition-colors">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#a898c9]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#a898c9]/20 transition-colors"></div>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-[#a898c9]/10 flex items-center justify-center border border-[#a898c9]/30 text-[#a898c9]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">Mensaje de Voz</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center min-h-[160px] gap-6">
                        {/* Audio Waveform Animation */}
                        <div className="flex items-end justify-center gap-1 h-12 w-full">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                                <div 
                                    key={i} 
                                    className="w-1.5 bg-gradient-to-t from-[#a898c9] to-[#397dc1] rounded-full animate-pulse"
                                    style={{ 
                                        height: `${Math.max(20, Math.random() * 100)}%`,
                                        animationDuration: `${0.5 + Math.random() * 0.5}s`,
                                        animationDelay: `${Math.random() * 0.5}s`
                                    }}
                                ></div>
                            ))}
                        </div>

                        {/* Pulsing Mic Button */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#a898c9] rounded-full animate-ping opacity-30"></div>
                            <div className="absolute -inset-2 bg-[#a898c9]/20 rounded-full animate-pulse"></div>
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#a898c9] to-[#397dc1] flex items-center justify-center shadow-[0_0_25px_rgba(168,152,201,0.5)] z-10 cursor-pointer hover:scale-105 transition-transform">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Screenshot OCR Method */}
                <div className="bg-[#1e1b4b]/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-[#f36e53]/30 transition-colors">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#f36e53]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#f36e53]/20 transition-colors"></div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[#f36e53]/10 flex items-center justify-center border border-[#f36e53]/30 text-[#f36e53]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">Pantallazo</h3>
                    </div>

                    <div className="flex gap-4 items-center">
                        
                        {/* Mock Receipt with Scanner */}
                        <div className="relative w-24 h-32 bg-white/5 border border-white/10 rounded-lg overflow-hidden shrink-0">
                            {/* Receipt content mock */}
                            <div className="p-2 space-y-2 opacity-30">
                                <div className="h-6 w-12 bg-purple-500 rounded mx-auto mb-3"></div> {/* Nequi dummy logo */}
                                <div className="h-1.5 w-full bg-white/50 rounded"></div>
                                <div className="h-1.5 w-full bg-white/50 rounded"></div>
                                <div className="h-2 w-16 bg-white/80 rounded mx-auto my-3"></div>
                                <div className="h-1.5 w-3/4 bg-white/50 rounded mx-auto"></div>
                            </div>

                            {/* Laser Scanner Line */}
                            <div className="absolute inset-x-0 top-0 h-0.5 bg-[#f36e53] shadow-[0_0_8px_#f36e53] w-full animate-[scan_3s_ease-in-out_infinite]"></div>
                            {/* Scanner gradient wash */}
                            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#f36e53]/20 to-transparent w-full animate-[scan_3s_ease-in-out_infinite]"></div>
                        </div>

                        {/* Extracted Data Area */}
                        <div className="flex-1 space-y-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Monto</span>
                                <span className="text-sm font-black text-[#10b981] animate-[fade-in-up_1s_ease-out_infinite] [animation-delay:0.5s]">$15.000 COP</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Comercio</span>
                                <span className="text-xs font-medium text-white animate-[fade-in-up_1s_ease-out_infinite] [animation-delay:1s]">Empanadas El Gordo</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Categoría</span>
                                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 w-fit animate-[fade-in-up_1s_ease-out_infinite] [animation-delay:1.5s]">Comida</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            {/* Global Keyframes for specific animations */}
            <style jsx global>{`
                @keyframes scan {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(120px); }
                }
            `}</style>
        </section>
    );
}
