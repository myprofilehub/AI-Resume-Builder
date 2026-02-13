'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LayoutTemplate, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-heading bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        <LayoutTemplate className="text-blue-600" />
                        ResumeAI
                    </Link>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="hidden md:block text-gray-600">
                                    Welcome, <span className="font-semibold text-gray-900">{user.name}</span>
                                </span>
                                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden md:inline">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
