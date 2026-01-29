export interface Hadith {
    id: number;
    arabic: string;
    source: string;
    category: 'Iman' | 'Salah' | 'Akhlaq' | 'Dua' | 'Quran' | 'General' | 'Charity' | 'Knowledge' | 'Patience';
    grade?: 'Sahih' | 'Hasan';
}

export const HADITHS: Hadith[] = [
    // Iman (Faith)
    {
        id: 1,
        arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
        source: "Sahih al-Bukhari 1",
        category: "Iman",
        grade: "Sahih"
    },
    {
        id: 3,
        arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        source: "Sahih al-Bukhari 13",
        category: "Iman",
        grade: "Sahih"
    },
    {
        id: 8,
        arabic: "الطُّهُورُ شَطْرُ الإِيمَانِ",
        source: "Sahih Muslim 223",
        category: "Iman",
        grade: "Sahih"
    },
    {
        id: 11,
        arabic: "ثَلاثٌ مَنْ كُنَّ فِيهِ وَجَدَ حَلاوَةَ الإِيمَانِ: أَنْ يَكُونَ اللَّهُ وَرَسُولُهُ أَحَبَّ إِلَيْهِ مِمَّا سِوَاهُمَا",
        source: "Sahih al-Bukhari 16",
        category: "Iman",
        grade: "Sahih"
    },

    // Akhlaq (Character)
    {
        id: 2,
        arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        source: "Sahih al-Bukhari 6018",
        category: "Akhlaq",
        grade: "Sahih"
    },
    {
        id: 7,
        arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
        source: "Jami` at-Tirmidhi 1956",
        category: "Akhlaq",
        grade: "Sahih"
    },
    {
        id: 12,
        arabic: "إِنَّمَا بُعِثْتُ لأُتَمِّمَ مَكَارِمَ الأَخْلاقِ",
        source: "Al-Bayhaqi 21301",
        category: "Akhlaq",
        grade: "Sahih"
    },
    {
        id: 13,
        arabic: "لَيْسَ الْمُؤْمِنُ بِالطَّعَّانِ وَلاَ اللَّعَّانِ وَلاَ الْفَاحِشِ وَلاَ الْبَذِيءِ",
        source: "Jami` at-Tirmidhi 1977",
        category: "Akhlaq",
        grade: "Sahih"
    },

    // Salah (Prayer)
    {
        id: 4,
        arabic: "صَلاَةُ الْجَمَاعَةِ تَفْضُلُ صَلاَةَ الْفَذِّ بِسَبْعٍ وَعِشْرِينَ دَرَجَةً",
        source: "Sahih Muslim 650",
        category: "Salah",
        grade: "Sahih"
    },
    {
        id: 9,
        arabic: "مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ",
        source: "Sahih al-Bukhari 574",
        category: "Salah",
        grade: "Sahih"
    },
    {
        id: 14,
        arabic: "أَوَّلُ مَا يُحَاسَبُ بِهِ الْعَبْدُ يَوْمَ الْقِيَامَةِ الصَّلاَةُ",
        source: "Sunan an-Nasa'i 465",
        category: "Salah",
        grade: "Sahih"
    },

    // Quran
    {
        id: 5,
        arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
        source: "Sahih al-Bukhari 5027",
        category: "Quran",
        grade: "Sahih"
    },
    {
        id: 15,
        arabic: "الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ",
        source: "Sahih Muslim 798",
        category: "Quran",
        grade: "Sahih"
    },

    // Dua
    {
        id: 6,
        arabic: "الدُّعَاءُ هُوَ الْعِبَادَةُ",
        source: "Sunan Abi Dawud 1479",
        category: "Dua",
        grade: "Sahih"
    },
    {
        id: 16,
        arabic: "يَسْتَجَابُ لأَحَدِكُمْ مَا لَمْ يَعْجَلْ",
        source: "Sahih al-Bukhari 6340",
        category: "Dua",
        grade: "Sahih"
    },

    // Charity (New)
    {
        id: 17,
        arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
        source: "Sahih Muslim 2588",
        category: "Charity",
        grade: "Sahih"
    },
    {
        id: 18,
        arabic: "اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ",
        source: "Sahih al-Bukhari 1417",
        category: "Charity",
        grade: "Sahih"
    },

    // Knowledge (New)
    {
        id: 19,
        arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
        source: "Sahih Muslim 2699",
        category: "Knowledge",
        grade: "Sahih"
    },
    {
        id: 20,
        arabic: "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
        source: "Sahih al-Bukhari 71",
        category: "Knowledge",
        grade: "Sahih"
    },

    // Patience (New)
    {
        id: 21,
        arabic: "وَمَنْ يَتَصَبَّرْ يُصَبِّرْهُ اللَّهُ، وَمَا أُعْطِيَ أَحَدٌ عَطَاءً خَيْرًا وَأَوْسَعَ مِنَ الصَّبْرِ",
        source: "Sahih al-Bukhari 1469",
        category: "Patience",
        grade: "Sahih"
    },
    {
        id: 22,
        arabic: "عَجَبًا لأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ",
        source: "Sahih Muslim 2999",
        category: "Patience",
        grade: "Sahih"
    }
];

export const HADITH_CATEGORIES = ['All', 'Iman', 'Salah', 'Akhlaq', 'Dua', 'Quran', 'Charity', 'Knowledge', 'Patience'];
