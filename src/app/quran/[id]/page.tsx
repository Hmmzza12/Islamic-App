import { SurahViewer } from '@/components/quran/SurahViewer';

export const metadata = {
    title: 'Reading Surah - Islamic App',
    description: 'Read Surah with Arabic text, English translation, and audio recitation.',
};

export default function SurahPage() {
    return <SurahViewer />;
}
