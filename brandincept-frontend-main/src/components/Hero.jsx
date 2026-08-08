// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import Lottie from 'lottie-react';
// // Import your Lottie animation JSON file
// // Make sure to download a Lottie JSON file and place it in your project
// import heroAnimation from '../animation/Growth business Pull Sales.json'; // Adjust path as needed

// const Hero = () => {
//     return (
//         <section
//             id="home"
//             className="relative min-h-screen flex items-center justify-center overflow-hidden"
//             style={{
//                 backgroundPosition: 'center',
//                 backgroundSize: 'cover',
//                 backgroundAttachment: 'fixed',
//             }}
//         >
//             {/* Light overlay for text readability */}
//             <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>

//             <div className="relative z-10 container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-8 items-center pt-32">
//                 {/* Left Column - Text Content */}
//                 <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
//                     <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#1e293b] leading-tight max-w-4xl tracking-tight animate-fade-in-up">
//                         Growing Your <span className="text-[#b5111a]">Franchise</span> Side by Side
//                     </h1>

//                     <p className="text-xl md:text-2xl text-[#334155] mb-10 max-w-2xl font-light">
//                         Your dedicated partner in franchise development, connecting progressive brands to the right locations and driving community growth.
//                     </p>

//                     <a
//                         href="#contact"
//                         className="group flex items-center justify-center space-x-2 bg-[#b5111a] hover:bg-[#8b0d14] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/20"
//                     >
//                         <span>Inquire Now</span>
//                         <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
//                     </a>
//                 </div>

//                 {/* Right Column - Lottie Animation */}
//                 {/* <div className="hidden lg:block relative w-full h-[800px] pb-40">
//                     <Lottie
//                         animationData={heroAnimation}
//                         loop={true}
//                         autoplay={true}
//                         className="w-full h-full object-contain"
//                         style={{
//                             filter: 'drop-shadow(0 20px 25px -5px rgba(0, 0, 0, 0.1))',
//                         }}
//                     />
//                 </div> */}
//                 {/* Right Column - Lottie Animation (Now visible on all screens) */}
//                 <div className="relative w-full h-[350px] md:h-[500px] lg:h-[800px] lg:pb-40">
//                     <Lottie
//                         animationData={heroAnimation}
//                         loop={true}
//                         autoplay={true}
//                         className="w-full h-full object-contain"
//                         style={{
//                             filter: 'drop-shadow(0 20px 25px -5px rgba(0, 0, 0, 0.1))',
//                         }}
//                     />
//                 </div>
//             </div>

//             {/* Scroll indicator */}
//             <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-60">
//                 <span className="text-[#334155] text-sm mb-2 font-medium tracking-wider uppercase">Scroll to explore</span>
//                 <div className="w-6 h-10 border-2 border-[#334155] rounded-full flex justify-center p-1">
//                     <div className="w-1.5 h-3 bg-[#334155] rounded-full"></div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Hero;


import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import heroAnimation from '../animation/Growth business Pull Sales.json';

// ─── Particle Canvas ────────────────────────────────────────────────────────
const ParticleCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animId;
        let W = (canvas.width = window.innerWidth);
        let H = (canvas.height = window.innerHeight);

        const PARTICLE_COUNT = 55;
        const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 2.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.45 + 0.1,
            color: Math.random() > 0.6 ? '#b5111a' : '#1e293b',
        }));

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(181,17,26,${0.06 * (1 - dist / 130)})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle =
                    p.color === '#b5111a'
                        ? `rgba(181,17,26,${p.alpha})`
                        : `rgba(30,41,59,${p.alpha})`;
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = W;
                if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H;
                if (p.y > H) p.y = 0;
            });

            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

