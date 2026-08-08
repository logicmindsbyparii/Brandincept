import React, { useState, useEffect } from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import API_URL from '../config';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4); // Show first 4 initially

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/api/projects`);
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setProjects(result.data);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleSeeMore = () => {
        // Show all projects when button clicked
        setVisibleCount(projects.length);
    };

    return (
        <section id="portfolio" className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <h2 className="text-sm font-bold tracking-widest text-[#017dc5] uppercase mb-3">Proven Results</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-[#017dc5] mb-6">Successfully Transacted</h3>
                        <p className="text-lg text-gray-600 font-light leading-relaxed">
                            Explore our portfolio of successful brand placements and high-value corporate leasing executions across key strategic locations.
                        </p>
                    </div>
                    <a href="#contact" className="hidden md:flex items-center space-x-2 text-[#017dc5] font-semibold hover:text-blue-600 transition-colors mt-6 md:mt-0 pb-2 border-b-2 border-transparent hover:border-blue-600">
                        <span>Start Your Project</span>
                        <ArrowUpRight size={20} />
                    </a>
                </div>

                {isLoading ? (
                    <div className="text-center py-20 text-gray-400">Loading projects...</div>
                ) : projects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                            {projects.slice(0, visibleCount).map((project, index) => (
                                <div
                                    key={index}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                >
                                    <div className="relative h-64 overflow-hidden bg-gray-50 flex items-center justify-center">
                                        <img
                                            src={project.image}
                                            alt={project.brand}
                                            className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                        />
                                        {project.highlight && (
                                            <div className="absolute top-6 right-6 z-20">
                                                <span className="bg-white/95 backdrop-blur-sm text-[#017dc5] text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                                    {project.highlight}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8">
                                        <h4 className="text-2xl font-bold text-[#017dc5] mb-4 flex items-center justify-between">
                                            <span>{project.brand}</span>
                                            <span className="text-black text-lg font-medium">{project.tags[0]}</span>
                                        </h4>

                                        <p className="text-gray-600 font-light mb-8 line-clamp-2 h-12">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-4 py-1.5 bg-gray-50 text-brand-slate text-sm font-medium rounded-full border border-gray-100 flex items-center"
                                                >
                                                    {tag === "Ahmedabad" || tag === "Surat" ? (
                                                        <MapPin size={14} className="mr-1.5 text-blue-500" />
                                                    ) : null}
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* See More Button - visible only if there are more projects to show */}
                        {visibleCount < projects.length && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={handleSeeMore}
                                    className="px-8 py-3 bg-[#017dc5] text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg font-semibold"
                                >
                                    See More
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 text-gray-400">No projects found.</div>
                )}

                {/* Mobile View All Button */}
                <div className="mt-12 text-center md:hidden">
                    <a href="#contact" className="inline-flex items-center space-x-2 text-brand-navy font-semibold hover:text-blue-600 transition-colors">
                        <span>Start Your Project</span>
                        <ArrowUpRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
