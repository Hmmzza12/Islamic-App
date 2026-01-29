'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t, isRTL } = useLanguage();

  const features = [
    { icon: '📍', labelKey: 'home.autoLocation' },
    { icon: '🧭', labelKey: 'home.qibla' },
    { icon: '🌙', labelKey: 'home.hijriDate' },
    { icon: '🌓', labelKey: 'home.darkMode' },
    { icon: '🔊', labelKey: 'home.audioRecitation' },
    { icon: '🌐', labelKey: 'home.translation' },
    { icon: '⏱️', labelKey: 'home.countdown' },
    { icon: '📱', labelKey: 'home.mobileFriendly' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-16">
        <div className="text-6xl mb-4">☪</div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          <span className="text-primary">{t('home.title')}</span>
        </h1>
        <p className="text-lg text-muted max-w-xl mx-auto">
          {t('home.subtitle')}
        </p>
      </section>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Prayer Times Card */}
        <Link
          href="/prayer-times"
          className="group bg-card-bg border border-card-border rounded-2xl p-6 hover:shadow-xl hover:border-primary transition-all duration-300"
        >
          <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
            <div className="text-5xl">🕌</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {t('home.prayerTimes')}
              </h2>
              <p className="text-muted mt-2">
                {t('home.prayerDesc')}
              </p>
              <div className={`flex flex-wrap gap-2 mt-4 ${isRTL ? 'justify-end' : ''}`}>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{t('home.autoLocation')}</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{t('home.countdown')}</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{t('home.qibla')}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Quran Card */}
        <Link
          href="/quran"
          className="group bg-card-bg border border-card-border rounded-2xl p-6 hover:shadow-xl hover:border-primary transition-all duration-300"
        >
          <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
            <div className="text-5xl">📖</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {t('home.quran')}
              </h2>
              <p className="text-muted mt-2">
                {t('home.quranDesc')}
              </p>
              <div className={`flex flex-wrap gap-2 mt-4 ${isRTL ? 'justify-end' : ''}`}>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">114 {t('quran.verses')}</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{t('home.translation')}</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{t('home.audioRecitation')}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Info */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-6 text-center">
        <h3 className="text-xl font-bold mb-2">🌙 {isRTL ? 'بسم الله' : 'Bismillah'}</h3>
        <p className="arabic-text text-2xl mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <p className="opacity-90">{t('quran.bismillah')}</p>
      </section>

      {/* Features List */}
      <section className="space-y-4">
        <h3 className={`text-xl font-bold text-foreground ${isRTL ? 'text-right' : ''}`}>{t('home.features')}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((item) => (
            <div
              key={item.labelKey}
              className="bg-card-bg border border-card-border rounded-xl p-4 text-center hover:border-primary transition-colors"
            >
              <span className="text-2xl block mb-2">{item.icon}</span>
              <span className="text-sm text-muted">{t(item.labelKey)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
