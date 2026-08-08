import React from 'react';
import { Activity, ArrowUpRight, ArrowDownRight, Users, CheckCircle, Clock } from 'lucide-react';

const Dashboard = () => {
    const metrics = [
        {
            title: "Net Promoter Score",
            value: "78",
            trend: "+4.2%",
            isPositive: true,
            icon: <Users className="w-5 h-5 text-blue-500" />,
            color: "blue"
        },
        {
            title: "Order Loss",
            value: "1.2%",
            trend: "-0.5%",
            isPositive: true,
            icon: <Activity className="w-5 h-5 text-green-500" />,
            color: "green"
        },
        {
            title: "Defect Rate",
            value: "0.8%",
            trend: "+0.1%",
            isPositive: false,
            icon: <CheckCircle className="w-5 h-5 text-red-500" />,
            color: "red"
        }
    ];

    const shifts = [
        { name: "Shift 1", time: "06:00 - 14:00", active: "24", absent: "1", status: "On Track" },
        { name: "Shift 2", time: "14:00 - 22:00", active: "22", absent: "2", status: "Monitor" },
        { name: "Shift 3", time: "22:00 - 06:00", active: "18", absent: "0", status: "Excellent" }
    ];

    return (
        <section className="py-24 bg-brand-navy">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">Operational Transparency</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Store Performance Board</h3>
                    <p className="text-lg text-blue-100/70 font-light leading-relaxed">
                        Real-time insights and transparent reporting mechanisms to ensure peak operational efficiency across all managed retail assets.
                    </p>
                </div>

                {/* Dashboard UI Component */}
                <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl">

                    {/* Top Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {metrics.map((metric, index) => (
                            <div key={index} className="bg-white/10 rounded-3xl p-6 border border-white/5 hover:bg-white/15 transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-xl bg-${metric.color}-500/20`}>
                                        {metric.icon}
                                    </div>
                                    <span className={`flex items-center text-sm font-semibold px-3 py-1 rounded-full ${metric.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {metric.isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                                        {metric.trend}
                                    </span>
                                </div>
                                <h4 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">{metric.title}</h4>
                                <div className="text-4xl font-bold text-white">{metric.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Attendance Section */}
                    <div className="bg-white/10 rounded-3xl p-8 border border-white/5">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-2 flex items-center">
                                    <Clock className="mr-3 text-blue-400" size={24} />
                                    Live Attendance Board
                                </h4>
                                <p className="text-white/60 font-light">Real-time shift tracking across all operational hubs.</p>
                            </div>
                            <div className="hidden md:flex items-center space-x-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                                <span>Live Data</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {shifts.map((shift, index) => (
                                <div key={index} className="group flex flex-col justify-between h-full bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors border border-white/5">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h5 className="text-white font-bold text-lg">{shift.name}</h5>
                                            <span className="text-white/50 text-sm font-mono">{shift.time}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${shift.status === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                                                shift.status === 'On Track' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-orange-500/20 text-orange-400'
                                            }`}>
                                            {shift.status}
                                        </span>
                                    </div>

                                    <div className="flex items-end justify-between mt-auto">
                                        <div>
                                            <span className="text-xs text-white/50 block mb-1 uppercase tracking-wider font-semibold">Active</span>
                                            <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{shift.active}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-white/50 block mb-1 uppercase tracking-wider font-semibold">Absent</span>
                                            <span className="text-lg font-medium text-white/70">{shift.absent}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
