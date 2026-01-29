import { useLanguage } from '@/context/LanguageContext';
import { Hadith } from '@/data/hadith';

interface HadithCardProps {
    hadith: Hadith;
}

export function HadithCard({ hadith }: HadithCardProps) {
    const { t } = useLanguage();

    return (
        <div className="bg-card-bg border border-card-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 group">
            {/* Category Badge */}
            <div className="flex justify-end mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {t(`category.${hadith.category.toLowerCase()}`)}
                </span>
            </div>

            {/* Arabic Text */}
            <p className="arabic-text text-2xl md:text-3xl text-center leading-loose mb-8 text-foreground group-hover:text-primary transition-colors">
                {hadith.arabic}
            </p>

            {/* Footer (Source & Grade) */}
            <div className="flex items-center justify-between border-t border-card-border pt-4 mt-auto">
                <span className="text-secondary text-sm font-medium bg-secondary/10 px-2 py-0.5 rounded">
                    {hadith.grade}
                </span>
                <span className="text-muted text-sm font-serif italic">
                    {hadith.source}
                </span>
            </div>
        </div>
    );
}
