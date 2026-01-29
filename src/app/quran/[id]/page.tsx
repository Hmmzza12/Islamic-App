import { SurahViewer } from '@/components/quran/SurahViewer';

export const metadata = {
    title: 'Reading Surah - Islamic App',
    description: 'Read Surah with Arabic text, English translation, and audio recitation.',
};

export async function generateStaticParams() {
    return Array.from({ length: 114 }, (_, i) => ({
        id: (i + 1).toString(),
    }));
}

export default function SurahPage() {
    return <SurahViewer />;
}
