'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t, isRTL } = useLanguage();

    const navItems = [
        { href: '/', label: t('nav.home'), icon: '🏠' },
        { href: '/prayer-times', label: t('nav.prayerTimes'), icon: '🕌' },
        { href: '/quran', label: t('nav.quran'), icon: '📖' },
        { href: '/hadith', label: t('nav.hadith'), icon: '📜' },
        { href: '/adhkar', label: t('nav.adhkar'), icon: '📿' },
        { href: '/monthly', label: t('nav.monthly'), icon: '📅' },
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card-bg/80 backdrop-blur-md border-b border-card-border">
                <div className={`max-w-6xl mx-auto w-full px-6 py-4 flex items-center justify-between gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Logo */}
                    <Link href="/" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-3xl">☪</span>
                        <span className="text-xl font-bold text-primary">{t('home.title')}</span>
                    </Link>

                    {/* Nav Links */}
                    <div className={`flex items-center gap-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''} ${pathname === item.href
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'hover:bg-primary/10 text-foreground'
                                    }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Theme & Language Toggle */}
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-2 rounded-full bg-card-bg border border-card-border hover:bg-primary/10 transition-colors text-sm font-medium"
                            aria-label="Toggle language"
                        >
                            {language === 'en' ? 'العربية' : 'English'}
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-3 rounded-full bg-card-bg border border-card-border hover:bg-primary/10 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card-bg/95 backdrop-blur-md border-t border-card-border">
                <div className="flex items-center justify-around py-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${pathname === item.href
                                ? 'text-primary'
                                : 'text-muted hover:text-primary'
                                }`}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    ))}
                    <button
                        onClick={toggleLanguage}
                        className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-muted hover:text-primary transition-colors"
                        aria-label="Toggle language"
                    >
                        <span className="text-2xl">🌐</span>
                        <span className="text-xs font-medium">{language === 'en' ? 'عربي' : 'EN'}</span>
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-muted hover:text-primary transition-colors"
                        aria-label="Toggle theme"
                    >
                        <span className="text-2xl">{theme === 'light' ? '🌙' : '☀️'}</span>
                        <span className="text-xs font-medium">{t('nav.theme')}</span>
                    </button>
                </div>
            </nav>
        </>
    );
}
