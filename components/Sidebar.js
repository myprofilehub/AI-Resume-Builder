'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutTemplate, User, Settings, LogOut, Code, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const links = [
        { href: '/dashboard', label: 'Resume Builder', icon: FileText },
        { href: '/portfolio', label: 'My Portfolio', icon: LayoutTemplate, target: '_blank' },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 fixed h-full bg-white border-r border-gray-200 z-40 flex flex-col justify-between">
            <div>
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        <LayoutTemplate className="text-blue-600" size={24} />
                        ResumeAI
                    </Link>
                </div>

                <nav className="p-4 space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                target={link.target}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon size={20} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
