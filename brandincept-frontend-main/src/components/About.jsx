import React, { useLayoutEffect, useRef } from 'react';
import { Target, Lightbulb, TrendingUp, Linkedin, Mail, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ownerImg from '../assets/owner.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const ownerImgRef = useRef(null);
    const ownerInfoRef = useRef(null);

    const pillars = [
        {
            icon: <Target className="w-10 h-10 mt-3 text-[#b5111a] mb-4" />,
            title: 'Property & Franchise Growth',
            description: 'Unlocking the true potential of your property and brand by building long-lasting franchise partnerships.',
        },
        {
            icon: <Lightbulb className="w-10 h-10 mt-3 text-[#b5111a] mb-4" />,
            title: 'Strategic Brand Placement',
            description: 'Identifying and securing premier locations that align perfectly with a brand’s target demographic and expansion goals.',
        },
        {
            icon: <TrendingUp className="w-10 h-10 mt-3 text-[#b5111a] mb-4" />,
            title: 'Sustainable Growth Synergy',
            description: 'Creating mutually beneficial partnerships between landlords and brands designed for enduring success and stability.',
        },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(".about-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-header",
                    start: "top 85%",
                }
            });

            // Owner image animation
            gsap.from(ownerImgRef.current, {
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ownerImgRef.current,
                    start: "top 80%",
                }
            });

            // Owner text animation
            gsap.from(ownerInfoRef.current, {
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ownerInfoRef.current,
                    start: "top 80%",
                }
            });

            // Pillars animation
            gsap.from(".pillar-card", {
                y: 60,
                opacity: 0,
                duration: 1.0,
                stagger: 0,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".pillars-container",
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-4xl mx-auto text-center mb-20 about-header">
                    <h2 className="text-sm font-bold tracking-widest text-[#017dc5] uppercase mb-3">Who We Are</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-[#017dc5] mb-6">Enthusiastic Retail Professionals</h3>
                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                        We are an ambitious team combining profound <span className="font-semibold text-[#017dc5]">local insights</span> with <span className="font-semibold text-[#017dc5]">global market expertise</span>.
                        Our value proposition goes beyond simple transactions; we focus on
                        <span className="text-[#017dc5] font-medium"> supporting your growth and acting as true partners for your franchise business.</span>
                    </p>
                </div>

                {/* Owner Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-24 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-red-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-60 bg-red-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>

                    <div ref={ownerImgRef} className="lg:w-1/4 relative z-10">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-[#017dc5]/20 rounded-2xl blur-lg transition duration-500 group-hover:bg-[#017dc5]/30"></div>
                            <img
                                src={ownerImg}
                                alt="Founder"
                                className="relative rounded-2xl shadow-2xl w-80 object-cover transition duration-500 transform group-hover:scale-[1.02]"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Founder'; }}
                            />
                        </div>
                    </div>

                    <div ref={ownerInfoRef} className="lg:w-2/3 space-y-6 relative z-10">
                        <div className="inline-block transform -rotate-3 mb-2">
                            <span className="bg-[#017dc5] text-white px-4 py-1 rounded text-sm font-bold tracking-widest uppercase">
                                Our Visionary
                            </span>
                        </div>
                        <h4 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Jigar Desai
                        </h4>
                        <p className="text-xl font-bold text-[#017dc5] h-1 bg-gray-100 max-w-[100px]"></p>

                        <div className="relative">
                            <Quote className="absolute -top-4 -left-6 w-12 h-12 text-[#017dc5]/10" />
                            <p className="text-xl text-gray-700 italic leading-relaxed font-light pl-6 border-l-4 border-red-500/20">
                                "At Brand Incept, we don't just facilitate expansion; we nurture the symbiotic growth between brands and local landscapes. Our mission is to bridge the gap between global standards and local opportunities."
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <p className="text-gray-600 leading-relaxed">
                                With years of dedicated experience in the retail and franchise advisory sector, <span className="font-semibold text-gray-800">Jigar Desai</span> has been instrumental in shaping the success stories of numerous brands across India. His deep understanding of market trends and property value has made <span className="text-[#017dc5] font-medium italic">Brand Incept</span> a trusted name in corporate leasing.
                            </p>

                            <div className="flex items-center gap-6 pt-6">
                                <a href="https://www.linkedin.com/in/jigardesai09?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BG5nibvFDTBu2AGUQen2DKw%3D%3D" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all transform hover:-translate-y-1">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                                <a href="mailto:jigar@brandincept.com" className="p-3 bg-gray-100 rounded-full hover:bg-red-50 hover:text-[#b5111a] transition-all transform hover:-translate-y-1">
                                    <Mail className="w-6 h-6" />
                                </a>
                                <div className="h-10 w-px bg-gray-200"></div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Managing Director</p>
                                    <p className="text-sm font-bold text-gray-800">Founder of Brand Incept</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pillars-container">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="pillar-card bg-white p-8 md:p-10 rounded-2xl shadow-md md:shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group translate-y-0 hover:-translate-y-3 active:scale-98"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-[#017dc5] group-hover:bg-gray-300 transition-all duration-500 transform group-hover:rotate-6">
                                <span className="group-hover:text-[#017dc5] transition-colors duration-500">
                                    {React.cloneElement(pillar.icon, {
                                        className: `w-8 h-8 md:w-10 md:h-10 mt-3 mb-4 transition-colors duration-500 ${
                                            // This is a bit tricky, I'll just rely on the parent group-hover
                                            ""
                                            }`
                                    })}
                                </span>
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold text-[#017dc5] mb-4 group-hover:text-gray-900 transition-colors">{pillar.title}</h4>
                            <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;



// import React, { useEffect, useRef, useState } from 'react';
// import { Target, Lightbulb, TrendingUp, Linkedin, Mail, Quote, CheckCircle2 } from 'lucide-react';
// import ownerImg from '../assets/owner.png';

// /* ─────────────────────────────────────────────
//    DETECT TOUCH DEVICE
// ───────────────────────────────────────────── */
// const useIsTouchDevice = () => {
//     const [isTouch, setIsTouch] = useState(false);
//     useEffect(() => {
//         setIsTouch(
//             'ontouchstart' in window ||
//             navigator.maxTouchPoints > 0 ||
//             window.matchMedia('(hover: none)').matches
//         );
//     }, []);
//     return isTouch;
// };

// /* ─────────────────────────────────────────────
//    INTERSECTION OBSERVER REVEAL HOOK
// ───────────────────────────────────────────── */
// const useReveal = (threshold = 0.15) => {
//     const ref = useRef(null);
//     const [visible, setVisible] = useState(false);
//     useEffect(() => {
//         const el = ref.current;
//         if (!el) return;
//         const obs = new IntersectionObserver(
//             ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
//             { threshold }
//         );
//         obs.observe(el);
//         return () => obs.disconnect();
//     }, [threshold]);
//     return [ref, visible];
// };

// /* ─────────────────────────────────────────────
//    AURORA CANVAS
// ───────────────────────────────────────────── */
// const AuroraCanvas = () => {
//     const canvasRef = useRef(null);
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         let animId, t = 0;
//         const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
//         resize();
//         window.addEventListener('resize', resize);
//         const blobs = [
//             { x: 0.08, y: 0.15, r: 0.36, color: '181,17,26',  speed: 0.00016, phase: 0   },
//             { x: 0.88, y: 0.12, r: 0.40, color: '30,41,59',   speed: 0.00012, phase: 1.8 },
//             { x: 0.55, y: 0.80, r: 0.32, color: '220,70,60',  speed: 0.00019, phase: 3.5 },
//             { x: 0.92, y: 0.72, r: 0.26, color: '15,25,50',   speed: 0.00014, phase: 0.9 },
//         ];
//         const draw = () => {
//             t++;
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             blobs.forEach(b => {
//                 const ox = Math.sin(t * b.speed * 1000 + b.phase) * 0.10;
//                 const oy = Math.cos(t * b.speed * 1000 + b.phase * 1.3) * 0.09;
//                 const cx = (b.x + ox) * canvas.width;
//                 const cy = (b.y + oy) * canvas.height;
//                 const rad = b.r * Math.min(canvas.width, canvas.height);
//                 const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
//                 g.addColorStop(0,   `rgba(${b.color},0.09)`);
//                 g.addColorStop(0.5, `rgba(${b.color},0.035)`);
//                 g.addColorStop(1,   `rgba(${b.color},0)`);
//                 ctx.fillStyle = g;
//                 ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
//             });
//             animId = requestAnimationFrame(draw);
//         };
//         draw();
//         return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
//     }, []);
//     return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0, pointerEvents:'none' }} />;
// };

// /* ─────────────────────────────────────────────
//    PARTICLE CANVAS
// ───────────────────────────────────────────── */
// const ParticleCanvas = () => {
//     const canvasRef = useRef(null);
//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         let animId;
//         const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
//         resize();
//         window.addEventListener('resize', resize);
//         const pts = Array.from({ length: 38 }, () => ({
//             x: Math.random() * canvas.width, y: Math.random() * canvas.height,
//             vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
//             r: Math.random() * 1.6 + 0.5, alpha: Math.random() * 0.45 + 0.15,
//             red: Math.random() > 0.5,
//         }));
//         const draw = () => {
//             const W = canvas.width, H = canvas.height;
//             ctx.clearRect(0, 0, W, H);
//             for (let i = 0; i < pts.length; i++) {
//                 for (let j = i + 1; j < pts.length; j++) {
//                     const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
//                     if (d < 130) {
//                         ctx.beginPath();
//                         ctx.strokeStyle = `rgba(181,17,26,${(1 - d / 130) * 0.07})`;
//                         ctx.lineWidth = 0.6;
//                         ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
//                         ctx.stroke();
//                     }
//                 }
//                 const p = pts[i];
//                 ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//                 ctx.fillStyle = p.red ? `rgba(181,17,26,${p.alpha})` : `rgba(30,41,59,${p.alpha * 0.55})`;
//                 ctx.fill();
//                 p.x += p.vx; p.y += p.vy;
//                 if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
//                 if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
//             }
//             animId = requestAnimationFrame(draw);
//         };
//         draw();
//         return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
//     }, []);
//     return <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }} />;
// };

// /* ─────────────────────────────────────────────
//    PILLAR CARD — always active on touch
// ───────────────────────────────────────────── */
// const PillarCard = ({ icon: Icon, title, description, delay, isTouch }) => {
//     const [cardRef, visible] = useReveal(0.1);
//     return (
//         <div
//             ref={cardRef}
//             className={`abt-pillar${isTouch ? ' abt-pillar--active' : ''}`}
//             style={{
//                 animationDelay: delay,
//                 opacity: visible ? undefined : 0,
//                 animation: visible ? `abt-reveal 0.7s ${delay} both` : 'none',
//             }}
//         >
//             <div className="abt-pillar__fill" />
//             <div className="abt-pillar__ring" />
//             <div className="abt-pillar__ring-inner" />
//             <div className="abt-pillar__corner-dot" />

//             <div className="abt-pillar__icon-wrap">
//                 <Icon size={26} strokeWidth={1.8} className="abt-pillar__icon" />
//             </div>
//             <h4 className="abt-pillar__title">{title}</h4>
//             <p className="abt-pillar__desc">{description}</p>

//             <div className="abt-pillar__arrow">
//                 <CheckCircle2 size={14} />
//                 <span>Core Pillar</span>
//             </div>
//         </div>
//     );
// };

// /* ─────────────────────────────────────────────
//    MAIN ABOUT SECTION
// ───────────────────────────────────────────── */
// const About = () => {
//     const isTouch = useIsTouchDevice();
//     const [headerRef, headerVisible] = useReveal(0.1);
//     const [imgRef, imgVisible] = useReveal(0.1);
//     const [infoRef, infoVisible] = useReveal(0.1);

//     const pillars = [
//         {
//             icon: Target,
//             title: 'Property & Franchise Growth',
//             description: 'Unlocking the true potential of your property and brand by building long-lasting franchise partnerships.',
//             delay: '0.05s',
//         },
//         {
//             icon: Lightbulb,
//             title: 'Strategic Brand Placement',
//             description: 'Identifying and securing premier locations that align perfectly with a brand\'s target demographic and expansion goals.',
//             delay: '0.18s',
//         },
//         {
//             icon: TrendingUp,
//             title: 'Sustainable Growth Synergy',
//             description: 'Creating mutually beneficial partnerships between landlords and brands designed for enduring success and stability.',
//             delay: '0.31s',
//         },
//     ];

//     return (
//         <>
//             <style>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

//                 /* ── SECTION ── */
//                 #about {
//                     position: relative;
//                     padding: 7rem 0 8rem;
//                     background: #f8f6f3;
//                     overflow: hidden;
//                     font-family: 'DM Sans', sans-serif;
//                 }
//                 @media (max-width: 640px) { #about { padding: 5rem 0 6rem; } }

//                 /* ── BACKGROUNDS ── */
//                 .abt-bg-grid {
//                     position: absolute; inset: 0; z-index: 0; pointer-events: none;
//                     background-image:
//                         linear-gradient(rgba(30,41,59,0.052) 1px, transparent 1px),
//                         linear-gradient(90deg,rgba(30,41,59,0.052) 1px, transparent 1px);
//                     background-size: 48px 48px;
//                 }
//                 .abt-bg-noise {
//                     position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0.022;
//                     background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
//                     background-size: 180px 180px;
//                 }

//                 /* ── DECORATIVE SHAPES ── */
//                 @keyframes abt-spin    { to { transform: rotate(360deg); } }
//                 @keyframes abt-spin-r  { to { transform: rotate(-360deg); } }
//                 @keyframes abt-float1  { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-18px) rotate(7deg)} }
//                 @keyframes abt-float2  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px) rotate(-5deg)} }
//                 @keyframes abt-pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(181,17,26,.22)} 50%{box-shadow:0 0 0 10px rgba(181,17,26,0)} }
//                 @keyframes abt-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
//                 @keyframes abt-reveal  { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
//                 @keyframes abt-reveal-l{ from{opacity:0;transform:translateX(-50px)} to{opacity:1;transform:translateX(0)} }
//                 @keyframes abt-reveal-r{ from{opacity:0;transform:translateX(50px)} to{opacity:1;transform:translateX(0)} }
//                 @keyframes abt-draw    { from{stroke-dashoffset:300;opacity:0} to{stroke-dashoffset:0;opacity:1} }
//                 @keyframes abt-card-rs { to{transform:rotate(360deg)} }
//                 @keyframes abt-card-rsr{ to{transform:rotate(-360deg)} }

//                 .abt-deco-ring {
//                     position:absolute; top:4%; right:4%; z-index:3; pointer-events:none;
//                     width:170px; height:170px; border-radius:50%;
//                     border:1.5px solid rgba(181,17,26,0.13);
//                     animation: abt-spin 32s linear infinite;
//                 }
//                 .abt-deco-ring::before {
//                     content:''; position:absolute; inset:22px; border-radius:50%;
//                     border:1px dashed rgba(181,17,26,0.18);
//                     animation: abt-spin-r 19s linear infinite;
//                 }
//                 .abt-deco-ring::after {
//                     content:''; position:absolute; top:50%; left:50%;
//                     width:8px; height:8px; border-radius:50%;
//                     background:#b5111a; opacity:0.4;
//                     transform:translateY(-81px) translateX(-4px);
//                 }
//                 .abt-deco-diamond {
//                     position:absolute; bottom:12%; left:4%; z-index:3; pointer-events:none;
//                     width:58px; height:58px;
//                     border:2px solid rgba(30,41,59,0.12); border-radius:10px;
//                     transform:rotate(45deg);
//                     animation: abt-float1 7s ease-in-out infinite;
//                 }
//                 .abt-deco-tri {
//                     position:absolute; top:25%; left:6%; z-index:3; pointer-events:none;
//                     opacity:0.19; animation: abt-float2 6s ease-in-out infinite;
//                 }
//                 .abt-deco-plus {
//                     position:absolute; bottom:22%; right:6%; z-index:3; pointer-events:none;
//                     opacity:0.18; animation: abt-float1 5.5s ease-in-out 1s infinite;
//                 }
//                 .abt-deco-dots {
//                     position:absolute; top:50%; right:3%; z-index:3; pointer-events:none;
//                     opacity:0.17; animation: abt-float2 8s ease-in-out 0.5s infinite;
//                 }

//                 /* ── CONTENT WRAPPER ── */
//                 .abt-inner {
//                     position:relative; z-index:5;
//                     max-width:1140px; margin:0 auto; padding:0 1.5rem;
//                 }
//                 @media(max-width:640px){ .abt-inner{ padding:0 1rem; } }

//                 /* ── HEADER ── */
//                 .abt-header { text-align:center; margin-bottom:5rem; }
//                 .abt-eyebrow {
//                     display:inline-flex; align-items:center; gap:8px;
//                     font-size:0.72rem; font-weight:600; letter-spacing:0.14em; text-transform:uppercase;
//                     color:#b5111a; background:rgba(181,17,26,0.07);
//                     border:1px solid rgba(181,17,26,0.16);
//                     padding:6px 14px; border-radius:100px; margin-bottom:1.4rem;
//                 }
//                 .abt-eyebrow-dot {
//                     width:6px; height:6px; border-radius:50%;
//                     background:#b5111a; box-shadow:0 0 0 3px rgba(181,17,26,0.2);
//                     animation: abt-pulse 2s ease-in-out infinite;
//                 }
//                 .abt-title {
//                     font-family:'Syne',sans-serif; font-weight:900;
//                     font-size:clamp(2rem,4.5vw,3.4rem);
//                     line-height:1.08; letter-spacing:-0.03em;
//                     color:#1e293b; margin-bottom:1.2rem;
//                 }
//                 .abt-title-accent {
//                     background:linear-gradient(135deg,#b5111a 0%,#e63946 50%,#b5111a 100%);
//                     background-size:200% auto;
//                     -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
//                     animation: abt-shimmer 4s linear infinite;
//                 }
//                 .abt-divider {
//                     width:48px; height:3px; border-radius:8px;
//                     background:linear-gradient(90deg,#b5111a,#e63946);
//                     margin:0 auto 1.4rem;
//                 }
//                 .abt-subtitle {
//                     font-size:clamp(0.95rem,1.5vw,1.08rem);
//                     color:#475569; line-height:1.78; max-width:620px; margin:0 auto;
//                 }
//                 .abt-subtitle strong { color:#b5111a; font-weight:600; }

//                 /* ── OWNER CARD ── */
//                 .abt-owner-card {
//                     position:relative;
//                     display:flex; flex-direction:column; gap:2.5rem;
//                     background:rgba(255,255,255,0.80);
//                     backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
//                     border:1px solid rgba(255,255,255,0.95);
//                     border-radius:32px;
//                     padding:2.8rem;
//                     box-shadow:0 8px 40px rgba(30,41,59,0.09), 0 2px 8px rgba(181,17,26,0.05);
//                     overflow:hidden;
//                     margin-bottom:5rem;
//                 }
//                 @media(min-width:960px){
//                     .abt-owner-card { flex-direction:row; align-items:center; gap:3.5rem; }
//                 }
//                 @media(max-width:640px){ .abt-owner-card{ padding:2rem 1.6rem; border-radius:24px; } }

//                 /* owner card glow corner */
//                 .abt-owner-card::before {
//                     content:''; position:absolute; top:-80px; right:-80px;
//                     width:260px; height:260px; border-radius:50%;
//                     background:radial-gradient(circle,rgba(181,17,26,0.08) 0%,transparent 70%);
//                     pointer-events:none; z-index:0;
//                 }
//                 .abt-owner-card::after {
//                     content:''; position:absolute; bottom:-60px; left:-60px;
//                     width:200px; height:200px; border-radius:50%;
//                     background:radial-gradient(circle,rgba(30,41,59,0.06) 0%,transparent 70%);
//                     pointer-events:none; z-index:0;
//                 }

//                 /* ── IMAGE COLUMN ── */
//                 .abt-img-col {
//                     position:relative; z-index:1; flex-shrink:0;
//                 }
//                 @media(min-width:960px){ .abt-img-col{ width:300px; } }

//                 .abt-img-wrap {
//                     position:relative; border-radius:22px; overflow:hidden;
//                     box-shadow:0 16px 48px rgba(30,41,59,0.14), 0 4px 12px rgba(181,17,26,0.10);
//                     transition: transform 0.45s cubic-bezier(.16,1,.3,1), box-shadow 0.45s;
//                 }
//                 @media(hover:hover){
//                     .abt-img-wrap:hover {
//                         transform:scale(1.03) translateY(-4px);
//                         box-shadow:0 24px 60px rgba(30,41,59,0.18), 0 6px 20px rgba(181,17,26,0.14);
//                     }
//                 }
//                 .abt-img-glow {
//                     position:absolute; inset:-4px; border-radius:26px; z-index:-1;
//                     background:linear-gradient(135deg,rgba(181,17,26,0.25),rgba(30,41,59,0.18));
//                     filter:blur(10px);
//                     animation: abt-pulse 3s ease-in-out infinite;
//                 }
//                 .abt-img-wrap img {
//                     width:100%; display:block; border-radius:22px; object-fit:cover;
//                 }

//                 /* floating badge on image */
//                 .abt-img-badge {
//                     position:absolute; bottom:16px; left:16px;
//                     display:flex; align-items:center; gap:8px;
//                     background:rgba(255,255,255,0.88);
//                     backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
//                     border:1px solid rgba(255,255,255,0.95);
//                     border-radius:14px; padding:10px 14px;
//                     box-shadow:0 4px 20px rgba(30,41,59,0.12);
//                 }
//                 .abt-img-badge-dot {
//                     width:8px; height:8px; border-radius:50%; background:#22c55e;
//                     box-shadow:0 0 0 3px rgba(34,197,94,0.25);
//                     animation: abt-pulse 2s ease-in-out infinite;
//                 }

//                 /* ── INFO COLUMN ── */
//                 .abt-info-col { position:relative; z-index:1; flex:1; }

//                 .abt-visionary-tag {
//                     display:inline-block;
//                     background:linear-gradient(135deg,#b5111a,#e63946);
//                     color:#fff; font-size:0.68rem; font-weight:700;
//                     letter-spacing:0.14em; text-transform:uppercase;
//                     padding:5px 12px; border-radius:6px;
//                     margin-bottom:1rem;
//                     transform:rotate(-2deg); display:inline-block;
//                 }
//                 .abt-founder-name {
//                     font-family:'Syne',sans-serif; font-weight:900;
//                     font-size:clamp(2rem,4vw,3rem);
//                     letter-spacing:-0.03em; color:#1e293b;
//                     margin-bottom:0.5rem; line-height:1.05;
//                 }
//                 .abt-founder-rule {
//                     width:56px; height:3px; border-radius:8px;
//                     background:linear-gradient(90deg,#b5111a,#e63946);
//                     margin-bottom:1.4rem;
//                 }
//                 .abt-quote-block {
//                     position:relative;
//                     padding:1.2rem 1.4rem;
//                     border-left:3px solid rgba(181,17,26,0.30);
//                     background:rgba(181,17,26,0.03);
//                     border-radius:0 12px 12px 0;
//                     margin-bottom:1.4rem;
//                 }
//                 .abt-quote-icon {
//                     position:absolute; top:-10px; left:-6px;
//                     color:rgba(181,17,26,0.12);
//                 }
//                 .abt-quote-text {
//                     font-size:0.98rem; color:#475569;
//                     line-height:1.78; font-style:italic; font-weight:400;
//                 }
//                 .abt-bio {
//                     font-size:0.93rem; color:#475569; line-height:1.75; margin-bottom:1.6rem;
//                 }
//                 .abt-bio strong { color:#1e293b; font-weight:600; }
//                 .abt-bio em { color:#b5111a; font-style:italic; }

//                 /* social row */
//                 .abt-social-row {
//                     display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
//                 }
//                 .abt-social-btn {
//                     width:44px; height:44px; border-radius:50%;
//                     background:rgba(30,41,59,0.06);
//                     border:1px solid rgba(30,41,59,0.10);
//                     display:flex; align-items:center; justify-content:center;
//                     color:#475569; text-decoration:none;
//                     transition:all 0.25s;
//                 }
//                 @media(hover:hover){
//                     .abt-social-btn:hover { transform:translateY(-3px); box-shadow:0 8px 20px rgba(30,41,59,0.12); }
//                     .abt-social-btn.linkedin:hover { background:#dbeafe; color:#2563eb; border-color:#bfdbfe; }
//                     .abt-social-btn.mail:hover    { background:rgba(181,17,26,0.08); color:#b5111a; border-color:rgba(181,17,26,0.20); }
//                 }
//                 /* mobile: always show colored */
//                 @media(max-width:768px){
//                     .abt-social-btn.linkedin { background:#dbeafe; color:#2563eb; border-color:#bfdbfe; }
//                     .abt-social-btn.mail     { background:rgba(181,17,26,0.08); color:#b5111a; border-color:rgba(181,17,26,0.20); }
//                 }
//                 .abt-social-sep { width:1px; height:36px; background:rgba(30,41,59,0.12); }
//                 .abt-role-block {}
//                 .abt-role-label {
//                     font-size:0.68rem; font-weight:700; text-transform:uppercase;
//                     letter-spacing:0.12em; color:#94a3b8; margin-bottom:2px;
//                 }
//                 .abt-role-value {
//                     font-family:'Syne',sans-serif; font-weight:700;
//                     font-size:0.88rem; color:#1e293b;
//                 }

//                 /* ── PILLAR CARDS ── */
//                 .abt-pillars-grid {
//                     display:grid;
//                     grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
//                     gap:1.8rem;
//                 }
//                 @media(max-width:640px){ .abt-pillars-grid{ grid-template-columns:1fr; gap:1.2rem; } }

//                 .abt-pillar {
//                     position:relative; border-radius:24px; overflow:hidden;
//                     padding:2.4rem 2rem 2rem;
//                     display:flex; flex-direction:column; align-items:flex-start;
//                     background:rgba(255,255,255,0.82);
//                     backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
//                     border:1px solid rgba(255,255,255,0.95);
//                     box-shadow:0 4px 20px rgba(30,41,59,0.07), 0 1px 4px rgba(181,17,26,0.04);
//                     transition:transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s;
//                     will-change:transform;
//                     -webkit-tap-highlight-color:transparent;
//                     cursor:default;
//                 }
//                 @media(max-width:640px){ .abt-pillar{ padding:2rem 1.6rem 1.8rem; } }

//                 /* desktop hover */
//                 @media(hover:hover){
//                     .abt-pillar:hover { transform:translateY(-8px) scale(1.012); box-shadow:0 20px 56px rgba(30,41,59,0.13), 0 4px 14px rgba(181,17,26,0.10); }
//                     .abt-pillar:hover .abt-pillar__fill   { opacity:1; }
//                     .abt-pillar:hover .abt-pillar__icon-wrap { background:rgba(255,255,255,0.22); }
//                     .abt-pillar:hover .abt-pillar__icon   { color:#fff; }
//                     .abt-pillar:hover .abt-pillar__title  { color:#fff; }
//                     .abt-pillar:hover .abt-pillar__desc   { color:rgba(255,255,255,0.88); }
//                     .abt-pillar:hover .abt-pillar__arrow  { opacity:1; transform:translateY(0); color:#fff; }
//                     .abt-pillar:hover .abt-pillar__corner-dot { background:rgba(255,255,255,0.4); }
//                     .abt-pillar:hover .abt-pillar__ring   { border-color:rgba(255,255,255,0.18); }
//                     .abt-pillar:hover .abt-pillar__ring-inner { border-color:rgba(255,255,255,0.12); }
//                 }

//                 /* mobile always-active */
//                 .abt-pillar--active                            { box-shadow:0 12px 36px rgba(30,41,59,0.11), 0 4px 12px rgba(181,17,26,0.09); }
//                 .abt-pillar--active .abt-pillar__fill          { opacity:1; }
//                 .abt-pillar--active .abt-pillar__icon-wrap     { background:rgba(255,255,255,0.22); }
//                 .abt-pillar--active .abt-pillar__icon          { color:#fff; }
//                 .abt-pillar--active .abt-pillar__title         { color:#fff; }
//                 .abt-pillar--active .abt-pillar__desc          { color:rgba(255,255,255,0.88); }
//                 .abt-pillar--active .abt-pillar__arrow         { opacity:1; transform:translateY(0); color:#fff; }
//                 .abt-pillar--active .abt-pillar__corner-dot    { background:rgba(255,255,255,0.4); }
//                 .abt-pillar--active .abt-pillar__ring          { border-color:rgba(255,255,255,0.18); }
//                 .abt-pillar--active .abt-pillar__ring-inner    { border-color:rgba(255,255,255,0.12); }

//                 /* card internals */
//                 .abt-pillar__fill {
//                     position:absolute; inset:0; z-index:0; opacity:0;
//                     background:linear-gradient(135deg,#b5111a 0%,#8b0d14 55%,#1e293b 100%);
//                     transition:opacity 0.4s;
//                     pointer-events:none;
//                 }
//                 .abt-pillar__ring {
//                     position:absolute; top:-55px; right:-55px; z-index:0;
//                     width:170px; height:170px; border-radius:50%;
//                     border:1px solid rgba(181,17,26,0.08);
//                     animation: abt-card-rs 25s linear infinite;
//                     transition:border-color 0.4s; pointer-events:none;
//                 }
//                 .abt-pillar__ring-inner {
//                     position:absolute; top:-28px; right:-28px; z-index:0;
//                     width:95px; height:95px; border-radius:50%;
//                     border:1px dashed rgba(181,17,26,0.10);
//                     animation: abt-card-rsr 15s linear infinite;
//                     transition:border-color 0.4s; pointer-events:none;
//                 }
//                 .abt-pillar__corner-dot {
//                     position:absolute; bottom:18px; right:18px; z-index:1;
//                     width:8px; height:8px; border-radius:50%;
//                     background:rgba(181,17,26,0.25); transition:background 0.4s;
//                 }
//                 .abt-pillar__icon-wrap {
//                     position:relative; z-index:1;
//                     width:58px; height:58px; border-radius:15px;
//                     background:rgba(181,17,26,0.08);
//                     display:flex; align-items:center; justify-content:center;
//                     margin-bottom:1.4rem; flex-shrink:0;
//                     transition:background 0.4s;
//                 }
//                 .abt-pillar__icon { color:#b5111a; transition:color 0.4s; }
//                 .abt-pillar__title {
//                     position:relative; z-index:1;
//                     font-family:'Syne',sans-serif; font-weight:800;
//                     font-size:1.22rem; letter-spacing:-0.02em;
//                     color:#1e293b; margin-bottom:0.8rem;
//                     transition:color 0.4s;
//                 }
//                 .abt-pillar__desc {
//                     position:relative; z-index:1;
//                     font-size:0.92rem; line-height:1.72; color:#475569;
//                     margin-bottom:1rem; flex-grow:1;
//                     transition:color 0.4s;
//                 }
//                 .abt-pillar__arrow {
//                     position:relative; z-index:1;
//                     display:flex; align-items:center; gap:6px;
//                     font-size:0.82rem; font-weight:600; color:#b5111a;
//                     opacity:0; transform:translateY(8px);
//                     transition:opacity 0.35s, transform 0.35s, color 0.4s;
//                     margin-top:0.4rem;
//                 }

//                 /* ── TRUST STRIP ── */
//                 .abt-trust {
//                     position:relative; z-index:5;
//                     display:flex; align-items:center; justify-content:center;
//                     flex-wrap:wrap; gap:2rem; margin-top:4rem; padding:0 1rem;
//                 }
//                 .abt-trust-item {
//                     display:flex; align-items:center; gap:8px;
//                     font-size:0.83rem; font-weight:500; color:#64748b;
//                 }
//                 @media(max-width:640px){ .abt-trust{ gap:1rem; margin-top:2.5rem; } .abt-trust-item{font-size:0.78rem;} }
//             `}</style>

//             <section id="about">
//                 {/* Backgrounds */}
//                 <div className="abt-bg-grid" />
//                 <AuroraCanvas />
//                 <div className="abt-bg-noise" />
//                 <ParticleCanvas />

//                 {/* Decorative shapes */}
//                 <div className="abt-deco-ring" />
//                 <div className="abt-deco-diamond" />
//                 <div className="abt-deco-tri">
//                     <svg width="50" height="50" viewBox="0 0 50 50">
//                         <polygon points="25,3 48,47 2,47" fill="none" stroke="#b5111a" strokeWidth="2" />
//                     </svg>
//                 </div>
//                 <div className="abt-deco-plus">
//                     <svg width="32" height="32" viewBox="0 0 32 32">
//                         <line x1="16" y1="2" x2="16" y2="30" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
//                         <line x1="2" y1="16" x2="30" y2="16" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
//                     </svg>
//                 </div>
//                 <div className="abt-deco-dots">
//                     <svg width="64" height="64" viewBox="0 0 64 64">
//                         {[0,22,44].flatMap(cx => [0,22,44].map(cy => (
//                             <circle key={`${cx}-${cy}`} cx={cx+10} cy={cy+10} r="3" fill="#b5111a" />
//                         )))}
//                     </svg>
//                 </div>

//                 {/* Content */}
//                 <div className="abt-inner">

//                     {/* ── HEADER ── */}
//                     <div
//                         ref={headerRef}
//                         className="abt-header"
//                         style={{ animation: headerVisible ? 'abt-reveal 0.8s 0.05s both' : 'none', opacity: headerVisible ? undefined : 0 }}
//                     >
//                         <div style={{ display:'flex', justifyContent:'center', marginBottom:'1.4rem' }}>
//                             <span className="abt-eyebrow">
//                                 <span className="abt-eyebrow-dot" />
//                                 Who We Are
//                             </span>
//                         </div>
//                         <h2 className="abt-title">
//                             Enthusiastic <span className="abt-title-accent">Retail</span> Professionals
//                         </h2>
//                         <div className="abt-divider" />
//                         <p className="abt-subtitle">
//                             We are an ambitious team combining profound{' '}
//                             <strong>local insights</strong> with <strong>global market expertise</strong>.
//                             Our value proposition goes beyond simple transactions — we focus on{' '}
//                             <strong>supporting your growth and acting as true partners</strong>{' '}
//                             for your franchise business.
//                         </p>
//                     </div>

//                     {/* ── OWNER CARD ── */}
//                     <div className="abt-owner-card">

//                         {/* Image */}
//                         <div
//                             ref={imgRef}
//                             className="abt-img-col"
//                             style={{ animation: imgVisible ? 'abt-reveal-l 1s 0.15s both' : 'none', opacity: imgVisible ? undefined : 0 }}
//                         >
//                             <div className="abt-img-wrap">
//                                 <div className="abt-img-glow" />
//                                 <img
//                                     src={ownerImg}
//                                     alt="Jigar Kakkad – Founder"
//                                     onError={(e) => { e.target.src='https://placehold.co/600x800/1e293b/ffffff?text=Jigar+Kakkad'; }}
//                                 />
//                                 {/* floating badge */}
//                                 <div className="abt-img-badge">
//                                     <div className="abt-img-badge-dot" />
//                                     <div>
//                                         <div style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#64748b', lineHeight:1 }}>Status</div>
//                                         <div style={{ fontSize:'0.78rem', fontWeight:700, color:'#1e293b', lineHeight:1.2, marginTop:2 }}>Available</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Info */}
//                         <div
//                             ref={infoRef}
//                             className="abt-info-col"
//                             style={{ animation: infoVisible ? 'abt-reveal-r 1s 0.25s both' : 'none', opacity: infoVisible ? undefined : 0 }}
//                         >
//                             <span className="abt-visionary-tag">Our Visionary</span>

//                             <h4 className="abt-founder-name">Jigar Kakkad</h4>
//                             <div className="abt-founder-rule" />

//                             <div className="abt-quote-block">
//                                 <Quote size={32} className="abt-quote-icon" />
//                                 <p className="abt-quote-text">
//                                     "At Brand Incept, we don't just facilitate expansion; we nurture the symbiotic growth between brands and local landscapes. Our mission is to bridge the gap between global standards and local opportunities."
//                                 </p>
//                             </div>

//                             <p className="abt-bio">
//                                 With years of dedicated experience in the retail and franchise advisory sector,{' '}
//                                 <strong>Jigar Kakkad</strong> has been instrumental in shaping the success stories
//                                 of numerous brands across India. His deep understanding of market trends and property
//                                 value has made <em>Brand Incept</em> a trusted name in corporate leasing.
//                             </p>

//                             <div className="abt-social-row">
//                                 <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
//                                     className="abt-social-btn linkedin" aria-label="LinkedIn">
//                                     <Linkedin size={18} />
//                                 </a>
//                                 <a href="mailto:jigar@brandincept.com"
//                                     className="abt-social-btn mail" aria-label="Email">
//                                     <Mail size={18} />
//                                 </a>
//                                 <div className="abt-social-sep" />
//                                 <div className="abt-role-block">
//                                     <div className="abt-role-label">Managing Director</div>
//                                     <div className="abt-role-value">Founder of Brand Incept</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ── PILLAR CARDS ── */}
//                     <div className="abt-pillars-grid">
//                         {pillars.map((p, i) => (
//                             <PillarCard key={i} isTouch={isTouch} {...p} />
//                         ))}
//                     </div>

//                     {/* ── TRUST STRIP ── */}
//                     <div className="abt-trust">
//                         {[
//                             ['50+',  'Brands Advised'],
//                             ['320+', 'Locations Secured'],
//                             ['12+',  'Years Experience'],
//                             ['94%',  'Client Retention'],
//                         ].map(([num, label]) => (
//                             <div className="abt-trust-item" key={label}>
//                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                                     <circle cx="7" cy="7" r="6.5" stroke="#b5111a" strokeOpacity="0.35"/>
//                                     <path d="M4 7l2 2 4-4" stroke="#b5111a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                                 </svg>
//                                 <strong style={{ color:'#1e293b', fontFamily:"'Syne',sans-serif" }}>{num}</strong>
//                                 {label}
//                             </div>
//                         ))}
//                     </div>

//                 </div>
//             </section>
//         </>
//     );
// };

// export default About;