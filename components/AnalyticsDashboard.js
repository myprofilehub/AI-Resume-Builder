'use client';
import { Eye, TrendingUp, Award, UserCheck } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

export default function AnalyticsDashboard({ views = 0, atsScore = 0 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={Eye} label="Portfolio Views" value={views} color="bg-blue-500" />
            <StatCard icon={Award} label="ATS Score" value={`${atsScore}%`} color="bg-green-500" />
            <StatCard icon={UserCheck} label="Profile Completeness" value="High" color="bg-purple-500" />
            <StatCard icon={TrendingUp} label="Search Appearances" value="12" color="bg-orange-500" />
        </div>
    );
}
