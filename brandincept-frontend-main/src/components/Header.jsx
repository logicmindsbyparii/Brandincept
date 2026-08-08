import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const regionRef = useRef(null);

    // Scroll effect for header background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for active link highlighting
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const sections = ['home', 'about', 'services', 'portfolio', 'partners', 'contact'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // GSAP Animations for header entrance
    useEffect(() => {
        // Header entrance animation
        gsap.fromTo(headerRef.current,
            { 
                y: -100, 
                opacity: 0 
            },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1.2, 
                ease: "power3.out" 
            }
        );

        // Logo animation
        gsap.fromTo(logoRef.current,
            { 
                x: -50, 
                opacity: 0 
            },
            { 
                x: 0, 
                opacity: 1, 
                duration: 1, 
                delay: 0.3, 
                ease: "back.out(1.4)" 
            }
        );

        // Region text animation
        gsap.fromTo(regionRef.current,
            { 
                x: -30, 
                opacity: 0 
            },
            { 
                x: 0, 
                opacity: 1, 
                duration: 0.8, 
                delay: 0.5, 
                ease: "power2.out" 
            }
        );

        // Nav links staggered animation
        gsap.fromTo(navLinksRef.current,
            { 
                y: -30, 
                opacity: 0 
            },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.15, 
                delay: 0.6, 
                ease: "power2.out" 
            }
        );

        // Cleanup animations on unmount
        return () => {
            gsap.killTweensOf([headerRef.current, logoRef.current, regionRef.current, ...navLinksRef.current]);
        };
    }, []);

    // GSAP animation for header background on scroll
    useEffect(() => {
        if (isScrolled) {
            gsap.to(headerRef.current, {
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                padding: "0.75rem 0",
                duration: 0.4,
                ease: "power2.inOut"
            });
        } else {
            gsap.to(headerRef.current, {
                backgroundColor: "transparent",
                backdropFilter: "blur(0px)",
                boxShadow: "none",
                padding: "1.5rem 0",
                duration: 0.4,
                ease: "power2.inOut"
            });
        }
    }, [isScrolled]);

    // Mobile menu animation
    useEffect(() => {
        const mobileMenu = document.querySelector('.mobile-menu-container');
        
        if (mobileMenu) {
            if (isMobileMenuOpen) {
                gsap.fromTo(mobileMenu,
                    { 
                        height: 0, 
                        opacity: 0,
                        y: -20
                    },
                    { 
                        height: "auto", 
                        opacity: 1, 
                        y: 0,
                        duration: 0.5, 
                        ease: "power3.out",
                        display: "block"
                    }
                );
                
                // Animate mobile menu items
                gsap.fromTo(".mobile-nav-item",
                    { 
                        x: -30, 
                        opacity: 0 
                    },
                    { 
                        x: 0, 
                        opacity: 1, 
                        duration: 0.4, 
                        stagger: 0.1,
                        delay: 0.2,
                        ease: "power2.out"
                    }
                );
            } else {
                gsap.to(mobileMenu, {
                    height: 0,
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: "power3.in",
                    onComplete: () => {
                        mobileMenu.style.display = 'none';
                    }
                });
            }
        }
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About Us', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Brand Partners', href: '#partners' },
        { name: 'Contact Us', href: '#contact' },
    ];

    const handleNavClick = (e, href, index) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Close mobile menu
            setIsMobileMenuOpen(false);
            
            // Smooth scroll to section
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Update active section
            setActiveSection(targetId);
            
            // Animate clicked nav link
            if (navLinksRef.current[index] && window.innerWidth > 768) {
                gsap.to(navLinksRef.current[index], {
                    scale: 1.1,
                    color: "#017dc5",
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            }
        }
    };

    return (
        <header
            ref={headerRef}
            className="fixed w-full z-[1000] bg-transparent py-6"
            style={{ 
                transition: 'background-color 0.3s ease, padding 0.3s ease',
                willChange: 'transform, opacity, background-color'
            }}
        >
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo container */}
                    <div className="flex flex-col">
                        <a 
                            ref={logoRef}
                            href="#home" 
                            className="flex items-center group" 
                            onClick={(e) => handleNavClick(e, '#home', 0)}
                        >
                            {/* <img
                                src="/assests/bluelogo-removebg.png"
                                alt="Brand Incept"
                                className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => { 
                                    e.target.src = 'https://via.placeholder.com/150x50?text=Brand+Incept'; 
                                }}
                            /> */}

                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src="/assests/bluelogo-removebg.png" alt="Brand Incept Logo" className="h-12 w-auto" />
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

                        </a>
                        <span 
                            ref={regionRef}
                            className={`text-[5px] md:text-[9px] w-70 font-black tracking-[0.2em] uppercase mt-1 transition-colors duration-300 ${
                                isScrolled ? 'text-[#017dc5]' : 'text-gray-900'
                            }`}
                        >
                            {/* Corporate Leasing & Franchise Advisory */}
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.name}
                                ref={el => navLinksRef.current[index] = el}
                                href={link.href}
                                className={`text-sm font-bold tracking-wide transition-all duration-300 relative py-2 ${
                                    activeSection === link.href.substring(1)
                                        ? 'text-[#017dc5] font-extrabold'
                                        : 'text-[#017dc5]/80 hover:text-[#017dc5]'
                                }`}
                                onClick={(e) => handleNavClick(e, link.href, index)}
                            >
                                {link.name}
                                <span 
                                    className={`absolute bottom-0 left-0 h-0.5 bg-[#017dc5] transition-all duration-300 ${
                                        activeSection === link.href.substring(1) 
                                            ? 'w-full' 
                                            : 'w-0 group-hover:w-full'
                                    }`}
                                ></span>
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg bg-red-50 text-[#017dc5] transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#017dc5]/50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div 
                className="mobile-menu-container md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden hidden"
                style={{ 
                    display: isMobileMenuOpen ? 'block' : 'none',
                    willChange: 'transform, opacity, height'
                }}
            >
                <nav className="flex flex-col py-4 px-4">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`mobile-nav-item text-center text-[#017dc5] text-lg font-bold py-4 px-6 rounded-xl transition-all duration-300 ${
                                activeSection === link.href.substring(1)
                                    ? 'bg-red-50 shadow-md'
                                    : 'hover:bg-gray-50'
                            }`}
                            onClick={(e) => handleNavClick(e, link.href, index)}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
