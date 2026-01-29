const today = new Date();
const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

const hijriParts = hijriFormatter.formatToParts(today);
console.log('Parts:', JSON.stringify(hijriParts, null, 2));

const currentHijriDay = hijriParts.find(p => p.type === 'day')?.value;
const currentHijriMonth = hijriParts.find(p => p.type === 'month')?.value;
const currentHijriYear = hijriParts.find(p => p.type === 'year')?.value;

console.log('Day:', currentHijriDay);
console.log('Month:', currentHijriMonth);
console.log('Year:', currentHijriYear);

const arFormatter = new Intl.DateTimeFormat('ar-u-ca-islamic-uma', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});
console.log('Arabic:', arFormatter.format(today));
