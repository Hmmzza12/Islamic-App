'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export interface AudioState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    loading: boolean;
    error: string | null;
}

export function useAudio(audioUrl: string | null) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [state, setState] = useState<AudioState>({
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        loading: false,
        error: null,
    });

    // Reset state and create new audio when URL changes
    useEffect(() => {
        // Cleanup previous audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        // Reset state
        setState({
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            loading: false,
            error: null,
        });

        if (!audioUrl) return;

        const audio = new Audio();
        audioRef.current = audio;

        const handleLoadStart = () => setState(prev => ({ ...prev, error: null })); // Don't set loading true here preventing lock
        const handleWaiting = () => setState(prev => ({ ...prev, loading: true }));
        const handleCanPlay = () => setState(prev => ({ ...prev, loading: false, duration: audio.duration || 0 }));
        const handlePlaying = () => setState(prev => ({ ...prev, loading: false, isPlaying: true }));
        const handleLoadedMetadata = () => setState(prev => ({ ...prev, duration: audio.duration || 0 }));
        const handleTimeUpdate = () => setState(prev => ({ ...prev, currentTime: audio.currentTime }));
        const handleEnded = () => setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
        const handleError = (e: Event) => {
            console.error('Audio error:', e);
            setState(prev => ({ ...prev, error: 'Failed to load audio', loading: false }));
        };
        const handlePlay = () => setState(prev => ({ ...prev, isPlaying: true }));
        const handlePause = () => setState(prev => ({ ...prev, isPlaying: false }));

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('playing', handlePlaying);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        // Set source and load
        audio.src = audioUrl;
        audio.load();

        return () => {
            audio.pause();
            audio.src = '';
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
        };
    }, [audioUrl]);

    const play = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(err => {
                console.error('Play error:', err);
                setState(prev => ({ ...prev, error: 'Failed to play audio' }));
            });
        }
    }, []);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }, []);

    const toggle = useCallback(() => {
        if (!audioRef.current) return;

        if (state.isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
    }, [state.isPlaying]);

    const seek = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
        }
    }, []);

    return {
        ...state,
        play,
        pause,
        toggle,
        seek,
        stop,
    };
}
