const today = new Date();
const locales = [
    'en-u-ca-islamic',
    'en-u-ca-islamic-uma',
    'en-u-ca-islamic-civil',
    'en-u-ca-islamic-tbla',
    'ar-u-ca-islamic',
    'en-IL-u-ca-islamic'
];

locales.forEach(loc => {
    try {
        const formatter = new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', year: 'numeric' });
        console.log(`${loc}: ${formatter.format(today)}`);
    } catch (e) {
        console.log(`${loc}: Error ${e.message}`);
    }
});
