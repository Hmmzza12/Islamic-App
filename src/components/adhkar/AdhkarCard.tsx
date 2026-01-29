'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Dhikr } from '@/data/adhkar';

interface AdhkarCardProps {
    dhikr: Dhikr;
}

export function AdhkarCard({ dhikr }: AdhkarCardProps) {
    const { t } = useLanguage();
    const [count, setCount] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        if (count >= dhikr.count) {
            setIsCompleted(true);
        } else {
            setIsCompleted(false);
        }
    }, [count, dhikr.count]);

    const handleTap = () => {
        if (count < dhikr.count) {
            setCount(prev => prev + 1);
        } else {
            // Optional: Reset or allow over-counting? Let's loop for convenience
            setCount(0);
            setIsCompleted(false);
        }
    };

    const progress = Math.min((count / dhikr.count) * 100, 100);

    return (
        <button
            onClick={handleTap}
            className={`relative w-full text-left bg-card-bg border rounded-2xl p-6 transition-all duration-300 group overflow-hidden ${isCompleted
                ? 'border-primary/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                : 'border-card-border hover:border-primary/30'
                }`}
        >
            {/* Progress Background */}
            <div
                className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
            />

            <div className="flex justify-between items-start mb-6">
                {/* Category Badge */}
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                    {t(`category.${dhikr.category.toLowerCase()}`)}
                </span>

                {/* Counter Badge */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 text-lg font-bold transition-all duration-300 ${isCompleted
                    ? 'bg-primary text-white border-primary scale-110'
                    : 'bg-card-bg border-card-border text-muted group-hover:border-primary/50'
                    }`}>
                    {isCompleted ? '✓' : `${count}/${dhikr.count}`}
                </div>
            </div>

            {/* Main Text */}
            <p className={`arabic-text text-2xl md:text-3xl leading-loose mb-4 transition-colors ${isCompleted ? 'text-primary' : 'text-foreground'
                }`}>
                {dhikr.arabic}
            </p>

            {/* Footer Info */}
            {(dhikr.reference || dhikr.reward) && (
                <div className="pt-4 border-t border-card-border/50 text-xs text-muted flex flex-col gap-1">
                    {dhikr.reference && <span>📚 {dhikr.reference}</span>}
                    {dhikr.reward && <span className="text-secondary">✨ {dhikr.reward}</span>}
                </div>
            )}

            {/* Tap Instruction Overlay (Desktop hover) */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-sm font-medium bg-card-bg px-3 py-1 rounded-full shadow-sm text-muted">
                    {isCompleted ? t('adhkar.reset') : t('adhkar.tap')}
                </span>
            </div>
        </button>
    );
}
