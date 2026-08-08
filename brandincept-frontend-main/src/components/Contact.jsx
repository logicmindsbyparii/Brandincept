import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
// ── Import the real photos ──
import ruchitImg  from '/assests/ruchitmehta.jpeg';
import pinkeshImg from '/assests/pinkeshparekh.jpeg';
import API_URL from '../config';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: 'franchise',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const teamMembers = [
        {
            name: 'Ruchit Mehta',
            location: 'Surat',
            designation: 'Associate Partner',
            email: 'ruchit.mehta@brandincept.com',
            expertise: 'New Site Acquisition',
            photo: ruchitImg,
        },
        {
            name: 'Pinkesh Parekh',
            location: 'Ahmedabad',
            designation: 'Associate Partner',
            email: 'pinkesh.parekh@brandincept.com',
            expertise: 'Site Selection and Negotiation',
            photo: pinkeshImg,
        }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending inquiry...' });
        try {
            const response = await fetch(`${API_URL}/api/inquiries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you! Your inquiry has been received. We will contact you shortly.' });
                setFormData({ name: '', email: '', phone: '', interest: 'franchise', message: '' });
            } else {
                setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus({ type: 'error', message: 'Could not connect to the server. Please check your connection.' });
        }
    };

    return (
        <section id="contact" className="py-24 bg-gray-50 relative">
            <div className="container mx-auto px-4 md:px-8 relative z-10">

                {/* Team Members Section */}
                <div className="max-w-6xl mx-auto mb-12">
                    <h3 className="text-2xl font-bold text-[#017dc5] mb-8 text-center md:text-left">Our Associate Partners -</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start gap-4">

                                    {/* ── Real photo replaces the User icon ── */}
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        // className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0 border-2 border-[#017dc5]/20 shadow-md"
                                        className="relative rounded-2xl shadow-2xl w-30 object-cover transition duration-500 transform group-hover:scale-[1.02]"
                                    />

                                    <div className="flex-1">
                                        <h4 className="text-2xl font-bold text-gray-800">{member.name}</h4>
                                        <p className="text-l text-[#017dc5] font-semibold mb-2">{member.designation}</p>
                                        <div className="space-y-1 text-l text-gray-600">
                                            <p className="flex items-center">
                                                <MapPin size={14} className="mr-2 text-gray-400" />
                                                {member.location}
                                            </p>
                                            <p className="flex items-center">
                                                <Mail size={14} className="mr-2 text-gray-400" />
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="hover:text-[#017dc5] transition-colors"
                                                >
                                                    {member.email}
                                                </a>
                                            </p>
                                            <p className="mt-2 text-gray-700">
                                                <span className="font-medium">Expertise:</span> {member.expertise}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Contact Card */}
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-100">

                    {/* Contact Information Side */}
                    <div className="lg:w-2/5 bg-[#017dc5] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50 z-0"></div>
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl opacity-30 z-0"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-4">Let's Talk Business</h2>
                            <p className="text-blue-100/80 font-light mb-12">
                                Whether you're looking for prime retail space or seeking to optimize
                                your commercial assets, our experts are ready to assist.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="bg-white/10 p-3 rounded-lg mr-4">
                                        <Phone className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs text-blue-200/80 mb-1 uppercase tracking-wider font-semibold">Call Direct</h4>
                                        {/* <p className="text-xl font-medium tracking-wide">+91 76229 34444</p> */}
                                        <a
                                          href="tel:+917622934444"
                                          className="text-xl font-medium tracking-wide hover:text-blue-300 transition-colors"
                                        >
                                          +91 76229 34444
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-white/10 p-3 rounded-lg mr-4">
                                        <Mail className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs text-blue-200/80 mb-1 uppercase tracking-wider font-semibold">Email Us</h4>
                                        <a href="mailto:jigar@brandincept.com" className="text-lg font-medium hover:text-blue-300 transition-colors">
                                            jigar@brandincept.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-white/10 p-3 rounded-lg mr-4">
                                        <MapPin className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs text-blue-200/80 mb-1 uppercase tracking-wider font-semibold">Regional Offices</h4>
                                        <p className="text-lg font-medium">Surat & Ahmedabad</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Side */}
                    <div className="lg:w-3/5 p-10 md:p-14">
                        <h3 className="text-2xl font-bold text-[#017dc5] mb-8">Send an Inquiry</h3>

                        {status.message && (
                            <div className={`mb-6 p-4 rounded-lg font-medium ${
                                status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                                status.type === 'error'   ? 'bg-red-50 text-red-700 border border-red-200' :
                                                            'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text" id="name" name="name"
                                        value={formData.name} onChange={handleChange} required
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel" id="phone" name="phone"
                                        value={formData.phone} onChange={handleChange} required
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email" id="email" name="email"
                                        value={formData.email} onChange={handleChange} required
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50"
                                        placeholder="yourmail@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">Area of Interest</label>
                                    <select
                                        id="interest" name="interest"
                                        value={formData.interest} onChange={handleChange}
                                        className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50 appearance-none"
                                    >
                                        <option value="franchise">Franchise Advisory</option>
                                        <option value="leasing">Corporate Leasing</option>
                                        <option value="businessconsulting">Business Consulting</option>
                                        <option value="other">Other Inquiry</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                                <textarea
                                    id="message" name="message" rows="4"
                                    value={formData.message} onChange={handleChange} required
                                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50 resize-none"
                                    placeholder="Tell us about your requirements..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="w-full flex items-center justify-center space-x-2 bg-[#017dc5] hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
                            >
                                <span>{status.type === 'loading' ? 'Sending...' : 'Send Message'}</span>
                                {!status.type && <Send size={20} />}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
