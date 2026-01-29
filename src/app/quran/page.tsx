'use client';

import { SurahList } from '@/components/quran/SurahList';
import { useLanguage } from '@/context/LanguageContext';

export default function QuranPage() {
    const { t, isRTL } = useLanguage();

    return (
        <div className="space-y-6">
            <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
                <h1 className="text-3xl font-bold text-foreground">📖 {t('quran.title')}</h1>
                <p className="text-muted mt-2">{t('quran.subtitle')}</p>
            </div>

            <SurahList />
        </div>
    );
}
