'use client';

import { PrayerDashboard } from '@/components/prayer/PrayerDashboard';
import { useLanguage } from '@/context/LanguageContext';

export default function PrayerTimesPage() {
    const { t, isRTL } = useLanguage();

    return (
        <div className="space-y-6">
            <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
                <h1 className="text-3xl font-bold text-foreground">🕌 {t('prayer.title')}</h1>
                <p className="text-muted mt-2">{t('prayer.subtitle')}</p>
            </div>

            <PrayerDashboard />
        </div>
    );
}
