'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchAllSurahs, type Surah } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

export function SurahList() {
    const { t, isRTL } = useLanguage();
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function loadSurahs() {
            try {
                const response = await fetchAllSurahs();
                setSurahs(response.chapters);
            } catch (err) {
                setError('Failed to load Surahs. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadSurahs();
    }, []);

    const filteredSurahs = surahs.filter(
        (surah) =>
            surah.name_simple.toLowerCase().includes(searchQuery.toLowerCase()) ||
            surah.name_arabic.includes(searchQuery) ||
            surah.translated_name.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-muted">{t('quran.loading')}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-4 text-red-700 dark:text-red-300">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder={t('quran.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border border-card-border bg-card-bg focus:outline-none focus:ring-2 focus:ring-primary ${isRTL ? 'pr-12 text-right' : 'pl-12'}`}
                />
                <span className={`absolute top-1/2 -translate-y-1/2 text-muted ${isRTL ? 'right-4' : 'left-4'}`}>🔍</span>
            </div>

            {/* Surah Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSurahs.map((surah, index) => (
                    <Link
                        key={surah.id}
                        href={`/quran/${surah.id}`}
                        className="bg-card-bg border border-card-border rounded-xl p-4 hover:shadow-lg hover:border-primary transition-all duration-300 group"
                        style={{ animationDelay: `${index * 30}ms` }}
                    >
                        <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {/* Surah Number */}
                            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                {surah.id}
                            </div>

                            {/* Surah Info */}
                            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <h3 className="font-semibold text-foreground truncate">
                                        {surah.name_simple}
                                    </h3>
                                    <span className="arabic-text text-xl text-primary">
                                        {surah.name_arabic}
                                    </span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm text-muted mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <span>{surah.translated_name.name}</span>
                                    <span>•</span>
                                    <span>{surah.verses_count} {t('quran.verses')}</span>
                                    <span>•</span>
                                    <span className="capitalize">{surah.revelation_place}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredSurahs.length === 0 && (
                <p className="text-center text-muted py-10">{t('quran.noResults')}</p>
            )}
        </div>
    );
}
