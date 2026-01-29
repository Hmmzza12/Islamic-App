'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ADHKAR, ADHKAR_CATEGORIES } from '@/data/adhkar';
import { AdhkarCard } from '@/components/adhkar/AdhkarCard';

export default function AdhkarPage() {
    const { t, isRTL } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredAdhkar = selectedCategory === 'All'
        ? ADHKAR
        : ADHKAR.filter(d => d.category === selectedCategory);

    return (
        <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in relative z-10">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {t('adhkar.title')}
                </h1>
                <p className="text-muted max-w-2xl mx-auto">
                    {t('adhkar.subtitle')}
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-card-bg border border-card-border p-2 rounded-2xl max-w-4xl mx-auto shadow-sm">
                {ADHKAR_CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 min-w-[100px] ${selectedCategory === category
                            ? 'bg-primary text-white shadow'
                            : 'text-muted hover:text-foreground hover:bg-primary/5'
                            }`}
                    >
                        {t(`category.${category.toLowerCase()}`)}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAdhkar.map((dhikr) => (
                    <AdhkarCard key={dhikr.id} dhikr={dhikr} />
                ))}
            </div>

            {filteredAdhkar.length === 0 && (
                <div className="text-center py-20 text-muted">
                    Section under construction. More Adhkar coming soon.
                </div>
            )}
        </div>
    );
}
