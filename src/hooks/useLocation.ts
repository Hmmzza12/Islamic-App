'use client';

import { useState, useEffect, useCallback } from 'react';

export interface LocationState {
    latitude: number | null;
    longitude: number | null;
    city: string | null;
    country: string | null;
    error: string | null;
    loading: boolean;
    permissionDenied: boolean;
}

export function useLocation() {
    const [location, setLocation] = useState<LocationState>({
        latitude: null,
        longitude: null,
        city: null,
        country: null,
        error: null,
        loading: true,
        permissionDenied: false,
    });

    const fetchCityFromCoords = async (lat: number, lon: number) => {
        try {
            // Using a free reverse geocoding API
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            if (res.ok) {
                const data = await res.json();
                return {
                    city: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
                    country: data.address?.country || 'Unknown',
                };
            }
        } catch {
            console.error('Failed to fetch city name');
        }
        return { city: null, country: null };
    };

    const requestLocation = useCallback(() => {
        setLocation(prev => ({ ...prev, loading: true, error: null }));

        if (!navigator.geolocation) {
            setLocation(prev => ({
                ...prev,
                loading: false,
                error: 'Geolocation is not supported by your browser',
            }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const { city, country } = await fetchCityFromCoords(latitude, longitude);

                setLocation({
                    latitude,
                    longitude,
                    city,
                    country,
                    error: null,
                    loading: false,
                    permissionDenied: false,
                });
            },
            (error) => {
                let errorMessage = 'Failed to get location';
                let permissionDenied = false;

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied';
                        permissionDenied = true;
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out';
                        break;
                }

                setLocation({
                    latitude: null,
                    longitude: null,
                    city: null,
                    country: null,
                    error: errorMessage,
                    loading: false,
                    permissionDenied,
                });
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000, // Cache for 5 minutes
            }
        );
    }, []);

    const setManualLocation = useCallback((city: string, country: string) => {
        setLocation({
            latitude: null,
            longitude: null,
            city,
            country,
            error: null,
            loading: false,
            permissionDenied: false,
        });
    }, []);

    useEffect(() => {
        requestLocation();
    }, [requestLocation]);

    return {
        ...location,
        requestLocation,
        setManualLocation,
    };
}
