# MY FINANCE

Premium shaxsiy moliyaviy boshqaruv platformasi. Create React App asosida.

## Ishga tushirish

1. Node.js LTS o‘rnating.
2. Terminalda loyiha papkasiga kiring.
3. Paketlarni o‘rnating:

```bash
npm install
```

4. Development server:

```bash
npm start
```

5. Production build:

```bash
npm run build
```

Brauzerda `http://localhost:3000` ochiladi.

## Funksiyalar

- Login / ro‘yxatdan o‘tish (demo, LocalStorage)
- Daromad va xarajatlar
- Qarzlar: olinadigan va to‘lanadigan
- Maqsadlar va maqsadga pul qo‘shish
- Kunlik va yillik statistik grafiklar
- AI maslahatchi (hozircha lokal demo tahlil)
- Qidiruv, tahrirlash, o‘chirish
- JSON zaxira nusxasi
- Responsive dizayn va dark mode
- LocalStorage orqali sahifa yangilanganda saqlanish

## Muhim eslatma

Ushbu loyiha hozircha bitta brauzer / qurilma uchun frontend prototip. LocalStorage server emas: brauzer ma’lumotlari o‘chirilsa, ma’lumotlar yo‘qoladi. Login/parol frontendda demo ko‘rinishida saqlanadi, shuning uchun haqiqiy maxfiylik yoki bir nechta qurilmada sinxronlashni ta’minlamaydi. Production uchun backend (masalan, Supabase Auth + Database) ulash kerak. Haqiqiy AI javoblari uchun backend orqali AI API integratsiyasi kerak; API kalitini frontendga joylamang.

## Loyiha tuzilishi

```text
my-finance/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── data.js
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md
```
