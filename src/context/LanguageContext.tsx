'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isRTL: boolean;
}

// Translations
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.prayerTimes': 'Prayer Times',
        'nav.quran': 'Quran',
        'nav.hadith': 'Hadith',
        'nav.adhkar': 'Adhkar',
        'nav.monthly': 'Monthly',
        'nav.theme': 'Theme',
        'nav.language': 'Language',

        // Home
        'home.title': 'Islamic App',
        'home.subtitle': 'Your daily companion for prayer times, Quran reading, and spiritual growth.',
        'home.prayerTimes': 'Prayer Times',
        'home.prayerDesc': 'Accurate prayer times based on your location. Countdown to next prayer, Qibla direction, and multiple calculation methods.',
        'home.quran': 'Holy Quran',
        'home.quranDesc': 'Read the complete Quran with beautiful Arabic typography, English translations, and audio recitation.',
        'home.features': 'Features',
        'home.autoLocation': 'Auto Location',
        'home.qibla': 'Qibla Direction',
        'home.hijriDate': 'Hijri Date',
        'home.darkMode': 'Dark Mode',
        'home.audioRecitation': 'Audio Recitation',
        'home.translation': 'Translation',
        'home.countdown': 'Countdown',
        'home.mobileFriendly': 'Mobile Friendly',

        // Prayer Times
        'prayer.title': 'Prayer Times',
        'prayer.subtitle': 'Daily Salat schedule based on your location',
        'prayer.loading': 'Loading prayer times...',
        'prayer.nextPrayer': 'Next Prayer',
        'prayer.current': 'Current',
        'prayer.until': 'until',
        'prayer.locationError': 'Unable to determine location. Please enter your city manually.',
        'prayer.enterLocation': 'Enter your location manually:',
        'prayer.city': 'City',
        'prayer.country': 'Country',
        'prayer.getPrayerTimes': 'Get Prayer Times',
        'prayer.calculationMethod': 'Calculation Method',
        'prayer.qiblaDirection': 'Qibla',
        'prayer.fromNorth': 'from North',

        // Prayer names
        'prayer.fajr': 'Fajr',
        'prayer.sunrise': 'Sunrise',
        'prayer.dhuhr': 'Dhuhr',
        'prayer.asr': 'Asr',
        'prayer.maghrib': 'Maghrib',
        'prayer.isha': 'Isha',

        // Quran
        'quran.title': 'Holy Quran',
        'quran.subtitle': 'Browse and read all 114 Surahs',
        'quran.search': 'Search Surah...',
        'quran.verses': 'verses',
        'quran.loading': 'Loading Surahs...',
        'quran.loadingSurah': 'Loading Surah...',
        'quran.backToSurahs': 'Back to Surahs',
        'quran.showTranslation': 'Show Translation',
        'quran.loadMore': 'Load More Verses',
        'quran.previousSurah': 'Previous Surah',
        'quran.nextSurah': 'Next Surah',
        'quran.noResults': 'No Surahs found matching your search.',
        'quran.bismillah': 'In the name of Allah, the Most Gracious, the Most Merciful',

        // Hadith & Adhkar Categories
        'category.all': 'All',
        'category.iman': 'Iman',
        'category.salah': 'Salah',
        'category.akhlaq': 'Character',
        'category.dua': 'Dua',
        'category.quran': 'Quran',
        'category.general': 'General',
        'category.charity': 'Charity',
        'category.knowledge': 'Knowledge',
        'category.patience': 'Patience',
        'category.morning': 'Morning',
        'category.evening': 'Evening',
        'category.after salah': 'After Salah',
        'category.sleep': 'Sleep',
        'category.waking up': 'Waking Up',
        'category.travel': 'Travel',

        // Hadith Page
        'hadith.title': 'Prophetic Hadiths',
        'hadith.subtitle': 'A curated collection of authentic narrations from the Sunnah',
        'hadith.daily': 'Hadith of the Day',
        'hadith.source': 'Source',
        'hadith.grade': 'Grade',

        // Adhkar Page
        'adhkar.title': 'Daily Adhkar',
        'adhkar.subtitle': 'Remembrance of Allah for morning, evening, and after prayers',
        'adhkar.count': 'Count',
        'adhkar.reset': 'Tap to reset',
        'adhkar.tap': 'Tap to count',

        // Monthly Page
        'monthly.title': 'Monthly Planner',
        'monthly.subtitle': 'Track your spiritual goals and important dates',
        'monthly.current': 'Current Month',
        'monthly.calendar': 'Calendar',
        'monthly.important': 'Important Dates',
        'monthly.goals': 'Monthly Goals',
        'monthly.addGoal': 'Add New Goal',
        'monthly.addDate': 'Add Date',
        'monthly.cancel': 'Cancel',
        'monthly.add': 'Add',

        // Calendar Weekdays
        'calendar.sun': 'Sun',
        'calendar.mon': 'Mon',
        'calendar.tue': 'Tue',
        'calendar.wed': 'Wed',
        'calendar.thu': 'Thu',
        'calendar.fri': 'Fri',
        'calendar.sat': 'Sat',
    },
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.prayerTimes': 'مواقيت الصلاة',
        'nav.quran': 'القرآن',
        'nav.hadith': 'الحديث',
        'nav.adhkar': 'الأذكار',
        'nav.monthly': 'الشهري',
        'nav.theme': 'المظهر',
        'nav.language': 'اللغة',

        // Home
        'home.title': 'التطبيق الإسلامي',
        'home.subtitle': 'رفيقك اليومي لمواقيت الصلاة وقراءة القرآن والنمو الروحي.',
        'home.prayerTimes': 'مواقيت الصلاة',
        'home.prayerDesc': 'مواقيت صلاة دقيقة بناءً على موقعك. العد التنازلي للصلاة التالية واتجاه القبلة وطرق حساب متعددة.',
        'home.quran': 'القرآن الكريم',
        'home.quranDesc': 'اقرأ القرآن الكريم كاملاً بخط عربي جميل مع ترجمات وتلاوة صوتية.',
        'home.features': 'المميزات',
        'home.autoLocation': 'تحديد الموقع تلقائياً',
        'home.qibla': 'اتجاه القبلة',
        'home.hijriDate': 'التاريخ الهجري',
        'home.darkMode': 'الوضع الداكن',
        'home.audioRecitation': 'التلاوة الصوتية',
        'home.translation': 'الترجمة',
        'home.countdown': 'العد التنازلي',
        'home.mobileFriendly': 'متوافق مع الجوال',

        // Prayer Times
        'prayer.title': 'مواقيت الصلاة',
        'prayer.subtitle': 'جدول الصلاة اليومي بناءً على موقعك',
        'prayer.loading': 'جاري تحميل مواقيت الصلاة...',
        'prayer.nextPrayer': 'الصلاة القادمة',
        'prayer.current': 'الحالية',
        'prayer.until': 'حتى',
        'prayer.locationError': 'تعذر تحديد الموقع. يرجى إدخال مدينتك يدوياً.',
        'prayer.enterLocation': 'أدخل موقعك يدوياً:',
        'prayer.city': 'المدينة',
        'prayer.country': 'الدولة',
        'prayer.getPrayerTimes': 'الحصول على مواقيت الصلاة',
        'prayer.calculationMethod': 'طريقة الحساب',
        'prayer.qiblaDirection': 'القبلة',
        'prayer.fromNorth': 'من الشمال',

        // Prayer names
        'prayer.fajr': 'الفجر',
        'prayer.sunrise': 'الشروق',
        'prayer.dhuhr': 'الظهر',
        'prayer.asr': 'العصر',
        'prayer.maghrib': 'المغرب',
        'prayer.isha': 'العشاء',

        // Quran
        'quran.title': 'القرآن الكريم',
        'quran.subtitle': 'تصفح واقرأ جميع السور الـ 114',
        'quran.search': 'ابحث عن سورة...',
        'quran.verses': 'آية',
        'quran.loading': 'جاري تحميل السور...',
        'quran.loadingSurah': 'جاري تحميل السورة...',
        'quran.backToSurahs': 'العودة إلى السور',
        'quran.showTranslation': 'إظهار الترجمة',
        'quran.loadMore': 'تحميل المزيد من الآيات',
        'quran.previousSurah': 'السورة السابقة',
        'quran.nextSurah': 'السورة التالية',
        'quran.noResults': 'لم يتم العثور على سور مطابقة لبحثك.',
        'quran.bismillah': 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',

        // Hadith & Adhkar Categories
        'category.all': 'الكل',
        'category.iman': 'الإيمان',
        'category.salah': 'الصلاة',
        'category.akhlaq': 'الأخلاق',
        'category.dua': 'الدعاء',
        'category.quran': 'القرآن',
        'category.general': 'عام',
        'category.charity': 'الصدقة',
        'category.knowledge': 'العلم',
        'category.patience': 'الصبر',
        'category.morning': 'الصباح',
        'category.evening': 'المساء',
        'category.after salah': 'بعد الصلاة',
        'category.sleep': 'النوم',
        'category.waking up': 'الاستيقاظ',
        'category.travel': 'السفر',

        // Hadith Page
        'hadith.title': 'أحاديث نبوية',
        'hadith.subtitle': 'مجموعة مختارة من الأحاديث الصحيحة من كتب السنة المعتمدة',
        'hadith.daily': 'حديث اليوم',
        'hadith.source': 'المصدر',
        'hadith.grade': 'الدرجة',

        // Adhkar Page
        'adhkar.title': 'أذكار المسلم',
        'adhkar.subtitle': 'حصن المسلم من أذكار الصباح والمساء وأدبار الصلوات',
        'adhkar.count': 'العدد',
        'adhkar.reset': 'اضغط للإعادة',
        'adhkar.tap': 'اضغط للعد',

        // Monthly Page
        'monthly.title': 'التقويم الشهري',
        'monthly.subtitle': 'تابع أهدافك وتواريخك الهامة لهذا الشهر الهجري',
        'monthly.current': 'الشهر الحالي',
        'monthly.calendar': 'التقويم',
        'monthly.important': 'تواريخ هامة',
        'monthly.goals': 'أهداف الشهر',
        'monthly.addGoal': 'إضافة هدف',
        'monthly.addDate': 'إضافة تاريخ',
        'monthly.cancel': 'إلغاء',
        'monthly.add': 'إضافة',

        // Calendar Weekdays
        'calendar.sun': 'أحد',
        'calendar.mon': 'اثنين',
        'calendar.tue': 'ثلاثاء',
        'calendar.wed': 'أربعاء',
        'calendar.thu': 'خميس',
        'calendar.fri': 'جمعة',
        'calendar.sat': 'سبت',
    }
};

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => { },
    t: (key: string) => key,
    isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const stored = localStorage.getItem('language') as Language | null;
        if (stored && (stored === 'en' || stored === 'ar')) {
            setLanguageState(stored);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    const isRTL = language === 'ar';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
