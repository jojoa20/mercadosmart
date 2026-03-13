"use client";

import React from 'react';

export default function AIPersonality() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 bg-[#0f172a] overflow-hidden">
            
            {/* Background Ambient */}
            <div className="absolute inset-0 pt-24 -z-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#397dc1]/10 via-[#a898c9]/10 to-[#f36e53]/10 blur-[120px] rounded-[100%]"></div>
            </div>

            <div className="text-center mb-16 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                    <span className="text-white">Lukas no es un banco. <br className="hidden md:block"/></span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a898c9] to-[#397dc1]">
                        Es tu pana financiero.
                    </span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                    Recibe alertas y felicitaciones en un tono amigable, directo, y sin la frialdad corporativa de las apps tradicionales.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
                
                {/* Positive Interaction Card */}
                <div className="bg-[#1e1b4b]/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative flex flex-col items-center justify-center group hover:border-[#10b981]/30 transition-colors h-[350px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#10b981]/20 transition-all"></div>
                    
                    <div className="w-full flex flex-col space-y-6">
                        
                        {/* User Bubble */}
                        <div className="bg-[#397dc1]/20 text-white/90 p-4 rounded-2xl rounded-br-sm self-end max-w-[85%] border border-[#397dc1]/30 shadow-lg animate-[fade-in-up_1s_ease-out_infinite_alternate] [animation-duration:4s]">
                            <p className="text-sm">Lukas, separé la plata del arriendo y ya no la toco.</p>
                        </div>

                        {/* AI Bubble (Success) */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-[#10b981] to-[#397dc1] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] text-lg">
                                😎
                            </div>
                            <div className="bg-[#10b981] text-black font-semibold p-4 rounded-2xl rounded-bl-sm self-start max-w-[85%] shadow-[0_4px_20px_rgba(16,185,129,0.3)] transform origin-bottom-left animate-[float_4s_ease-in-out_infinite] [animation-delay:1s]">
                                <p className="text-md">
                                    ¡Excelente, pana! Vas muy bien este mes. Sigue así y coronamos el FinScore perfecto.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Warning Interaction Card */}
                <div className="bg-[#1e1b4b]/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative flex flex-col items-center justify-center group hover:border-[#f36e53]/30 transition-colors h-[350px]">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f36e53]/10 rounded-full blur-3xl -z-10 group-hover:bg-[#f36e53]/20 transition-all"></div>
                    
                    <div className="w-full flex flex-col space-y-6">
                        
                        {/* User Bubble */}
                        <div className="bg-[#397dc1]/20 text-white/90 p-4 rounded-2xl rounded-br-sm self-end max-w-[85%] border border-[#397dc1]/30 shadow-lg animate-[fade-in-up_1s_ease-out_infinite_alternate] [animation-duration:4s] [animation-delay:0.5s]">
                            <p className="text-sm">Y bueno... compré otra cafetera premium. 😅</p>
                        </div>

                        {/* AI Bubble (Warning) */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-[#f36e53] to-[#d8a93f] flex items-center justify-center shadow-[0_0_15px_rgba(243,110,83,0.4)] text-lg">
                                🚨
                            </div>
                            <div className="bg-[#f36e53] text-white font-semibold p-4 rounded-2xl rounded-bl-sm self-start max-w-[85%] shadow-[0_4px_20px_rgba(243,110,83,0.3)] transform origin-bottom-left animate-[float_4s_ease-in-out_infinite] [animation-delay:1.5s]">
                                <p className="text-md">
                                    Ojo… este mes estás gastando más de lo normal en cosas no esenciales. Toca bajarle o no llegamos a la meta.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
