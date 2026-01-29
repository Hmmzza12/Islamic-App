export interface Dhikr {
    id: number;
    arabic: string;
    translation?: string;
    reference?: string;
    count: number;
    reward?: string;
    category: 'Morning' | 'Evening' | 'After Salah' | 'Sleep' | 'Waking Up' | 'Travel' | 'General';
}

export const ADHKAR: Dhikr[] = [
    // --- Waking Up ---
    {
        id: 11,
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        count: 1,
        category: "Waking Up",
        reference: "Bukhari 6312"
    },

    // --- Morning ---
    {
        id: 1,
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        count: 1,
        category: "Morning",
        reference: "Muslim 4:2088"
    },
    {
        id: 2,
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
        count: 1,
        category: "Morning",
        reference: "Tirmidhi 3:142"
    },
    {
        id: 3,
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        count: 100,
        category: "Morning",
        reward: "Forgiven his sins even if they were like the foam of the sea."
    },
    {
        id: 12,
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
        count: 1,
        category: "Morning",
        reference: "Hisn al-Muslim"
    },

    // --- Evening ---
    {
        id: 4,
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
        count: 1,
        category: "Evening",
        reference: "Muslim 4:2088"
    },
    {
        id: 5,
        arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
        count: 1,
        category: "Evening",
        reference: "Tirmidhi 3:142"
    },
    {
        id: 13,
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        count: 3,
        category: "Evening",
        reference: "Muslim 4:2081"
    },

    // --- After Salah ---
    {
        id: 6,
        arabic: "أَسْتَغْفِرُ اللَّهَ",
        count: 3,
        category: "After Salah"
    },
    {
        id: 7,
        arabic: "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ تَبَارَكْتَ يَا ذَا الْجَلاَلِ وَالإِكْرَامِ",
        count: 1,
        category: "After Salah"
    },
    {
        id: 8,
        arabic: "سُبْحَانَ اللَّهِ",
        count: 33,
        category: "After Salah"
    },
    {
        id: 9,
        arabic: "الْحَمْدُ لِلَّهِ",
        count: 33,
        category: "After Salah"
    },
    {
        id: 10,
        arabic: "اللَّهُ أَكْبَرُ",
        count: 33,
        category: "After Salah"
    },
    {
        id: 14,
        arabic: "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        count: 1,
        category: "After Salah"
    },

    // --- Sleep ---
    {
        id: 15,
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        count: 1,
        category: "Sleep",
        reference: "Bukhari 6312"
    },
    {
        id: 16,
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَكَفَانَا وَآوَانَا فَكَمْ مِمَّنْ لاَ كَافِيَ لَهُ وَلاَ مُؤْوِيَ",
        count: 1,
        category: "Sleep",
        reference: "Muslim 2715"
    },
    {
        id: 17,
        arabic: "سُبْحَانَ اللَّهِ (33)، الْحَمْدُ لِلَّهِ (33)، اللَّهُ أَكْبَرُ (34)",
        count: 100, // Total
        category: "Sleep",
        reference: "Bukhari 3113"
    },

    // --- Travel ---
    {
        id: 18,
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ",
        count: 1,
        category: "Travel",
        reference: "Quran 43:13-14"
    },

    // --- General ---
    {
        id: 19,
        arabic: "لاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
        count: 1,
        category: "General",
        reward: "A treasure from the treasures of Paradise"
    },
    {
        id: 20,
        arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
        count: 1,
        category: "General",
        reward: "Two words light on the tongue, heavy in the scale, beloved to the Most Merciful"
    }
];

export const ADHKAR_CATEGORIES = ['All', 'Morning', 'Evening', 'After Salah', 'Sleep', 'Waking Up', 'Travel', 'General'];
