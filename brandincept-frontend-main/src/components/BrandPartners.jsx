import React, { useState, useEffect } from 'react';
import API_URL from '../config';

const BrandPartners = () => {
    const [logos, setLogos] = useState([
        { name: "Croma", src: "/assests/croma.png", desc: "A TATA Enterprise" },
        { name: "HomeLane", src: "/assests/homelane-removebg.png", desc: "Interior" },
        { name: "Zepto", src: "/assests/zeptofood-removebg.png", desc: "Q-Commerce" },
        { name: "Mamaearth", src: "/assests/mamaearthbaby-removebg.png", desc: "Beauty" },
        { name: "Tim Hortons", src: "/assests/timhortoncoffee-removebg.png", desc: "Coffee" },
        { name: "Chinese Wok", src: "/assests/chinesewok.png", desc: "Food" },
        { name: "Funky Monkeys", src: "/assests/funkymonkeys-removebg.png", desc: "Entertainment" },
        { name: "Intune", src: "/assests/intune-removebg.png", desc: "Apparel" },
        { name: "Changa Chai", src: "/assests/changachai-removebg.png", desc: "International Cafe" },
        { name: "Coffee Culture", src: "/assests/coffeeculture-removebg.png", desc: "International Cafe" },
        { name: "Mahesh Pavbhaji", src: "/assests/maheshpavbhaji-removebg.png", desc: "International Cafe" },
        { name: "Purple Spa", src: "/assests/purplespa-removebg.png", desc: "Wellness" },
        { name: "McDonald's", src: "/assests/Macd-removebg.png", desc: "International Cafe" },
        { name: "Connplex Cinema", src: "/assests/connplex-logo.png", desc: "Entertainment" }
    ]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async (retries = 10) => {
            try {
                const response = await fetch(`${API_URL}/api/partners`)
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setLogos(result.data);
                        setIsLoading(false);
                        return;
                    }
                }
            } catch (error) {
                console.error('Failed to fetch partners:', error);
            }
            
            if (retries > 0) {
                setTimeout(() => fetchPartners(retries - 1), 3000);
            } else {
                setIsLoading(false);
            }
        };
        fetchPartners();
    }, []);

    return (
        <section id="partners" className="py-24 bg-gray-50/50 overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-8 text-center mb-16 relative z-10">
                <h2 className="text-sm font-bold tracking-widest text-[#017dc5] uppercase mb-3">Trust Wall</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold text-[#017dc5] mb-6">Brand Associations</h3>
                <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                    We are proud to collaborate with some of the most prominent brands across retail, F&B, quick commerce, and lifestyle sectors.
                </p>
            </div>

            <div className="relative flex flex-col space-y-8 overflow-x-hidden">
                {isLoading ? (
                    <div className="w-full text-center text-gray-400 py-10">Loading Partners...</div>
                ) : logos.length > 0 ? (
                    <>
                        {/* First row - left to right */}
                        <div className="marquee-wrapper group">
                            <div className="marquee marquee-left">
                                <div className="marquee-content">
                                    {/* Duplicate logos enough times to fill the screen seamlessly */}
                                    {[...logos, ...logos, ...logos].map((logo, idx) => (
                                        <div key={`left-${idx}`} className="marquee-item">
                                            <div className="h-24 w-40 md:h-32 md:w-56 bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-4 md:p-6 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                <img
                                                    src={logo.src}
                                                    alt={`${logo.name} logo`}
                                                    title={logo.desc}
                                                    className="max-h-full max-w-full w-auto h-auto object-contain"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Second row - right to left */}
                        <div className="marquee-wrapper group">
                            <div className="marquee marquee-right">
                                <div className="marquee-content">
                                    {[...logos, ...logos, ...logos].map((logo, idx) => (
                                        <div key={`right-${idx}`} className="marquee-item">
                                            <div className="h-24 w-40 md:h-32 md:w-56 bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-4 md:p-6 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                <img
                                                    src={logo.src}
                                                    alt={`${logo.name} logo`}
                                                    title={logo.desc}
                                                    className="max-h-full max-w-full w-auto h-auto object-contain"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full text-center text-gray-400 py-10">No partners found.</div>
                )}
            </div>

            <style>{`
                .marquee-wrapper {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .marquee {
                    display: flex;
                    overflow: hidden;
                    user-select: none;
                }

                .marquee-left .marquee-content {
                    display: flex;
                    animation: scroll-left 60s linear infinite;
                }

                .marquee-right .marquee-content {
                    display: flex;
                    animation: scroll-right 60s linear infinite;
                }

                .marquee-wrapper:hover .marquee-content {
                    animation-play-state: paused;
                }

                .marquee-item {
                    flex-shrink: 0;
                    margin: 0 12px;
                }

                @media (min-width: 768px) {
                    .marquee-item {
                        margin: 0 24px;
                    }
                }

                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                @keyframes scroll-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

export default BrandPartners;
