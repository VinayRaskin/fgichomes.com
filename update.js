const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const map = {
    '1763757013719(1)(1) (1).jpg': 'img-1.jpg',
    'IMG-20250904-WA0016.jpg': 'img-2.jpg',
    'IMG-20250904-WA0017.jpg': 'img-3.jpg',
    'IMG-20250904-WA0028.jpg': 'img-4.jpg',
    'IMG-20250904-WA0032.jpg': 'img-5.jpg',
    'IMG-20250904-WA0037.jpg': 'img-6.jpg',
    'IMG-20250904-WA0039.jpg': 'img-7.jpg',
    'IMG-20250904-WA0042.jpg': 'img-8.jpg',
    'IMG-20250904-WA0059.jpg': 'img-9.jpg',
    'IMG-20250904-WA0070(1).jpg': 'img-10.jpg',
    'IMG-20250904-WA0074.jpg': 'img-11.jpg',
    'IMG-20250904-WA0076.jpg': 'img-12.jpg',
    'IMG-20250904-WA0084.jpg': 'img-13.jpg',
    'IMG-20250904-WA0100.jpg': 'img-14.jpg',
    'IMG-20250904-WA0102.jpg': 'img-15.jpg',
    'IMG-20250904-WA0103.jpg': 'img-16.jpg',
    'IMG-20250904-WA0111.jpg': 'img-17.jpg',
    'IMG-20250904-WA0120.jpg': 'img-18.jpg',
    'IMG-20250904-WA0148.jpg': 'img-19.jpg',
    'WhatsApp Image 2026-03-26 at 1.04.35 AM.jpeg': 'logo.jpeg',
    'hero section background.mp4': 'hero-bg.mp4'
};

for (const [oldName, newName] of Object.entries(map)) {
    html = html.split(oldName).join(newName);
}

fs.writeFileSync('index.html', html);
