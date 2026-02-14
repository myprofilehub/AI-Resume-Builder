'use client';
import { Eye, Award, UserCheck, Clock } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
    </div>
);

function computeCompleteness(data) {
    if (!data) return { pct: 0, label: 'Empty' };
    const checks = [
        !!data.personalInfo?.fullName,
        !!data.personalInfo?.email,
        !!data.personalInfo?.jobTitle,
        !!data.personalInfo?.phone,
        !!data.personalInfo?.summary,
        !!data.personalInfo?.photo,
        data.education?.length > 0,
        data.experience?.length > 0,
        data.projects?.length > 0,
        !!(typeof data.skills === 'string' ? data.skills.trim() : data.skills?.length),
    ];
    const filled = checks.filter(Boolean).length;
    const pct = Math.round((filled / checks.length) * 100);
    if (pct >= 90) return { pct, label: 'Excellent' };
    if (pct >= 70) return { pct, label: 'Good' };
    if (pct >= 40) return { pct, label: 'Fair' };
    return { pct, label: 'Low' };
}

function formatLastUpdated(dateStr) {
    if (!dateStr) return 'Never';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Never';
    const now = new Date();
    const diffMs = now - d;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AnalyticsDashboard({ views = 0, atsScore = 0, resumeData = null, lastUpdated = null }) {
    const completeness = computeCompleteness(resumeData);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={Eye} label="Portfolio Views" value={views} color="bg-blue-500" />
            <StatCard icon={Award} label="ATS Score" value={`${atsScore}%`} color="bg-green-500" />
            <StatCard icon={UserCheck} label="Profile Completeness" value={`${completeness.pct}%`} sub={completeness.label} color="bg-purple-500" />
            <StatCard icon={Clock} label="Last Updated" value={formatLastUpdated(lastUpdated)} color="bg-orange-500" />
        </div>
    );
}
