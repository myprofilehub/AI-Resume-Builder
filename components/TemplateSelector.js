'use client';
import { Layout } from 'lucide-react';

export default function TemplateSelector({ currentTemplate, onSelect }) {
    const templates = [
        { id: 'modern', name: 'Modern', color: 'bg-blue-500' },
        { id: 'professional', name: 'Professional', color: 'bg-gray-800' },
        { id: 'minimal', name: 'Minimal', color: 'bg-white border border-gray-300' }
    ];

    return (
        <div className="flex items-center gap-3 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-100 w-fit">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-xs font-semibold uppercase text-gray-500 tracking-wider">
                <Layout size={14} />
                Layout
            </div>
            <div className="flex gap-2">
                {templates.map(t => (
                    <button
                        key={t.id}
                        onClick={() => onSelect(t.id)}
                        className={`w-8 h-8 rounded-full transition-all ring-2 ring-offset-2 flex items-center justify-center ${currentTemplate === t.id ? 'ring-blue-500 scale-110' : 'ring-transparent opacity-70 hover:opacity-100 hover:scale-105'
                            } ${t.color}`}
                        title={t.name}
                    >
                        {/* Color Preview Dot */}
                    </button>
                ))}
            </div>
        </div>
    );
}
