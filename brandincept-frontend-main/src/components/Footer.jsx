import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';

/* ─────────────────────────────────────────────
   LIQUID MESH CANVAS
   Beautiful flowing gradient mesh that morphs
   like liquid ink — totally unique animation
───────────────────────────────────────────── */
const LiquidMesh = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId, t = 0;

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            t += 0.008;
            const W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            // Draw 6 morphing blobs using bezier paths
            const blobs = [
                { x: W * 0.10, y: H * 0.5,  r: 180, color: [1,125,197],  a: 0.09, t: t * 0.7  },
                { x: W * 0.50, y: H * 0.2,  r: 140, color: [178,31,36],  a: 0.07, t: t * 0.9  },
                { x: W * 0.88, y: H * 0.6,  r: 160, color: [30,41,59],   a: 0.08, t: t * 0.6  },
                { x: W * 0.25, y: H * 0.85, r: 110, color: [178,31,36],  a: 0.06, t: t * 1.1  },
                { x: W * 0.70, y: H * 0.15, r: 130, color: [1,125,197],  a: 0.06, t: t * 0.8  },
                { x: W * 0.60, y: H * 0.75, r: 100, color: [178,31,36],  a: 0.05, t: t * 1.2  },
            ];

            blobs.forEach(b => {
                const ox = Math.sin(b.t * 1.3) * 55;
                const oy = Math.cos(b.t * 0.9) * 40;
                const cx = b.x + ox;
                const cy = b.y + oy;
                const rr = b.r + Math.sin(b.t * 2) * 20;

                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
                g.addColorStop(0,   `rgba(${b.color},${b.a})`);
                g.addColorStop(0.6, `rgba(${b.color},${b.a * 0.3})`);
                g.addColorStop(1,   `rgba(${b.color},0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(cx, cy, rr, 0, Math.PI * 2);
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <canvas ref={canvasRef}
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }} />
    );
};

/* ─────────────────────────────────────────────
   REVEAL HOOK
───────────────────────────────────────────── */
const useReveal = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.08 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
};

/* ─────────────────────────────────────────────
   MAIN FOOTER
───────────────────────────────────────────── */
const Footer = () => {
    const [footerRef, visible] = useReveal();

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

                /* ─── MORPHING TOP WAVE ─── */
                @keyframes ft-morph-path {
                    0%   { d: path("M0,0 C240,40 480,0 720,28 C960,56 1200,10 1440,20 L1440,0 Z"); }
                    25%  { d: path("M0,0 C200,28 440,52 720,18 C1000,0 1240,44 1440,12 L1440,0 Z"); }
                    50%  { d: path("M0,0 C280,50 520,8 720,32 C920,56 1160,4 1440,22 L1440,0 Z"); }
                    75%  { d: path("M0,0 C160,20 400,48 720,14 C1040,0 1280,38 1440,16 L1440,0 Z"); }
                    100% { d: path("M0,0 C240,40 480,0 720,28 C960,56 1200,10 1440,20 L1440,0 Z"); }
                }
                @keyframes ft-morph-path2 {
                    0%   { d: path("M0,0 C300,32 600,8 720,24 C840,40 1100,4 1440,18 L1440,0 Z"); }
                    50%  { d: path("M0,0 C200,48 500,12 720,30 C940,48 1200,8 1440,14 L1440,0 Z"); }
                    100% { d: path("M0,0 C300,32 600,8 720,24 C840,40 1100,4 1440,18 L1440,0 Z"); }
                }
                .ft-morph-path1 { animation: ft-morph-path  8s ease-in-out infinite; }
                .ft-morph-path2 { animation: ft-morph-path2 6s ease-in-out 1s infinite; }

                /* ─── HORIZONTAL SHIMMER LINE ─── */
                @keyframes ft-scan {
                    0%   { transform: translateX(-100%); opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 1; }
                    100% { transform: translateX(100vw); opacity: 0; }
                }
                .ft-scan-line {
                    position: absolute;
                    top: 0; left: 0;
                    width: 200px; height: 3px;
                    background: linear-gradient(90deg, transparent, rgba(1,125,197,0.6), rgba(178,31,36,0.5), transparent);
                    animation: ft-scan 5s ease-in-out infinite;
                    z-index: 4; pointer-events: none; border-radius: 2px;
                }
                .ft-scan-line-2 {
                    animation-delay: 2.5s;
                    background: linear-gradient(90deg, transparent, rgba(178,31,36,0.5), rgba(1,125,197,0.4), transparent);
                }

                /* ─── FLOATING RINGS ─── */
                @keyframes ft-ring-spin   { to { transform: rotate(360deg); } }
                @keyframes ft-ring-spin-r { to { transform: rotate(-360deg); } }
                @keyframes ft-ring-float  {
                    0%,100% { transform: translateY(0) rotate(0deg); }
                    50%     { transform: translateY(-16px) rotate(5deg); }
                }
                @keyframes ft-ring-float2 {
                    0%,100% { transform: translateY(0) rotate(0deg); }
                    50%     { transform: translateY(-12px) rotate(-4deg); }
                }
                .ft-ring-tl {
                    position: absolute; top: -20px; left: 40px; z-index: 3; pointer-events: none;
                    width: 120px; height: 120px; border-radius: 50%;
                    border: 1px solid rgba(1,125,197,0.14);
                    animation: ft-ring-spin 25s linear infinite;
                }
                .ft-ring-tl::before {
                    content:''; position: absolute; inset: 16px; border-radius: 50%;
                    border: 1px dashed rgba(178,31,36,0.16);
                    animation: ft-ring-spin-r 14s linear infinite;
                }
                .ft-ring-tl::after {
                    content:''; position: absolute; top: 50%; left: 50%;
                    width: 7px; height: 7px; border-radius: 50%;
                    background: #017dc5; opacity: .35;
                    transform: translateY(-56px) translateX(-3.5px);
                }
                .ft-ring-br {
                    position: absolute; bottom: 10px; right: 60px; z-index: 3; pointer-events: none;
                    width: 80px; height: 80px; border-radius: 50%;
                    border: 1px solid rgba(178,31,36,0.12);
                    animation: ft-ring-float 7s ease-in-out infinite;
                }
                .ft-ring-br::before {
                    content:''; position: absolute; inset: 12px; border-radius: 50%;
                    border: 1px dashed rgba(1,125,197,0.14);
                    animation: ft-ring-spin 18s linear infinite;
                }
                .ft-diamond-bl {
                    position: absolute; bottom: 30%; left: 5%; z-index: 3; pointer-events: none;
                    width: 36px; height: 36px;
                    border: 1.5px solid rgba(178,31,36,0.15); border-radius: 6px;
                    transform: rotate(45deg);
                    animation: ft-ring-float2 6s ease-in-out infinite;
                }
                .ft-plus-tr {
                    position: absolute; top: 35%; right: 5%; z-index: 3; pointer-events: none;
                    opacity: .14; animation: ft-ring-float 5.5s ease-in-out 1s infinite;
                }

                /* ─── COLUMN REVEAL ─── */
                @keyframes ft-reveal-l  { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
                @keyframes ft-reveal-up { from{opacity:0;transform:translateY(24px)}  to{opacity:1;transform:translateY(0)} }
                @keyframes ft-reveal-r  { from{opacity:0;transform:translateX(30px)}  to{opacity:1;transform:translateX(0)} }

                .ft-col-1 { opacity:0; }
                .ft-col-2 { opacity:0; }
                .ft-col-3 { opacity:0; }
                .ft-col-1.ft-in { animation: ft-reveal-l  0.7s 0.05s ease both; }
                .ft-col-2.ft-in { animation: ft-reveal-up 0.7s 0.18s ease both; }
                .ft-col-3.ft-in { animation: ft-reveal-r  0.7s 0.31s ease both; }

                /* ─── CONTACT ROW HOVER ─── */
                .ft-contact-row {
                    display: flex; align-items: flex-start; gap: 12px;
                    transition: transform 0.22s ease, opacity 0.22s;
                    padding: 3px 0;
                }
                .ft-contact-row:hover { transform: translateX(6px); }

                /* ─── SHIMMER UNDERLINE ─── */
                @keyframes ft-underline-shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .ft-shimmer-line {
                    height: 2px; border-radius: 4px; width: 72px;
                    background: linear-gradient(90deg, #B21F24, #017dc5, #B21F24);
                    background-size: 200% auto;
                    animation: ft-underline-shimmer 2.5s linear infinite;
                    margin-top: -12px; margin-bottom: 8px;
                }

                /* ─── REGION PILLS with stagger ─── */
                @keyframes ft-pill-in {
                    from { opacity:0; transform: translateX(12px); }
                    to   { opacity:1; transform: translateX(0); }
                }
                .ft-region-pill {
                    display: inline-flex; align-items: center; gap: 5px;
                    font-size: 0.72rem; font-style: italic; color: #017dc5;
                    cursor: default;
                    transition: color 0.2s, transform 0.2s;
                    opacity: 0;
                }
                .ft-region-pill.ft-in {
                    animation: ft-pill-in 0.5s ease both;
                }
                .ft-region-pill:hover { color: #B21F24; transform: scale(1.05); }
                .ft-region-dot {
                    width: 4px; height: 4px; border-radius: 50%;
                    background: #B21F24; flex-shrink: 0;
                    opacity: 0.6;
                }

                /* ─── ICON PULSE ─── */
                @keyframes ft-icon-pulse {
                    0%,100% { transform:scale(1);   opacity:1;   }
                    50%     { transform:scale(1.25); opacity:0.7; }
                }
                .ft-icon-pulse { display:inline-block; animation: ft-icon-pulse 2.8s ease-in-out infinite; }
                .ft-icon-pulse-2 { animation-delay: 0.6s; }
                .ft-icon-pulse-3 { animation-delay: 1.2s; }

                /* ─── BOTTOM DIVIDER GLOW ─── */
                @keyframes ft-glow-slide {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .ft-glow-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #017dc5, #B21F24, #017dc5, transparent);
                    background-size: 300% 100%;
                    animation: ft-glow-slide 4s ease infinite;
                    margin: 0;
                }

                /* ─── BACK TO TOP ─── */
                @keyframes ft-arrow-bounce {
                    0%,100% { transform:translateY(0); }
                    50%     { transform:translateY(-5px); }
                }
                .ft-back-btn {
                    display: inline-flex; align-items:center; justify-content:center;
                    width: 36px; height: 36px; border-radius: 50%;
                    background: rgba(1,125,197,0.08);
                    border: 1px solid rgba(1,125,197,0.18);
                    color: #017dc5; cursor: pointer; font-size: 1rem;
                    text-decoration: none;
                    animation: ft-arrow-bounce 2.2s ease-in-out infinite;
                    transition: background 0.22s, color 0.22s, box-shadow 0.22s;
                }
                .ft-back-btn:hover {
                    background: #017dc5; color: #fff; animation: none;
                    transform: translateY(-3px);
                    box-shadow: 0 6px 18px rgba(1,125,197,0.28);
                }

                /* ─── ATTRIBUTION SHIMMER TEXT ─── */
                @keyframes ft-text-shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .ft-brand-text {
                    color: #017dc5;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                }

               /* ─── SOCIAL ICONS ─── */
                .ft-social-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(1, 125, 197, 0.05);
                    color: #017dc5;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(1, 125, 197, 0.1);
                }
                .ft-social-link:hover {
                    background: #017dc5;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(1, 125, 197, 0.2);
                }

                /* ─── NOISE OVERLAY ─── */
                .ft-noise {
                    position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.018;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    background-size: 160px 160px;
                }
            `}</style>

            <footer
                ref={footerRef}
                className="bg-white border-t border-gray-100 text-white relative overflow-hidden"
                style={{ isolation:'isolate' }}
            >
                {/* ── Liquid mesh background ── */}
                <LiquidMesh />
                <div className="ft-noise" />

                {/* ── Scan lines ── */}
                <div className="ft-scan-line" />
                <div className="ft-scan-line ft-scan-line-2" />

                {/* ── Floating rings + shapes ── */}
                <div className="ft-ring-tl" />
                <div className="ft-ring-br" />
                <div className="ft-diamond-bl" />
                <div className="ft-plus-tr">
                    <svg width="26" height="26" viewBox="0 0 26 26">
                        <line x1="13" y1="1" x2="13" y2="25" stroke="#017dc5" strokeWidth="1.8" strokeLinecap="round"/>
                        <line x1="1" y1="13" x2="25" y2="13" stroke="#017dc5" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                </div>

                {/* ── Morphing SVG wave at top ── */}
                <div style={{ position:'absolute', top:0, left:0, right:0, overflow:'hidden', height:40, zIndex:2 }}>
                    <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width:'100%', height:40, display:'block' }}>
                        <path className="ft-morph-path1"
                            d="M0,0 C240,40 480,0 720,28 C960,56 1200,10 1440,20 L1440,0 Z"
                            fill="rgba(1,125,197,0.07)" />
                        <path className="ft-morph-path2"
                            d="M0,0 C300,32 600,8 720,24 C840,40 1100,4 1440,18 L1440,0 Z"
                            fill="rgba(178,31,36,0.05)" />
                    </svg>
                </div>

                {/* ── Main content — py-12 matches your original ── */}
                <div className="container mx-auto px-4 md:px-8 py-12 relative" style={{ zIndex:5 }}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                        {/* Col 1 — Logo */}
                        <div className={`ft-col-1${visible ? ' ft-in' : ''} flex flex-col items-center md:items-start`}>
                            <div className="relative flex items-center gap-1">
                                <img
                                    src="/assests/bluelogo-removebg.png"
                                    alt="Brand Incept Logo"
                                    className="h-12 w-auto object-contain"
                                    onError={e => { e.target.src = 'https://placehold.co/150x48/017dc5/ffffff?text=Brand+Incept'; }}
                                />
                                <span style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: -14,
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    color: 'black',
                                    lineHeight: 1,
                                }}>®</span>
                            </div>
                            <div className="flex items-center gap-4 mt-4">
                                <a href="https://www.instagram.com/brand.incept" target="_blank" rel="noopener noreferrer" className="ft-social-link" title="Follow us on Instagram">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://www.facebook.com/brandincept" target="_blank" rel="noopener noreferrer" className="ft-social-link" title="Follow us on Facebook">
                                    <Facebook size={18} />
                                </a>
                            </div>
                            <p className="text-[#017dc5] text-sm font-light mt-4">
                                Corporate Leasing | Franchise Advisory | Business Consulting
                            </p>
                        </div> 

                        {/* Col 2 — Contact */}
                        <div className={`ft-col-2${visible ? ' ft-in' : ''} flex flex-col items-center md:items-start space-y-4`}>
                            <h3 className="text-lg text-[#017dc5] font-semibold pb-1 inline-block">
                                Contact Info
                            </h3>
                            <div className="ft-shimmer-line" />

                            <div className="space-y-3 text-black w-full">
                                <div className="ft-contact-row">
                                    <span className={`ft-icon-pulse text-[#B21F24]`}>📍</span>
                                    <span>203 Milestone Atlantis Vesu Cross Road, Surat - 395007, India</span>
                                </div>
                                {/* <div className="ft-contact-row">
                                    <span className="ft-icon-pulse ft-icon-pulse-2 text-[#B21F24]">📞</span>
                                    <span>+91 76229 34444</span>
                                </div> */}
                               <div className="ft-contact-row">
                               <span className="ft-icon-pulse ft-icon-pulse-2 text-[#B21F24]">📞</span>
                               <a
                                   href="tel:+917622934444"
                                   className="text-black hover:text-[#B21F24] transition-colors duration-200"
                               >
                                   +91 76229 34444
                               </a>
                               </div>
                                <div className="ft-contact-row">
                                    <span className="ft-icon-pulse ft-icon-pulse-3 text-[#B21F24]">✉️</span>
                                    <a href="mailto:jigar@brandincept.com"
                                        className="hover:text-[#B21F24] text-black transition-colors duration-200">
                                        jigar@brandincept.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Col 3 — Regional + copyright */}
                        <div className={`ft-col-3${visible ? ' ft-in' : ''} flex flex-col items-center md:items-end space-y-4`}>
                            <div className="text-center md:text-right">
                                <p className="text-sm font-semibold text-[#017dc5] mb-3 uppercase tracking-widest">
                                    Regional Offices
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-end gap-x-2 gap-y-1">
                                    {['Gujarat','Maharashtra','Rajasthan','Goa'].map((r, i) => (
                                        <span
                                            key={r}
                                            className={`ft-region-pill${visible ? ' ft-in' : ''}`}
                                            style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                                        >
                                            <span className="ft-region-dot" />
                                            {r}
                                            {i < 3 && <span className="text-gray-300 ml-1">|</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="text-[#017dc5] text-xs pt-4 border-t border-gray-100 w-full text-center md:text-right">
                                &copy; 2026 Brand Incept. All Rights Reserved.
                            </div>
                        </div>

                    </div>

                    {/* ── Glowing animated divider ── */}
                    {/* <div className="ft-glow-divider mt-10 mb-6" /> */}

                    {/* Sub-footer */}
                    <div className="flex flex-col items-center gap-3">
                        {/* <a
                            href="#home"
                            className="ft-back-btn"
                            title="Back to top"
                            onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); }}
                        >↑</a> */}
                        <p className="text-black pt-10 text-xs tracking-widest uppercase">
                            Designed &amp; Developed By
                        </p>
                        <p className="ft-brand-text tracking-wide">
                           
                           <a
                           href="https://www.logicmindsbyparii.com"   // ← REPLACE THIS
                           target="_blank"
                           rel="noopener noreferrer"
                           className="hover:underline focus:underline"
                           >
                              Logic Minds by Parii
                            </a>
                        </p>
                    </div>
                </div>

                {/* ── Morphing bottom wave ── */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, overflow:'hidden', height:28, zIndex:2 }}>
                    <svg viewBox="0 0 1440 28" preserveAspectRatio="none" style={{ width:'100%', height:28, display:'block' }}>
                        <path className="ft-morph-path2"
                            d="M0,28 C300,8 600,24 720,14 C840,4 1100,22 1440,12 L1440,28 Z"
                            fill="rgba(1,125,197,0.05)" />
                    </svg>
                </div>
            </footer>
        </>
    );
};

export default Footer;
