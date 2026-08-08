import React, { useEffect, useRef, useState } from 'react';
import { Building2, Store, ArrowUpRight, CheckCircle2 } from 'lucide-react';

/* ─────────────────────────────────────────────
   AURORA CANVAS — same style as Hero
───────────────────────────────────────────── */
const AuroraCanvas = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId, t = 0;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);
        const blobs = [
            { x: 0.1,  y: 0.2,  r: 0.35, color: [181,17,26],  speed: 0.00016, phase: 0   },
            { x: 0.85, y: 0.1,  r: 0.38, color: [30,41,59],   speed: 0.00012, phase: 1.8 },
            { x: 0.6,  y: 0.8,  r: 0.30, color: [220,70,60],  speed: 0.00020, phase: 3.5 },
            { x: 0.9,  y: 0.7,  r: 0.25, color: [15,25,50],   speed: 0.00014, phase: 0.9 },
        ];
        const draw = () => {
            t++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            blobs.forEach(b => {
                const ox = Math.sin(t * b.speed * 1000 + b.phase) * 0.10;
                const oy = Math.cos(t * b.speed * 1000 + b.phase * 1.3) * 0.09;
                const cx = (b.x + ox) * canvas.width;
                const cy = (b.y + oy) * canvas.height;
                const rad = b.r * Math.min(canvas.width, canvas.height);
                const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
                g.addColorStop(0,   `rgba(${b.color},0.09)`);
                g.addColorStop(0.5, `rgba(${b.color},0.035)`);
                g.addColorStop(1,   `rgba(${b.color},0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(cx, cy, rad, 0, Math.PI * 2);
                ctx.fill();
            });
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);
    return (
        <canvas ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }} />
    );
};

/* ─────────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────────── */
const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);
        const pts = Array.from({ length: 35 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.5,
            alpha: Math.random() * 0.45 + 0.15,
            red: Math.random() > 0.5,
        }));
        const draw = () => {
            const W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
                    if (d < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(181,17,26,${(1 - d / 130) * 0.07})`;
                        ctx.lineWidth = 0.6;
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
                const p = pts[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.red ? `rgba(181,17,26,${p.alpha})` : `rgba(30,41,59,${p.alpha * 0.55})`;
                ctx.fill();
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            }
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);
    return (
        <canvas ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }} />
    );
};

/* ─────────────────────────────────────────────
   SERVICE CARD — touch-aware active state
───────────────────────────────────────────── */
const ServiceCard = ({ icon: Icon, title, description, badge, highlights, delay, gradient }) => {
    const [active, setActive] = useState(false);

    // Toggle on tap for mobile; hover handles desktop via CSS
    const handleTouch = () => setActive(prev => !prev);

    return (
        <div
            className={`service-card${active ? ' is-active' : ''}`}
            onTouchStart={handleTouch}
            style={{ animationDelay: delay }}
        >
            {/* Hover / active fill */}
            <div className="card-fill" style={{ background: gradient }} />

            {/* Spinning ring decoration */}
            <div className="card-ring" />
            <div className="card-ring-inner" />

            {/* Icon */}
            <div className="card-icon-wrap">
                <Icon className="card-icon" size={28} strokeWidth={1.8} />
            </div>

            {/* Content */}
            <h4 className="card-title">{title}</h4>

            <p className="card-desc" dangerouslySetInnerHTML={{ __html: description }} />

            {/* Highlights */}
            {highlights && (
                <ul className="card-highlights">
                    {highlights.map((h, i) => (
                        <li key={i} className="card-highlight-item">
                            <CheckCircle2 size={14} className="check-icon" />
                            {h}
                        </li>
                    ))}
                </ul>
            )}

            {/* Badge */}
            {badge && <div className="card-badge">{badge}</div>}

            {/* Corner dot */}
            <div className="card-corner-dot" />
        </div>
    );
};

