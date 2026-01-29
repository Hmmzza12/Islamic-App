'use client';

import { useLanguage } from '@/context/LanguageContext';
import { MonthlyDashboard } from '@/components/monthly/MonthlyDashboard';

export default function MonthlyPage() {
    const { t, isRTL } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in relative z-10">
            <div className="text-center md:text-left md:flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-2">
                        {t('monthly.title')}
                    </h1>
                    <p className="text-muted">
                        {t('monthly.subtitle')}
                    </p>
                </div>
            </div>

            <MonthlyDashboard />
        </div>
    );
}