// ─── Main Hero Component ─────────────────────────────────────────────────────
const Hero = () => {
    return (
        <>
            {/* Keyframe styles injected once */}
            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50%       { transform: translateY(-28px) rotate(6deg); }
                }
                @keyframes float-med {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50%       { transform: translateY(-18px) rotate(-8deg); }
                }
                @keyframes float-fast {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50%       { transform: translateY(-12px) scale(1.06); }
                }
                @keyframes orb-drift-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%       { transform: translate(40px, -50px) scale(1.08); }
                    66%       { transform: translate(-30px, 30px) scale(0.95); }
                }
                @keyframes orb-drift-2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33%       { transform: translate(-50px, 40px) scale(1.06); }
                    66%       { transform: translate(30px, -30px) scale(0.97); }
                }
                @keyframes orb-drift-3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50%       { transform: translate(25px, 35px) scale(1.04); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes spin-rev {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(-360deg); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-ring {
                    0%   { transform: scale(0.85); opacity: 0.6; }
                    70%  { transform: scale(1.15); opacity: 0; }
                    100% { transform: scale(1.15); opacity: 0; }
                }
                .hero-h1   { animation: fade-in-up 0.8s ease both; }
                .hero-p    { animation: fade-in-up 0.8s 0.2s ease both; }
                .hero-cta  { animation: fade-in-up 0.8s 0.4s ease both; }
            `}</style>

            <section
                id="home"
                className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafafa]"
            >
                {/* ── Background: subtle dot grid ── */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        zIndex: 0,
                        backgroundImage:
                            'radial-gradient(circle, rgba(30,41,59,0.10) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />

                {/* ── Background: gradient orbs ── */}
                {/* Orb 1 – large red, top-left */}
                <div
                    // className="absolute pointer-events-none rounded-full"
                    // style={{
                    //     zIndex: 0,
                    //     top: '-12%',
                    //     left: '-8%',
                    //     width: '520px',
                    //     height: '520px',
                    //     background:
                    //         'radial-gradient(circle at 40% 40%, #017dc5 0%, transparent 70%)',
                    //     animation: 'orb-drift-1 10s ease-in-out infinite',
                    //     filter: 'blur(20px)',
                    // }}
                />
                {/* Orb 2 – medium navy, bottom-right */}
                <div
                    className="absolute pointer-events-none rounded-full"
                    style={{
                        zIndex: 0,
                        bottom: '-15%',
                        right: '-10%',
                        width: '600px',
                        height: '600px',
                        background:
                            'radial-gradient(circle at 60% 60%, rgba(30,41,59,0.09) 0%, transparent 65%)',
                        animation: 'orb-drift-2 22s ease-in-out infinite',
                        filter: 'blur(3px)',
                    }}
                />
                {/* Orb 3 – small accent, center-right */}
                <div
                    className="absolute pointer-events-none rounded-full"
                    style={{
                        zIndex: 0,
                        top: '40%',
                        right: '15%',
                        width: '220px',
                        height: '220px',
                        background:
                            'radial-gradient(circle, rgba(181,17,26,0.10) 0%, transparent 70%)',
                        animation: 'orb-drift-3 14s ease-in-out infinite',
                        filter: 'blur(1px)',
                    }}
                />

                {/* ── Background: floating geometric shapes ── */}
                {/* Ring – top right */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 0,
                        top: '10%',
                        right: '5%',
                        width: '120px',
                        height: '120px',
                        border: '2px solid rgba(181,17,26,0.15)',
                        borderRadius: '50%',
                        animation: 'float-slow 7s ease-in-out infinite, spin-slow 20s linear infinite',
                    }}
                />
                {/* Inner ring pulse */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 0,
                        top: '10%',
                        right: '5%',
                        width: '120px',
                        height: '120px',
                        border: '2px solid #017dc5',
                        borderRadius: '50%',
                        animation: 'pulse-ring 3s ease-out infinite',
                    }}
                />

                {/* Diamond – bottom left */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 0,
                        bottom: '18%',
                        left: '7%',
                        width: '48px',
                        height: '48px',
                        border: '2px solid rgba(30,41,59,0.18)',
                        transform: 'rotate(45deg)',
                        animation: 'float-med 5.5s ease-in-out infinite',
                    }}
                />

                {/* Small filled square – mid-left */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 0,
                        top: '55%',
                        left: '4%',
                        width: '14px',
                        height: '14px',
                        background: 'rgba(181,17,26,0.25)',
                        borderRadius: '3px',
                        animation: 'float-fast 4s ease-in-out infinite',
                    }}
                />

                {/* Large outline square – upper mid */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 0,
                        top: '6%',
                        left: '38%',
                        width: '70px',
                        height: '70px',
                        border: '1.5px solid rgba(30,41,59,0.10)',
                        borderRadius: '8px',
                        animation: 'float-slow 9s ease-in-out infinite, spin-rev 35s linear infinite',
                    }}
                />

                {/* Triangle – right mid */}
                <svg
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 0,
                        bottom: '30%',
                        right: '8%',
                        width: '50px',
                        height: '50px',
                        animation: 'float-med 6s ease-in-out infinite',
                        opacity: 0.18,
                    }}
                    viewBox="0 0 50 50"
                >
                    <polygon points="25,4 48,46 2,46" fill="none" stroke="#017dc5" strokeWidth="2" />
                </svg>

                {/* Plus cross – lower right */}
                <svg
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 0,
                        bottom: '12%',
                        right: '22%',
                        width: '28px',
                        height: '28px',
                        animation: 'float-fast 3.8s ease-in-out infinite',
                        opacity: 0.22,
                    }}
                    viewBox="0 0 28 28"
                >
                    <line x1="14" y1="2" x2="14" y2="26" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="2" y1="14" x2="26" y2="14" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* Dot cluster – top left */}
                <svg
                    className="absolute pointer-events-none"
                    style={{
                        zIndex: 0,
                        top: '20%',
                        left: '12%',
                        width: '60px',
                        height: '60px',
                        animation: 'float-slow 8s ease-in-out infinite',
                        opacity: 0.25,
                    }}
                    viewBox="0 0 60 60"
                >
                    {[0, 20, 40].map(cx =>
                        [0, 20, 40].map(cy => (
                            <circle key={`${cx}-${cy}`} cx={cx + 10} cy={cy + 10} r="3" fill="#017dc5" />
                        ))
                    )}
                </svg>

                {/* ── Particle network canvas ── */}
                <ParticleCanvas />

                {/* ── Main content ── */}
                <div className="relative z-10 container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-8 items-center pt-32">
                    {/* Left – Text */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1
                            className="hero-h1 text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#1e293b] leading-tight max-w-4xl tracking-tight"
                            style={{ opacity: 0 }} /* starts transparent; animation fills it in */
                        >
                            Growing Your{' '}
                            <span className="text-[#017dc5]">Leasing</span>{' '}
                            Side by Side
                        </h1>

                        <p
                            className="hero-p text-xl md:text-2xl text-[#334155] mb-10 max-w-2xl font-light mt-6"
                            style={{ opacity: 0 }}
                        >
                            Your dedicated partner in franchise development, connecting progressive
                            brands to the right locations and driving community growth.
                        </p>

                        <a
                            href="#contact"
                            className="hero-cta group flex items-center justify-center space-x-2 bg-[#017dc5] hover:bg-[#8b0d14] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/20"
                            style={{ opacity: 0 }}
                        >
                            <span>Inquire Now</span>
                            <ArrowRight
                                className="group-hover:translate-x-1 transition-transform"
                                size={20}
                            />
                        </a>
                    </div>

                    {/* Right – Lottie */}
                    <div className="relative w-full h-[350px] md:h-[500px] lg:h-[800px] lg:pb-40">
                        <Lottie
                            animationData={heroAnimation}
                            loop
                            autoplay
                            className="w-full h-full object-contain"
                            style={{
                                filter: 'drop-shadow(0 20px 25px -5px rgba(0,0,0,0.10))',
                            }}
                        />
                    </div>
                </div>

                {/* ── Scroll indicator ── */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-60 z-10">
                    <span className="text-[#334155] text-sm mb-2 font-medium tracking-wider uppercase">
                        Scroll to explore
                    </span>
                    <div className="w-6 h-10 border-2 border-[#334155] rounded-full flex justify-center p-1">
                        <div className="w-1.5 h-3 bg-[#334155] rounded-full" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;