/* ─────────────────────────────────────────────
   MAIN SERVICES SECTION
───────────────────────────────────────────── */
const Services = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

                /* ── Section ── */
                #services {
                    position: relative;
                    padding: 7rem 0 8rem;
                    background: #f8f6f3;
                    overflow: hidden;
                    font-family: 'DM Sans', sans-serif;
                }

                /* ── Grid bg ── */
                .svc-grid-bg {
                    position: absolute; inset: 0; z-index: 0;
                    background-image:
                        linear-gradient(rgba(30,41,59,0.052) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(30,41,59,0.052) 1px, transparent 1px);
                    background-size: 48px 48px;
                    pointer-events: none;
                }

                /* ── Noise ── */
                .svc-noise {
                    position: absolute; inset: 0; z-index: 2; pointer-events: none;
                    opacity: 0.022;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
                    background-size: 180px 180px;
                }

                /* ── Floating decorations ── */
                @keyframes svc-float-1 {
                    0%,100% { transform: translateY(0) rotate(0deg); }
                    50%     { transform: translateY(-20px) rotate(8deg); }
                }
                @keyframes svc-float-2 {
                    0%,100% { transform: translateY(0) rotate(0deg); }
                    50%     { transform: translateY(-14px) rotate(-6deg); }
                }
                @keyframes svc-spin    { to { transform: rotate(360deg); } }
                @keyframes svc-spin-r  { to { transform: rotate(-360deg); } }
                @keyframes svc-pulse   {
                    0%,100% { box-shadow: 0 0 0 0 rgba(181,17,26,0.20); }
                    50%     { box-shadow: 0 0 0 4px #017dc5; }
                }
                @keyframes svc-draw {
                    from { stroke-dashoffset: 300; opacity: 0; }
                    to   { stroke-dashoffset: 0;   opacity: 1; }
                }

                .svc-ring-tl {
                    position: absolute; top: 5%; left: 3%; z-index: 3;
                    width: 160px; height: 160px; border-radius: 50%;
                    border: 1.5px solid #017dc5;
                    animation: svc-spin 30s linear infinite;
                    pointer-events: none;
                }
                .svc-ring-tl::before {
                    content:''; position:absolute; inset:18px; border-radius:50%;
                    border: 1px dashed #017dc5;
                    animation: svc-spin-r 18s linear infinite;
                }
                .svc-ring-tl::after {
                    content:''; position:absolute; top:50%; left:50%;
                    width:8px; height:8px; border-radius:50%;
                    background:#017dc5; opacity:0.4;
                    transform: translateY(-76px) translateX(-4px);
                }

                .svc-diamond-br {
                    position: absolute; bottom: 10%; right: 4%; z-index: 3;
                    width: 64px; height: 64px;
                    border: 2px solid rgba(30,41,59,0.12);
                    border-radius: 10px;
                    transform: rotate(45deg);
                    animation: svc-float-1 7s ease-in-out infinite;
                    pointer-events: none;
                }
                .svc-tri-bl {
                    position: absolute; bottom: 20%; left: 5%; z-index: 3;
                    animation: svc-float-2 5.5s ease-in-out infinite;
                    pointer-events: none; opacity: 0.20;
                }
                .svc-plus-tr {
                    position: absolute; top: 18%; right: 8%; z-index: 3;
                    animation: svc-float-1 6s ease-in-out 1s infinite;
                    pointer-events: none; opacity: 0.18;
                }
                .svc-dots-mid {
                    position: absolute; top: 55%; left: 2%; z-index: 3;
                    animation: svc-float-2 8s ease-in-out 0.5s infinite;
                    pointer-events: none; opacity: 0.17;
                }

                /* ── Section header ── */
                .svc-header { position: relative; z-index: 5; text-align: center; margin-bottom: 5rem; }
                .svc-eyebrow {
                    display: inline-flex; align-items: center; gap: 8px;
                    font-family: 'DM Sans', sans-serif; font-size: 0.72rem;
                    font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
                    color: #017dc5;
                    background: rgba(181,17,26,0.07);
                    border: 1px solid rgba(181,17,26,0.16);
                    padding: 6px 14px; border-radius: 100px;
                    margin-bottom: 1.4rem;
                }
                .svc-eyebrow-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: #b5111a; box-shadow: 0 0 0 3px rgba(181,17,26,0.2);
                    animation: svc-pulse 2s ease-in-out infinite;
                }
                .svc-title {
                    font-family: 'Syne', sans-serif; font-weight: 900;
                    font-size: clamp(2rem, 4.5vw, 3.4rem);
                    line-height: 1.08; letter-spacing: -0.03em;
                    color: #1e293b; margin-bottom: 1.2rem;
                }
                .svc-title-accent {
                    background: linear-gradient(135deg,#b5111a 0%,#e63946 50%,#b5111a 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text; -webkit-text-fill-color:#017dc5;
                    background-clip: text;
                    animation: shimmer-svc 4s linear infinite;
                }
                @keyframes shimmer-svc {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .svc-divider {
                    width: 48px; height: 3px; border-radius: 8px;
                    background: linear-gradient(90deg,#b5111a,#e63946);
                    margin: 0 auto 1.4rem;
                }
                .svc-subtitle {
                    font-family: 'DM Sans', sans-serif; font-weight: 400;
                    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
                    color: #475569; line-height: 1.75; max-width: 520px; margin: 0 auto;
                }

                /* ── Cards grid ── */
                .svc-grid {
                    position: relative; z-index: 5;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    max-width: 920px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* ── Individual card ── */
                @keyframes card-reveal {
                    from { opacity: 0; transform: translateY(40px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes card-ring-spin { to { transform: rotate(360deg); } }
                @keyframes card-ring-spin-r { to { transform: rotate(-360deg); } }

                .service-card {
                    position: relative;
                    border-radius: 28px;
                    overflow: hidden;
                    background: rgba(255,255,255,0.82);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.95);
                    box-shadow: 0 4px 24px rgba(30,41,59,0.08), 0 1px 4px rgba(181,17,26,0.04);
                    padding: 2.8rem 2.4rem 2.4rem;
                    display: flex; flex-direction: column; align-items: flex-start;
                    cursor: pointer;
                    transition: transform 0.4s cubic-bezier(.16,1,.3,1), box-shadow 0.4s ease;
                    animation: card-reveal 0.7s both;
                    /* Will-change for smooth GPU compositing */
                    will-change: transform;
                    -webkit-tap-highlight-color: transparent;
                    user-select: none;
                }

                /* Desktop hover */
                @media (hover: hover) {
                    .service-card:hover { transform: translateY(-8px) scale(1.012); box-shadow: 0 20px 60px rgba(30,41,59,0.14), 0 4px 16px rgba(181,17,26,0.10); }
                    .service-card:hover .card-fill { opacity: 1; }
                    .service-card:hover .card-icon-wrap { background: rgba(255,255,255,0.22); }
                    .service-card:hover .card-icon { color: #fff; }
                    .service-card:hover .card-title { color: #fff; }
                    .service-card:hover .card-desc { color: rgba(255,255,255,0.88); }
                    .service-card:hover .card-desc strong { color: #fff; }
                    .service-card:hover .card-badge { background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.30); }
                    .service-card:hover .card-arrow { opacity: 1; transform: translateY(0); color: #fff; }
                    .service-card:hover .card-highlight-item { color: rgba(255,255,255,0.88); }
                    .service-card:hover .check-icon { color: rgba(255,255,255,0.7); }
                    .service-card:hover .card-ring { border-color: rgba(255,255,255,0.18); opacity: 1; }
                    .service-card:hover .card-ring-inner { border-color: rgba(255,255,255,0.12); opacity: 1; }
                    .service-card:hover .card-corner-dot { background: rgba(255,255,255,0.4); }
                }

                /* Mobile tap (is-active class toggled via JS) */
                .service-card.is-active { transform: translateY(-6px) scale(1.012); box-shadow: 0 20px 60px rgba(30,41,59,0.14), 0 4px 16px rgba(181,17,26,0.10); }
                .service-card.is-active .card-fill { opacity: 1; }
                .service-card.is-active .card-icon-wrap { background: rgba(255,255,255,0.22); }
                .service-card.is-active .card-icon { color: #fff; }
                .service-card.is-active .card-title { color: #fff; }
                .service-card.is-active .card-desc { color: rgba(255,255,255,0.88); }
                .service-card.is-active .card-desc strong { color: #fff; }
                .service-card.is-active .card-badge { background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.30); }
                .service-card.is-active .card-arrow { opacity: 1; transform: translateY(0); color: #fff; }
                .service-card.is-active .card-highlight-item { color: rgba(255,255,255,0.88); }
                .service-card.is-active .check-icon { color: rgba(255,255,255,0.7); }
                .service-card.is-active .card-ring { border-color: rgba(255,255,255,0.18); opacity: 1; }
                .service-card.is-active .card-ring-inner { border-color: rgba(255,255,255,0.12); opacity: 1; }
                .service-card.is-active .card-corner-dot { background: rgba(255,255,255,0.4); }

                /* Gradient fill layer */
                .card-fill {
                    position: absolute; inset: 0; z-index: 0;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                }

                /* Spinning rings inside card */
                .card-ring {
                    position: absolute; top: -60px; right: -60px; z-index: 0;
                    width: 180px; height: 180px; border-radius: 50%;
                    border: 1px solid rgba(181,17,26,0.08);
                    animation: card-ring-spin 25s linear infinite;
                    opacity: 0.6;
                    transition: border-color 0.4s, opacity 0.4s;
                    pointer-events: none;
                }
                .card-ring-inner {
                    position: absolute; top: -30px; right: -30px; z-index: 0;
                    width: 100px; height: 100px; border-radius: 50%;
                    border: 1px dashed #017dc5;
                    animation: card-ring-spin-r 15s linear infinite;
                    opacity: 0.5;
                    transition: border-color 0.4s, opacity 0.4s;
                    pointer-events: none;
                }

                /* Corner dot */
                .card-corner-dot {
                    position: absolute; bottom: 20px; right: 20px; z-index: 1;
                    width: 8px; height: 8px; border-radius: 50%;
                    background: rgba(181,17,26,0.25);
                    transition: background 0.4s;
                }

                /* Icon */
                .card-icon-wrap {
                    position: relative; z-index: 1;
                    width: 60px; height: 60px; border-radius: 16px;
                    background: rgba(181,17,26,0.08);
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 1.6rem;
                    transition: background 0.4s;
                    flex-shrink: 0;
                }
                .card-icon {
                    color: #017dc5;
                    transition: color 0.4s;
                }

                /* Text */
                .card-title {
                    position: relative; z-index: 1;
                    font-family: 'DM Sans', sans-serif; font-weight: 800;
                    font-size: 1.55rem; letter-spacing: -0.02em;
                    color: #1e293b; margin-bottom: 0.9rem;
                    transition: color 0.4s;
                }
                .card-desc {
                    position: relative; z-index: 1;
                    font-family: 'DM Sans', sans-serif; font-weight: 400;
                    font-size: 0.97rem; line-height: 1.72; color: #475569;
                    margin-bottom: 1.4rem;
                    transition: color 0.4s;
                    flex-grow: 1;
                }
                /* card description */    
                .card-desc strong { color: #017dc5; font-weight: 600; transition: color 0.4s; }

                /* Highlight list */
                .card-highlights {
                    position: relative; z-index: 1;
                    list-style: none; padding: 0; margin: 0 0 1.4rem;
                    display: flex; flex-direction: column; gap: 0.55rem;
                }
                .card-highlight-item {
                    display: flex; align-items: center; gap: 8px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.88rem; font-weight: 500;
                    color: #475569;
                    transition: color 0.4s;
                }
                .check-icon { color: #017dc5; flex-shrink: 0; transition: color 0.4s; }

                /* Badge */
                .card-badge {
                    position: relative; z-index: 1;
                    display: inline-block;
                    padding: 6px 14px; border-radius: 100px;
                    background: rgba(181,17,26,0.07);
                    border: 1px solid rgba(181,17,26,0.16);
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.78rem; font-weight: 600;
                    color: #017dc5; letter-spacing: 0.02em;
                    margin-bottom: 1.6rem;
                    transition: all 0.4s;
                }

                /* Arrow CTA */
                .card-arrow {
                    position: relative; z-index: 1;
                    display: flex; align-items: center; gap: 6px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.85rem; font-weight: 600;
                    color: #017dc5;
                    opacity: 0;
                    transform: translateY(8px);
                    transition: opacity 0.35s, transform 0.35s, color 0.4s;
                    margin-top: auto;
                    pointer-events: none;
                }

                /* Mobile: always show arrow faintly */
                @media (max-width: 768px) {
                    .card-arrow { opacity: 0.5; transform: translateY(0); }
                    .service-card.is-active .card-arrow { opacity: 1; }
                }

                /* ── Bottom trust strip ── */
                .svc-trust {
                    position: relative; z-index: 5;
                    display: flex; align-items: center; justify-content: center;
                    flex-wrap: wrap; gap: 2rem;
                    margin-top: 4.5rem;
                    padding: 0 1.5rem;
                }
                .svc-trust-item {
                    display: flex; align-items: center; gap: 8px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.83rem; font-weight: 500; color: #64748b;
                }

                /* Responsive */
                @media (max-width: 640px) {
                    #services { padding: 5rem 0 6rem; }
                    .svc-grid { grid-template-columns: 1fr; padding: 0 1rem; }
                    .service-card { padding: 2.2rem 1.8rem 2rem; }
                    .svc-ring-tl { width: 100px; height: 100px; top: 2%; left: 1%; }
                    .svc-trust { gap: 1rem; }
                }
            `}</style>

            <section id="services">
                {/* ── Backgrounds ── */}
                <div className="svc-grid-bg" />
                <AuroraCanvas />
                <div className="svc-noise" />
                <ParticleCanvas />

                {/* ── Decorative shapes ── */}
                <div className="svc-ring-tl" />

                <div className="svc-diamond-br" />

                <div className="svc-tri-bl">
                    <svg width="50" height="50" viewBox="0 0 50 50">
                        <polygon points="25,3 48,47 2,47" fill="none" stroke="#017dc5" strokeWidth="2" />
                    </svg>
                </div>

                <div className="svc-plus-tr">
                    <svg width="32" height="32" viewBox="0 0 32 32">
                        <line x1="16" y1="2" x2="16" y2="30" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
                        <line x1="2" y1="16" x2="30" y2="16" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                </div>

                <div className="svc-dots-mid">
                    <svg width="64" height="64" viewBox="0 0 64 64">
                        {[0,22,44].flatMap(cx => [0,22,44].map(cy => (
                            <circle key={`${cx}-${cy}`} cx={cx+10} cy={cy+10} r="3" fill="#017dc5"/>
                        )))}
                    </svg>
                </div>

                {/* ── Animated arc line ── */}
                <svg style={{ position:'absolute', top:'8%', right:'10%', zIndex:3, width:160, height:160, pointerEvents:'none' }} viewBox="0 0 160 160" fill="none">
                    <path d="M 8 152 Q 80 8 152 80"
                        stroke="rgba(181,17,26,0.13)" strokeWidth="1.5"
                        strokeDasharray="300" strokeDashoffset="300"
                        style={{ animation: 'svc-draw 3s ease forwards 0.8s' }} />
                </svg>

                {/* ── Content ── */}
                <div style={{ position:'relative', zIndex:5, maxWidth:1200, margin:'0 auto', padding:'0 1.5rem' }}>

                    {/* Header */}
                    <div className="svc-header">
                        <div style={{ display:'flex', justifyContent:'center', marginBottom:'1.4rem' }}>
                            <span className="svc-eyebrow">
                                <span className="svc-eyebrow-dot" />
                                Our Expertise
                            </span>
                        </div>
                        <h2 className="svc-title">
                            The <span className="svc-title-accent">Core</span> Business
                        </h2>
                        <div className="svc-divider" />
                        <p className="svc-subtitle">
                            We deliver tailored solutions that drive profitability and sustainable growth
                            for both property owners and ambitious retail brands.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="svc-grid">
                        <ServiceCard
                            icon={Store}
                            title="Franchise Advisory"
                            description='Strategic guidance focused on <strong>wealth creation</strong> for developers and buyers. We navigate the full franchise lifecycle so you can grow with confidence.'
                            badge='"We own and operate franchises too"'
                            highlights={[
                                'Brand matching & due diligence',
                                'Revenue & ROI modelling',
                                'End-to-end deal structuring',
                            ]}
                            delay="0.1s"
                            gradient="linear-gradient(135deg, #b5111a 0%, #8b0d14 60%, #1e293b 100%)"
                        />
                        <ServiceCard
                            icon={Building2}
                            title="Corporate Leasing"
                            description='Scouting commercially viable spaces. We prioritize <strong>high visibility</strong> and <strong>architectural appeal</strong> to position your brand for maximum footfall and impact.'
                            highlights={[
                                'Site scoring & feasibility reports',
                                'Lease negotiation & structuring',
                                'High-traffic location sourcing',
                            ]}
                            delay="0.25s"
                            gradient="linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #b5111a 100%)"
                        />
                    </div>

                    {/* Trust strip */}
                    {/* <div className="svc-trust">
                        {[
                            ['50+', 'Brands Advised'],
                            ['320+', 'Locations Secured'],
                            ['12+', 'Years Experience'],
                            ['94%', 'Client Retention'],
                        ].map(([num, label]) => (
                            <div className="svc-trust-item" key={label}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="7" r="6.5" stroke="#b5111a" strokeOpacity="0.35"/>
                                    <path d="M4 7l2 2 4-4" stroke="#b5111a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <strong style={{ color:'#1e293b', fontFamily:"'Syne',sans-serif" }}>{num}</strong>
                                {label}
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>
        </>
    );
};

export default Services;
