'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    fetchPrayerTimesByCoords,
    fetchPrayerTimesByCity,
    fetchQiblaDirection,
    CALCULATION_METHODS,
    type PrayerTimes
} from '@/lib/api';
import { useLocation } from '@/hooks/useLocation';
import { useLanguage } from '@/context/LanguageContext';

interface PrayerInfo {
    name: string;
    nameKey: string;
    time: string;
    icon: string;
}

export function PrayerDashboard() {
    const location = useLocation();
    const { t, isRTL } = useLanguage();
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
    const [hijriDate, setHijriDate] = useState<string>('');
    const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [method, setMethod] = useState(3);
    const [manualCity, setManualCity] = useState('');
    const [manualCountry, setManualCountry] = useState('');
    const [useManual, setUseManual] = useState(false);
    const [countdown, setCountdown] = useState<string>('');
    const [nextPrayerName, setNextPrayerName] = useState<string>('');
    const [currentPrayer, setCurrentPrayer] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                let response;

                if (useManual && manualCity && manualCountry) {
                    response = await fetchPrayerTimesByCity(manualCity, manualCountry, method);
                } else if (location.latitude && location.longitude) {
                    response = await fetchPrayerTimesByCoords(location.latitude, location.longitude, method);

                    const qiblaRes = await fetchQiblaDirection(location.latitude, location.longitude);
                    setQiblaDirection(qiblaRes.data.direction);
                } else if (!location.loading) {
                    setError(t('prayer.locationError'));
                    setLoading(false);
                    return;
                } else {
                    return;
                }

                setPrayerTimes(response.data.timings);
                setHijriDate(`${response.data.date.hijri.day} ${response.data.date.hijri.month.en} ${response.data.date.hijri.year}`);
            } catch (err) {
                setError('Failed to fetch prayer times. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (!location.loading || useManual) {
            fetchData();
        }
    }, [location.latitude, location.longitude, location.loading, method, useManual, manualCity, manualCountry, t]);

    const prayers: PrayerInfo[] = useMemo(() => {
        if (!prayerTimes) return [];
        return [
            { name: 'Fajr', nameKey: 'prayer.fajr', time: prayerTimes.Fajr, icon: '🌅' },
            { name: 'Sunrise', nameKey: 'prayer.sunrise', time: prayerTimes.Sunrise, icon: '☀️' },
            { name: 'Dhuhr', nameKey: 'prayer.dhuhr', time: prayerTimes.Dhuhr, icon: '🌞' },
            { name: 'Asr', nameKey: 'prayer.asr', time: prayerTimes.Asr, icon: '🌤️' },
            { name: 'Maghrib', nameKey: 'prayer.maghrib', time: prayerTimes.Maghrib, icon: '🌆' },
            { name: 'Isha', nameKey: 'prayer.isha', time: prayerTimes.Isha, icon: '🌙' },
        ];
    }, [prayerTimes]);

    useEffect(() => {
        if (!prayerTimes) return;

        const updateCountdown = () => {
            const now = new Date();
            const prayerList = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

            let nextPrayer: string | null = null;
            let nextTime: Date | null = null;
            let current: string = '';

            for (let i = 0; i < prayerList.length; i++) {
                const prayerName = prayerList[i];
                const timeStr = prayerTimes[prayerName];
                const [hours, minutes] = timeStr.split(':').map(Number);

                const prayerDate = new Date(now);
                prayerDate.setHours(hours, minutes, 0, 0);

                if (prayerDate > now) {
                    nextPrayer = prayerName;
                    nextTime = prayerDate;
                    current = i > 0 ? prayerList[i - 1] : 'Isha';
                    break;
                }
            }

            if (!nextPrayer) {
                const [hours, minutes] = prayerTimes.Fajr.split(':').map(Number);
                const tomorrow = new Date(now);
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(hours, minutes, 0, 0);
                nextPrayer = 'Fajr';
                nextTime = tomorrow;
                current = 'Isha';
            }

            setCurrentPrayer(current);
            setNextPrayerName(nextPrayer);

            if (nextTime) {
                const diff = nextTime.getTime() - now.getTime();
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((diff % (1000 * 60)) / 1000);

                setCountdown(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [prayerTimes]);

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualCity && manualCountry) {
            setUseManual(true);
        }
    };

    const getPrayerTranslation = (name: string) => {
        const key = `prayer.${name.toLowerCase()}`;
        return t(key);
    };

    if (loading || location.loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-muted">{t('prayer.loading')}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header with Location & Hijri Date */}
            <div className="text-center space-y-2">
                <div className={`flex items-center justify-center gap-2 text-muted ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>📍</span>
                    <span>{useManual ? `${manualCity}, ${manualCountry}` : `${location.city || 'Unknown'}, ${location.country || ''}`}</span>
                </div>
                {hijriDate && (
                    <p className="text-lg font-medium text-primary">{hijriDate} AH</p>
                )}
                {qiblaDirection && (
                    <p className="text-sm text-muted">🧭 {t('prayer.qiblaDirection')}: {qiblaDirection.toFixed(1)}° {t('prayer.fromNorth')}</p>
                )}
            </div>

            {/* Countdown Card */}
            {countdown && (
                <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-6 text-center shadow-xl glow-pulse">
                    <p className="text-sm opacity-90 mb-1">{t('prayer.nextPrayer')}</p>
                    <p className="text-3xl font-bold tracking-wider">{countdown}</p>
                    <p className="text-lg mt-1">{t('prayer.until')} {getPrayerTranslation(nextPrayerName)}</p>
                    {currentPrayer && (
                        <p className="text-sm opacity-80 mt-2">{t('prayer.current')}: {getPrayerTranslation(currentPrayer)}</p>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-4 text-red-700 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* Manual Location Form */}
            {(location.permissionDenied || error) && !useManual && (
                <form onSubmit={handleManualSubmit} className="bg-card-bg border border-card-border rounded-xl p-4 space-y-4">
                    <p className="text-sm text-muted">{t('prayer.enterLocation')}</p>
                    <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <input
                            type="text"
                            placeholder={t('prayer.city')}
                            value={manualCity}
                            onChange={(e) => setManualCity(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                            type="text"
                            placeholder={t('prayer.country')}
                            value={manualCountry}
                            onChange={(e) => setManualCountry(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        {t('prayer.getPrayerTimes')}
                    </button>
                </form>
            )}

            {/* Prayer Times Grid */}
            {prayerTimes && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {prayers.map((prayer) => (
                        <div
                            key={prayer.name}
                            className={`bg-card-bg border border-card-border rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 ${currentPrayer === prayer.name ? 'ring-2 ring-primary shadow-lg' : ''
                                }`}
                        >
                            <span className="text-3xl mb-2 block">{prayer.icon}</span>
                            <p className="text-sm text-muted mb-1">{t(prayer.nameKey)}</p>
                            <p className="text-xl font-bold text-foreground">{prayer.time}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Calculation Method Selector */}
            <div className="bg-card-bg border border-card-border rounded-xl p-4">
                <label className={`block text-sm text-muted mb-2 ${isRTL ? 'text-right' : ''}`}>{t('prayer.calculationMethod')}</label>
                <select
                    value={method}
                    onChange={(e) => setMethod(Number(e.target.value))}
                    className={`w-full px-4 py-2 rounded-lg border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-primary ${isRTL ? 'text-right' : ''}`}
                >
                    {CALCULATION_METHODS.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
