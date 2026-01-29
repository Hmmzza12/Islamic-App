'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { HADITHS, HADITH_CATEGORIES, Hadith } from '@/data/hadith';
import { HadithCard } from '@/components/hadith/HadithCard';

export default function HadithPage() {
    const { t, isRTL } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredHadiths = selectedCategory === 'All'
        ? HADITHS
        : HADITHS.filter(h => h.category === selectedCategory);

    // Random Daily Hadith (Simple implementation based on day of year)
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const dailyHadith = HADITHS[dayOfYear % HADITHS.length];

    return (
        <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in relative z-10">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {t('hadith.title')}
                </h1>
                <p className="text-muted max-w-2xl mx-auto">
                    {t('hadith.subtitle')}
                </p>
            </div>

            {/* Featured / Daily Hadith */}
            <section>
                <div className="flex items-center gap-2 mb-4 justify-center">
                    <span className="text-2xl">✨</span>
                    <h2 className="text-xl font-bold">{t('hadith.daily')}</h2>
                </div>
                <div className="max-w-3xl mx-auto transform hover:scale-[1.01] transition-transform">
                    <HadithCard hadith={dailyHadith} />
                </div>
            </section>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {HADITH_CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2 rounded-full transition-all duration-300 ${selectedCategory === category
                            ? 'bg-primary text-white shadow-lg scale-105'
                            : 'bg-card-bg border border-card-border text-muted hover:border-primary hover:text-primary'
                            }`}
                    >
                        {t(`category.${category.toLowerCase()}`)}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHadiths.map((hadith) => (
                    <HadithCard key={hadith.id} hadith={hadith} />
                ))}
            </div>

            {filteredHadiths.length === 0 && (
                <div className="text-center py-20 text-muted">
                    No hadiths found in this category.
                </div>
            )}
        </div>
    );
}
