'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    fetchSurahInfo,
    fetchSurahWithTranslation,
    getAudioUrl,
    RECITERS,
    type Surah,
    type Verse
} from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

export function SurahViewer() {
    const params = useParams();
    const surahId = Number(params.id);
    const { t, isRTL } = useLanguage();

    const [surah, setSurah] = useState<Surah | null>(null);
    const [verses, setVerses] = useState<Verse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showTranslation, setShowTranslation] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);

    // Audio state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioError, setAudioError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const audioUrl = surahId ? getAudioUrl(surahId, selectedReciter) : '';

    useEffect(() => {
        async function loadSurah() {
            if (!surahId) return;

            setLoading(true);
            setError(null);

            try {
                const [surahInfoRes, versesRes] = await Promise.all([
                    fetchSurahInfo(surahId),
                    fetchSurahWithTranslation(surahId, 20, 1, 50),
                ]);
                setSurah(surahInfoRes.chapter);
                setVerses(versesRes.verses);
                setHasMore(versesRes.pagination.current_page < versesRes.pagination.total_pages);
                setPage(1);
            } catch (err) {
                setError('Failed to load Surah. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadSurah();
    }, [surahId]);

    // Reset audio when URL changes
    useEffect(() => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
        }
    }, [audioUrl]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error("Play error:", e);
                    setAudioError("Error playing audio");
                    setIsPlaying(false);
                });
            }
        }
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        setCurrentTime(e.currentTarget.currentTime);
        setDuration(e.currentTarget.duration || 0);
    };

    const loadMore = async () => {
        if (!hasMore || loading) return;

        try {
            const nextPage = page + 1;
            const versesRes = await fetchSurahWithTranslation(surahId, 20, nextPage, 50);
            setVerses(prev => [...prev, ...versesRes.verses]);
            setPage(nextPage);
            setHasMore(versesRes.pagination.current_page < versesRes.pagination.total_pages);
        } catch (err) {
            console.error('Failed to load more verses:', err);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getReciterName = () => {
        return RECITERS.find(r => r.id === selectedReciter)?.name || '';
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-muted">{t('quran.loadingSurah')}</p>
            </div>
        );
    }

    if (error || !surah) {
        return (
            <div className="space-y-4">
                <Link href="/quran" className={`inline-flex items-center gap-2 text-primary hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {isRTL ? '→' : '←'} {t('quran.backToSurahs')}
                </Link>
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-4 text-red-700 dark:text-red-300">
                    {error || 'Surah not found'}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Back Link */}
            <Link href="/quran" className={`inline-flex items-center gap-2 text-primary hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}>
                {isRTL ? '→' : '←'} {t('quran.backToSurahs')}
            </Link>

            {/* Surah Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-6 text-center shadow-xl">
                <h1 className="arabic-text text-4xl mb-2">{surah.name_arabic}</h1>
                <h2 className="text-2xl font-bold mb-1">{surah.name_simple}</h2>
                <p className="opacity-90">{surah.translated_name.name}</p>
                <p className="text-sm opacity-80 mt-2">
                    {surah.verses_count} {t('quran.verses')} • {surah.revelation_place}
                </p>
            </div>

            {/* Audio Player */}
            <div className="bg-card-bg border border-card-border rounded-xl p-4 space-y-4">
                {/* Native Audio Element */}
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setAudioError("Failed to load audio")}
                    preload="metadata"
                />

                {/* Reciter Selector */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {RECITERS.map((reciter) => (
                        <button
                            key={reciter.id}
                            onClick={() => setSelectedReciter(reciter.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedReciter === reciter.id
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-card-border text-foreground hover:bg-primary/20'
                                }`}
                        >
                            {reciter.name}
                        </button>
                    ))}
                </div>

                {/* Player Controls */}
                <div className={`flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                        onClick={handlePlayPause}
                        className="w-14 h-14 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary-dark transition-colors cursor-pointer"
                    >
                        {isPlaying ? (
                            <span className="text-2xl">⏸</span>
                        ) : (
                            <span className="text-2xl">▶</span>
                        )}
                    </button>

                    <div className="flex-1">
                        <div className="h-2 bg-card-border rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                            />
                        </div>
                        {audioError && <p className="text-xs text-red-500 mt-1">{audioError}</p>}
                        <div className={`flex justify-between text-xs text-muted mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            if (audioRef.current) {
                                audioRef.current.pause();
                                audioRef.current.currentTime = 0;
                            }
                        }}
                        className="p-2 text-muted hover:text-primary transition-colors"
                        aria-label="Stop"
                    >
                        ⏹
                    </button>
                </div>
                <p className="text-center text-sm text-muted">🎧 {getReciterName()}</p>
            </div>

            {/* Translation Toggle */}
            <div className={`flex items-center justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm text-muted">{t('quran.showTranslation')}</span>
                <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${showTranslation ? 'bg-primary' : 'bg-card-border'}`}
                >
                    <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${showTranslation ? 'left-7' : 'left-1'}`}
                    />
                </button>
            </div>

            {/* Bismillah */}
            {surahId !== 1 && surahId !== 9 && (
                <div className="text-center py-4">
                    <p className="arabic-text text-3xl text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                    {showTranslation && (
                        <p className="text-muted mt-2">{t('quran.bismillah')}</p>
                    )}
                </div>
            )}

            {/* Verses */}
            <div className="space-y-6">
                {verses.map((verse) => (
                    <div
                        key={verse.id}
                        className="bg-card-bg border border-card-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                        {/* Verse Number Badge */}
                        <div className={`flex mb-4 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                            <span className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full text-sm">
                                {verse.verse_number}
                            </span>
                        </div>

                        {/* Arabic Text */}
                        <p className="arabic-text text-2xl leading-loose mb-4">
                            {verse.text_uthmani}
                        </p>

                        {/* Translation */}
                        {showTranslation && verse.translations && verse.translations.length > 0 && (
                            <p className={`text-muted leading-relaxed border-t border-card-border pt-4 ${isRTL ? 'text-right' : ''}`}>
                                {verse.translations[0].text.replace(/<[^>]*>/g, '')}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Load More */}
            {hasMore && (
                <button
                    onClick={loadMore}
                    className="w-full py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors"
                >
                    {t('quran.loadMore')}
                </button>
            )}

            {/* Navigation */}
            <div className={`flex justify-between pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {surahId > 1 && (
                    <Link
                        href={`/quran/${surahId - 1}`}
                        className={`px-4 py-2 bg-card-bg border border-card-border rounded-lg hover:border-primary transition-colors flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        {isRTL ? '→' : '←'} {t('quran.previousSurah')}
                    </Link>
                )}
                {surahId < 114 && (
                    <Link
                        href={`/quran/${surahId + 1}`}
                        className={`px-4 py-2 bg-card-bg border border-card-border rounded-lg hover:border-primary transition-colors ml-auto flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        {t('quran.nextSurah')} {isRTL ? '←' : '→'}
                    </Link>
                )}
            </div>
        </div>
    );
}
