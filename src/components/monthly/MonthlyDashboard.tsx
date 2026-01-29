'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface MonthlyGoal {
    id: number;
    text: string;
    completed: boolean;
}

interface ImportantDate {
    day: number;
    event: string;
}

export function MonthlyDashboard() {
    // Dynamic Hijri Data
    const { language, t, isRTL } = useLanguage();
    const [hijriAdjustment, setHijriAdjustment] = useState(-2); // User said today is 9, system said 11
    const today = new Date();

    // Apply adjustment to a working date for calculations
    const adjustedToday = new Date(today);
    adjustedToday.setDate(today.getDate() + hijriAdjustment);

    // Get current Hijri month and year using a robust locale
    const hijriLocale = language === 'ar' ? 'ar-u-ca-islamic' : 'en-u-ca-islamic';
    const hijriFormatter = new Intl.DateTimeFormat(hijriLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const hijriParts = hijriFormatter.formatToParts(adjustedToday);
    const currentHijriDay = parseInt(hijriParts.find(p => p.type === 'day')?.value || '1');
    const currentHijriMonth = hijriParts.find(p => p.type === 'month')?.value || 'Month';
    const currentHijriYear = hijriParts.find(p => p.type === 'year')?.value || '1447';

    // Gregorian fallback/orientation
    const gregorianDate = today.toLocaleDateString(language === 'ar' ? 'ar' : 'en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Determine days in month
    const checkDate = new Date(adjustedToday);
    checkDate.setDate(adjustedToday.getDate() + (30 - currentHijriDay));
    const checkParts = hijriFormatter.formatToParts(checkDate);
    const checkMonth = checkParts.find(p => p.type === 'month')?.value;
    const daysInMonth = checkMonth === currentHijriMonth ? 30 : 29;

    // Calculate weekday of the 1st of this Hijri month
    const firstOfMonthDate = new Date(adjustedToday);
    firstOfMonthDate.setDate(adjustedToday.getDate() - (currentHijriDay - 1));
    const firstWeekday = firstOfMonthDate.getDay(); // 0 (Sun) to 6 (Sat)

    const weekdays = [
        t('calendar.sun'), t('calendar.mon'), t('calendar.tue'),
        t('calendar.wed'), t('calendar.thu'), t('calendar.fri'), t('calendar.sat')
    ];

    const [goals, setGoals] = useState<MonthlyGoal[]>([
        { id: 1, text: "Read Surah Al-Kahf every Friday", completed: false },
        { id: 2, text: "Fast the White Days (13, 14, 15)", completed: false },
        { id: 3, text: "Donate to charity", completed: true },
        { id: 4, text: "Complete one Juz of Quran", completed: false },
    ]);

    const [importantDates, setImportantDates] = useState<ImportantDate[]>([
        { day: 1, event: "Start of Month" },
        { day: 13, event: "White Day Fasting" },
        { day: 14, event: "White Day Fasting" },
        { day: 15, event: "White Day Fasting" },
    ]);

    const [newGoal, setNewGoal] = useState('');
    const [isAddingGoal, setIsAddingGoal] = useState(false);

    const [newDateEvent, setNewDateEvent] = useState('');
    const [newDateDay, setNewDateDay] = useState('');
    const [isAddingDate, setIsAddingDate] = useState(false);

    const toggleGoal = (id: number) => {
        setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
    };

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoal.trim()) return;
        setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
        setNewGoal('');
        setIsAddingGoal(false);
    };

    const handleAddDate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDateEvent.trim() || !newDateDay) return;
        const day = parseInt(newDateDay);
        if (day < 1 || day > 30) return;

        const newDate = { day, event: newDateEvent };
        // Sort dates after adding
        const updatedDates = [...importantDates, newDate].sort((a, b) => a.day - b.day);

        setImportantDates(updatedDates);
        setNewDateEvent('');
        setNewDateDay('');
        setIsAddingDate(false);
    };

    const getEventsForDay = (day: number) => {
        return importantDates.filter(d => d.day === day);
    };

    return (
        <div className="space-y-8">
            {/* Header Card */}
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-8 relative overflow-hidden shadow-xl text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="relative z-10">
                    <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm mb-4">
                        {t('monthly.current')}
                    </span>
                    <h2 className="text-6xl font-bold font-serif mb-2">{currentHijriMonth}</h2>
                    <p className="text-2xl opacity-90 mb-2">{currentHijriYear} AH</p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <button
                            onClick={() => setHijriAdjustment(prev => prev - 1)}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition-colors"
                            title="Adjust Hijri date -1 day"
                        >
                            -
                        </button>
                        <p className="text-sm opacity-70 italic">{gregorianDate}</p>
                        <button
                            onClick={() => setHijriAdjustment(prev => prev + 1)}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-xl transition-colors"
                            title="Adjust Hijri date +1 day"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Calendar & Dates */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Calendar Grid */}
                    <div className="bg-card-bg border border-card-border rounded-2xl p-6">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            🗓 {t('monthly.calendar')}
                        </h3>
                        <div className="grid grid-cols-7 gap-2 text-center mb-2">
                            {weekdays.map((day, idx) => (
                                <span key={idx} className="text-muted text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                    {day}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {/* Empty cells for weekday offset */}
                            {Array.from({ length: firstWeekday }).map((_, i) => (
                                <div key={`empty-${i}`} className="aspect-square"></div>
                            ))}

                            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                                const hasEvents = getEventsForDay(day).length > 0;
                                const isToday = day === currentHijriDay;

                                return (
                                    <div
                                        key={day}
                                        className={`aspect-square rounded-lg border flex flex-col items-center justify-center relative transition-all ${isToday
                                            ? 'bg-primary text-white border-primary shadow-lg scale-105 z-10'
                                            : hasEvents
                                                ? 'bg-primary/10 border-primary text-primary font-bold'
                                                : 'bg-card-bg border-card-border hover:bg-card-border/50'
                                            }`}
                                    >
                                        <span>{day}</span>
                                        {hasEvents && !isToday && (
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1"></span>
                                        )}
                                        {hasEvents && isToday && (
                                            <span className="w-1.5 h-1.5 bg-white rounded-full mt-1"></span>
                                        )}
                                        {isToday && (
                                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Important Dates List */}
                    <div className="bg-card-bg border border-card-border rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                📅 {t('monthly.important')}
                            </h3>
                            <button
                                onClick={() => setIsAddingDate(!isAddingDate)}
                                className="text-sm text-primary hover:underline"
                            >
                                {isAddingDate ? t('monthly.cancel') : `+ ${t('monthly.addDate')}`}
                            </button>
                        </div>

                        {/* Add Date Form */}
                        {isAddingDate && (
                            <form onSubmit={handleAddDate} className="mb-6 p-4 bg-card-border/10 rounded-xl space-y-3">
                                <div className="grid grid-cols-4 gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max="30"
                                        placeholder="Day"
                                        value={newDateDay}
                                        onChange={(e) => setNewDateDay(e.target.value)}
                                        className="col-span-1 p-2 bg-card-bg border border-card-border rounded-lg"
                                        autoFocus
                                    />
                                    <input
                                        type="text"
                                        placeholder="Event Name"
                                        value={newDateEvent}
                                        onChange={(e) => setNewDateEvent(e.target.value)}
                                        className="col-span-3 p-2 bg-card-bg border border-card-border rounded-lg"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                >
                                    {t('monthly.add')}
                                </button>
                            </form>
                        )}

                        <div className="space-y-4">
                            {importantDates.map((date, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-card-border/30 rounded-lg transition-colors">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-xl">
                                        {date.day}
                                    </div>
                                    <div>
                                        <p className="font-medium">{date.event}</p>
                                        <p className="text-xs text-muted">of {currentHijriMonth}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Goals */}
                <div className="bg-card-bg border border-card-border rounded-2xl p-6 h-fit">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        🎯 {t('monthly.goals')}
                    </h3>

                    <div className="space-y-3 mb-6">
                        {goals.map((goal) => (
                            <div
                                key={goal.id}
                                onClick={() => toggleGoal(goal.id)}
                                className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${goal.completed
                                    ? 'bg-primary/5 text-muted line-through'
                                    : 'hover:bg-card-border/50'
                                    }`}
                            >
                                <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${goal.completed ? 'bg-primary border-primary text-white' : 'border-muted'
                                    }`}>
                                    {goal.completed && '✓'}
                                </div>
                                <span className={goal.completed ? 'opacity-50' : ''}>{goal.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Add Goal Section */}
                    {isAddingGoal ? (
                        <form onSubmit={handleAddGoal} className="space-y-2">
                            <input
                                type="text"
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                                placeholder="Enter goal..."
                                className="w-full p-2 bg-card-bg border border-card-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                                autoFocus
                            />
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark"
                                >
                                    {t('monthly.add')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddingGoal(false)}
                                    className="flex-1 py-2 bg-card-border text-foreground rounded-lg text-sm hover:bg-card-border/80"
                                >
                                    {t('monthly.cancel')}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            onClick={() => setIsAddingGoal(true)}
                            className="w-full py-2 border border-dashed border-card-border text-muted hover:border-primary hover:text-primary rounded-lg text-sm transition-colors"
                        >
                            + {t('monthly.addGoal')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
