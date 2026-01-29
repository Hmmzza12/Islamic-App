// API Services for Prayer Times and Quran

// ============ PRAYER TIMES (Aladhan API) ============
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface PrayerTimesResponse {
  code: number;
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      hijri: {
        date: string;
        day: string;
        month: { number: number; en: string; ar: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
      };
      gregorian: {
        date: string;
        day: string;
        month: { number: number; en: string };
        year: string;
      };
    };
    meta: {
      method: { id: number; name: string };
    };
  };
}

export interface QiblaResponse {
  code: number;
  data: {
    latitude: number;
    longitude: number;
    direction: number;
  };
}

export async function fetchPrayerTimesByCoords(
  latitude: number,
  longitude: number,
  method: number = 2 // 2 = ISNA (North America)
): Promise<PrayerTimesResponse> {
  const today = new Date();
  const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  const res = await fetch(
    `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${method}`
  );

  if (!res.ok) throw new Error('Failed to fetch prayer times');
  return res.json();
}

export async function fetchPrayerTimesByCity(
  city: string,
  country: string,
  method: number = 2
): Promise<PrayerTimesResponse> {
  const today = new Date();
  const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  const res = await fetch(
    `https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`
  );

  if (!res.ok) throw new Error('Failed to fetch prayer times');
  return res.json();
}

export async function fetchQiblaDirection(
  latitude: number,
  longitude: number
): Promise<QiblaResponse> {
  const res = await fetch(
    `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`
  );

  if (!res.ok) throw new Error('Failed to fetch Qibla direction');
  return res.json();
}

// Calculation Methods
export const CALCULATION_METHODS = [
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
  { id: 2, name: 'Islamic Society of North America (ISNA)' },
  { id: 3, name: 'Muslim World League' },
  { id: 4, name: 'Umm al-Qura, Makkah' },
  { id: 5, name: 'Egyptian General Authority' },
  { id: 7, name: 'Institute of Geophysics, Tehran' },
  { id: 8, name: 'Gulf Region' },
  { id: 9, name: 'Kuwait' },
  { id: 10, name: 'Qatar' },
  { id: 11, name: 'Majlis Ugama Islam Singapura' },
  { id: 12, name: 'Union Organization Islamic de France' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
  { id: 14, name: 'Spiritual Administration of Muslims of Russia' },
];

// ============ QURAN (Quran.com API v4) ============
export interface Surah {
  id: number;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
  revelation_place: string;
  translated_name: { name: string };
}

export interface SurahListResponse {
  chapters: Surah[];
}

export interface Verse {
  id: number;
  verse_key: string;
  verse_number: number;
  text_uthmani: string;
  translations?: { text: string }[];
}

export interface VersesResponse {
  verses: Verse[];
  pagination: {
    per_page: number;
    current_page: number;
    total_pages: number;
    total_records: number;
  };
}

export async function fetchAllSurahs(): Promise<SurahListResponse> {
  const res = await fetch('https://api.quran.com/api/v4/chapters?language=en');
  if (!res.ok) throw new Error('Failed to fetch Surahs');
  return res.json();
}

export async function fetchSurahVerses(
  surahId: number,
  page: number = 1,
  perPage: number = 50
): Promise<VersesResponse> {
  const res = await fetch(
    `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}&page=${page}&per_page=${perPage}`
  );
  if (!res.ok) throw new Error('Failed to fetch verses');
  return res.json();
}

export async function fetchSurahWithTranslation(
  surahId: number,
  translationId: number = 20, // Sahih International
  page: number = 1,
  perPage: number = 50
): Promise<VersesResponse> {
  const res = await fetch(
    `https://api.quran.com/api/v4/verses/by_chapter/${surahId}?language=en&words=false&translations=${translationId}&fields=text_uthmani&page=${page}&per_page=${perPage}`
  );
  if (!res.ok) throw new Error('Failed to fetch verses with translation');
  return res.json();
}

export async function fetchSurahInfo(surahId: number): Promise<{ chapter: Surah }> {
  const res = await fetch(`https://api.quran.com/api/v4/chapters/${surahId}?language=en`);
  if (!res.ok) throw new Error('Failed to fetch Surah info');
  return res.json();
}

// Reciters (Sheikhs) for audio
export const RECITERS = [
  { id: 'mishaari_raashid_al_3afaasee', name: 'Mishary Rashid Alafasy' },
  { id: 'abdul_basit_murattal', name: 'Abdul Basit (Murattal)' },
  { id: 'yasser_ad-dussary', name: 'Yasser Al-Dosari' },
];

// Audio recitation URL
export function getAudioUrl(surahId: number, reciterId: string = 'mishaari_raashid_al_3afaasee'): string {
  const paddedId = surahId.toString().padStart(3, '0');
  return `https://download.quranicaudio.com/quran/${reciterId}/${paddedId}.mp3`;
}
