export interface DestinationDetail {
  id: number;
  slug: string;
  name: string;
  category: string;
  location: string;
  address: string;
  image: string;
  hoverImage?: string;
  gallery: string[];
  description: string;
  longDescription: string;
  highlights: string[];
  priceRange: string;
  openHours: string;
  coords: { lat: number; lng: number };
  tips: string[];
}

const destinations: DestinationDetail[] = [
  // ==================== KOPI ====================
  {
    id: 1,
    slug: 'tugo-coffee',
    name: 'Tugo Coffee',
    category: 'Kopi',
    location: 'Jakarta',
    address: 'Jl. Wahid Hasyim No. 4, Kebon Sirih, Jakarta Pusat',
    image: '/Destination/Cafe, Bar, and Eatery/Tugo Coffee.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Tugo Coffee 2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Tugo Coffee.jpg',
      '/Destination/Cafe, Bar, and Eatery/Tugo Coffee 2.jpg',
    ],
    description:
      'Single origin yang dikerjain serius, buat lo yang udah beyond kopi sachet',
    longDescription:
      'Tugo Coffee tuh bukan sekadar tempat ngopi biasa. Ini surganya lo yang udah ngerti bedanya single origin Aceh sama Flores cuma dari aroma doang. Beans-nya dipilih langsung, roasting-nya on point, dan barista-nya beneran ngerti apa yang mereka bikin — bukan cuma asal tuang. Tempatnya minimalis tapi warm, cocok banget buat lo yang butuh fokus atau sekadar mau nge-reset otak dari kegilaan Jakarta. Serius, kalau lo masih ngandalin kopi sachet, cobain ke sini sekali aja. Dijamin gak balik lagi ke instant.',
    highlights: ['Single origin pilihan', 'Manual brew', 'Suasana minimalis', 'Barista yang passionate'],
    priceRange: 'Rp 30k - 80k',
    openHours: '08:00 - 22:00',
    coords: { lat: -6.1862, lng: 106.8228 },
    tips: [
      'Coba pour over-nya, biar lo ngerasain beda tiap beans',
      'Dateng pagi buat dapet suasana paling tenang',
      'Jangan lupa tanya barista recommended beans hari itu',
    ],
  },
  {
    id: 2,
    slug: 'kurasu-kissaten',
    name: 'Kurasu Kissaten',
    category: 'Kopi',
    location: 'Senopati',
    address: 'Jl. Senopati No. 64, Kebayoran Baru, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Kurasu.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Kurasu 2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Kurasu.jpg',
      '/Destination/Cafe, Bar, and Eatery/Kurasu 2.jpg',
      '/Destination/Cafe, Bar, and Eatery/Kurasu 3.jpg',
      '/Destination/Cafe, Bar, and Eatery/Kurasu 4.jpg',
    ],
    description:
      'Straight from Kyoto. Precision coffee yang bikin lo ngerti kenapa orang rela bayar mahal',
    longDescription:
      'Kurasu tuh aslinya brand kopi dari Kyoto, Jepang — dan sekarang ada di Senopati. Konsepnya kissaten, alias coffee house ala Jepang yang vibes-nya tenang dan presisi banget. Setiap gelas kopi di sini dikerjain kayak seni: temperatur, waktu ekstraksi, rasio air, semuanya dihitung. Lo gak cuma minum kopi, lo ngalamin ritualnya. Interior-nya clean banget, wood tones yang calming, dan gak rame — perfect buat lo yang pengen escape sebentar dari chaos Jakarta. Worth every rupiah.',
    highlights: ['Japanese coffee culture', 'Kissaten vibes', 'Precision brewing', 'Imported beans'],
    priceRange: 'Rp 50k - 100k',
    openHours: '09:00 - 21:00',
    coords: { lat: -6.2273, lng: 106.8064 },
    tips: [
      'Order hot drip coffee buat experience paling authentic',
      'Tempatnya gak gede, dateng pas weekday biar gak ngantri',
      'Spot foto paling cakep di meja dekat jendela',
    ],
  },
  {
    id: 3,
    slug: 'masagi-coffee',
    name: 'Masagi Coffee',
    category: 'Kopi',
    location: 'BSD',
    address: 'The Breeze BSD City, Tangerang Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Masagi Coffee.webp',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Masagi Coffee.webp',
    ],
    description: 'Ngopi di tengah taman, gak ada drama, chill total',
    longDescription:
      'Masagi Coffee itu definisi ngopi tanpa drama. Lokasinya di area BSD yang ijo dan adem, bikin lo lupa kalau lagi di Jabodetabek. Kopi-nya solid, makanannya enak, dan yang paling penting — suasananya beneran chill. Gak ada music terlalu kenceng, gak ada crowd rame yang bikin lo gak bisa mikir. Cocok banget buat lo yang pengen me-time produktif atau sekadar duduk-duduk sambil baca buku. Kalau Jakarta udah terlalu berisik, ini tempat recharge lo.',
    highlights: ['Outdoor seating', 'Garden vibes', 'Specialty coffee', 'Pet-friendly'],
    priceRange: 'Rp 30k - 70k',
    openHours: '08:00 - 22:00',
    coords: { lat: -6.3017, lng: 106.6537 },
    tips: [
      'Best time dateng sore menjelang sunset',
      'Outdoor area-nya paling enak, apalagi pas cuaca adem',
      'Bawa laptop kalau mau WFC, WiFi-nya stabil',
    ],
  },
  {
    id: 4,
    slug: 'toko-kopi-maru',
    name: 'Toko Kopi Maru',
    category: 'Kopi',
    location: 'Fatmawati',
    address: 'Jl. RS. Fatmawati No. 9, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru 2.jpeg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru 2.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru 3.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru 4.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Toko Kopi Maru 5.jpeg',
    ],
    description:
      'Gula aren, susu, kopi. Formula sederhana yang bikin lo balik lagi dan lagi',
    longDescription:
      'Toko Kopi Maru punya formula yang simpel: kopi enak, harga wajar, tempat nyaman. Gak perlu pretentious, gak perlu overcomplicated. Es kopi susu gula aren di sini tuh benchmark-nya Jakarta — creamy, balance, dan gak pernah gagal. Interior-nya vintage tapi gak norak, ada nuansa Jepang yang subtle. Tempatnya juga lumayan lega buat ukuran coffee shop, jadi lo gak perlu rebutan kursi. Kalau lo nyari daily coffee spot yang reliabel, ini jawabannya.',
    highlights: ['Signature es kopi susu', 'Vibes vintage-Japanese', 'Harga terjangkau', 'Tempat lega'],
    priceRange: 'Rp 30k - 70k',
    openHours: '07:00 - 22:00',
    coords: { lat: -6.2925, lng: 106.7975 },
    tips: [
      'Es Kopi Susu Gula Aren wajib dicoba, ini menu andalan',
      'Kalau suka matcha, punya mereka juga worth it',
      'Parkiran agak tricky, mending naik ojol',
    ],
  },
  {
    id: 5,
    slug: 'dudung-maman-kopi',
    name: 'Dudung Maman Kopi',
    category: 'Kopi',
    location: 'Jakarta',
    address: 'Jl. Cipete Raya, Cipete Selatan, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Dudung Maman Kopi.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Dudung Maman Kopi 2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Dudung Maman Kopi.jpg',
      '/Destination/Cafe, Bar, and Eatery/Dudung Maman Kopi 2.jpg',
    ],
    description:
      'Harga warung tapi kualitasnya specialty. Temuan terbaik yang lo mau flex ke temen',
    longDescription:
      'Dudung Maman Kopi itu hidden gem yang bikin lo ngerasa pinter banget karena nemu tempat ini. Dari luar keliatan kayak warung kopi biasa, tapi begitu lo nyicip — anjir, ini specialty level. Beans-nya dipilih serius, brewing-nya rapi, dan harganya? Bro, di bawah 50k lo udah dapet kopi yang di tempat lain bisa 80k. Owner-nya passionate banget soal kopi dan lo bisa ngobrol panjang soal beans kalau lagi santai. Tempat yang lo pengen kasih tau semua temen lo, tapi juga pengen keep secret.',
    highlights: ['Harga super terjangkau', 'Kualitas specialty', 'Owner yang passionate', 'Local gem'],
    priceRange: 'Rp 20k - 50k',
    openHours: '08:00 - 21:00',
    coords: { lat: -6.2646, lng: 106.7964 },
    tips: [
      'Chat sama owner soal beans, orangnya super friendly',
      'Cobain kopi hitam mereka buat ngerasain kualitas beans-nya',
      'Tempat kecil, dateng pas gak rush hour',
    ],
  },
  {
    id: 6,
    slug: 'kopi-kalyan',
    name: 'Kopi Kalyan',
    category: 'Kopi',
    location: 'Cikajang',
    address: 'Jl. Cikajang No. 58, Kebayoran Baru, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan 2.jpeg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan 2.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan 3.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Kopi Kalyan 4.jpeg',
    ],
    description:
      'Luas, adem, WiFi lancar. Surga buat lo yang kerja remote tapi butuh suasana baru',
    longDescription:
      'Kopi Kalyan itu tempat yang lo datangin buat kerja, tapi ujung-ujungnya betah sampai tutup. Tempatnya luasss — ada indoor, outdoor, dan seating area yang bervariasi. WiFi-nya kenceng, colokan di mana-mana, dan kopi-nya konsisten enak. Ini tipe coffee shop yang ngerti kalau orang Jakarta butuh tempat ketiga selain rumah dan kantor. Food menu-nya juga lengkap, jadi lo gak perlu keluar buat makan. Satu tempat buat semua kebutuhan: kerja, ngobrol, date, atau sekadar healing sendirian.',
    highlights: ['Tempat super luas', 'WiFi kenceng', 'Colokan banyak', 'Menu lengkap'],
    priceRange: 'Rp 40k - 90k',
    openHours: '07:00 - 23:00',
    coords: { lat: -6.2387, lng: 106.7964 },
    tips: [
      'Dateng weekday pagi buat dapet meja terbaik',
      'Area belakang yang outdoor paling enak buat kerja',
      'Food menu-nya surprisingly enak, cobain pasta-nya',
    ],
  },
  {
    id: 7,
    slug: 'ngoepi',
    name: 'Ngoepi',
    category: 'Kopi',
    location: 'Jakarta',
    address: 'Jl. Benda Raya No. 60, Kemang, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Ngoepi.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Ngoepi 2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Ngoepi.jpg',
      '/Destination/Cafe, Bar, and Eatery/Ngoepi 2.jpg',
    ],
    description:
      'Santai, murah, dan enak. Trifecta langka yang jarang banget lo temuin sekaligus',
    longDescription:
      'Ngoepi itu bukti kalau tempat ngopi enak gak harus mahal dan pretentious. Lokasinya homey, staff-nya ramah, dan kopi-nya jujur enak. Gak ada gimmick, gak ada overpriced menu — just good coffee at a fair price. Lo bakal ngerasa kayak ngopi di rumah temen yang kebetulan jago bikin kopi. Tempat yang bikin lo balik lagi bukan karena hype, tapi karena genuine quality. Kalau lo capek sama coffee shop yang vibes-nya terlalu try hard, Ngoepi tuh antidote-nya.',
    highlights: ['Harga bersahabat', 'Suasana homey', 'No-frills quality', 'Staff ramah'],
    priceRange: 'Rp 20k - 50k',
    openHours: '08:00 - 21:00',
    coords: { lat: -6.2614, lng: 106.8133 },
    tips: [
      'Kopi susu mereka juara, gak perlu mikir panjang',
      'Dateng sore buat suasana paling enak',
      'Gak terlalu rame, cocok buat ngobrol santai',
    ],
  },

  // ==================== CAFE ====================
  {
    id: 8,
    slug: 'homs-jakarta',
    name: 'HOMS Jakarta',
    category: 'Cafe',
    location: 'Jakarta',
    address: 'Jl. Gunawarman No. 44, Kebayoran Baru, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/HOMS.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/HOMS 2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/HOMS.jpg',
      '/Destination/Cafe, Bar, and Eatery/HOMS 2.jpg',
      '/Destination/Cafe, Bar, and Eatery/HOMS 3.jpg',
    ],
    description:
      'Vibes rumah orang kaya yang cozy banget, WiFi-nya kenceng, cocok WFC seharian',
    longDescription:
      'HOMS Jakarta itu literally "Home" — tapi versi upgrade-nya. Konsepnya emang dibikin kayak rumah: ada sofa empuk, lampu warm, corner yang cozy, dan setiap ruangannya punya character sendiri. Lo ngerasa kayak nongkrong di rumah temen kaya lo yang taste-nya impeccable. WiFi-nya kenceng banget, jadi WFC di sini tuh productive abis. Menu-nya juga gak main-main, dari brunch set sampai pastry yang bikin lo lupa diet. Tempat yang ngebuat lo betah seharian tanpa merasa bersalah.',
    highlights: ['Konsep homey', 'WiFi super kenceng', 'Brunch menu killer', 'Interior aesthetic'],
    priceRange: 'Rp 50k - 150k',
    openHours: '08:00 - 22:00',
    coords: { lat: -6.2413, lng: 106.7893 },
    tips: [
      'Brunch set-nya worth it banget buat weekend',
      'Lantai 2 lebih tenang buat kerja',
      'Reserve dulu kalau dateng weekend, suka penuh',
    ],
  },
  {
    id: 9,
    slug: 'smiljan-makarya',
    name: 'Smiljan Makarya',
    category: 'Cafe',
    location: 'Jakarta Selatan',
    address: 'Jl. Prapanca Raya No. 12, Kebayoran Baru, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 2.jpeg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 2.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 3.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 4.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 5.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 6.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Smiljan Makarya 7.jpeg',
    ],
    description:
      'Gallery-cafe fusion yang vibe-nya benar-benar beda dari tempat ngopi biasa',
    longDescription:
      'Smiljan Makarya itu bukan cuma cafe, ini gallery yang kebetulan jual kopi. Dari lo masuk, langsung kerasa: ini tempat orang kreatif nongkrong. Interior-nya industrial tapi warm, ada karya seni di mana-mana, dan setiap corner-nya photogenic abis. Kopi-nya dikerjain serius, gak cuma pelengkap. Dan suasananya? Pure inspiration. Lo dateng buat ngopi, pulang-pulang punya ide baru. Cocok banget buat creative date atau brainstorming session yang butuh spark. Ini tipe tempat yang bikin lo ngerasa pinter tanpa harus effort.',
    highlights: ['Gallery + cafe fusion', 'Industrial aesthetic', 'Karya seni lokal', 'Kopi serius'],
    priceRange: 'Rp 50k - 100k',
    openHours: '09:00 - 22:00',
    coords: { lat: -6.2441, lng: 106.7952 },
    tips: [
      'Explore setiap ruangan, masing-masing punya vibe beda',
      'Perfect buat creative date yang gak basic',
      'Foto di spot karya seni buat konten yang beda',
    ],
  },
  {
    id: 10,
    slug: 'row-9-cafe',
    name: 'Row 9 Cafe',
    category: 'Cafe',
    location: 'Blok M',
    address: 'Jl. Melawai, Blok M, Kebayoran Baru, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/row9.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/row9.jpg',
    ],
    description:
      'Outdoor vibes di Blok M, cocok banget buat sore-sorean sambil nunggu macet kelar',
    longDescription:
      'Row 9 Cafe tuh ngasih lo alasan buat suka sama Blok M lagi. Outdoor seating-nya cozy, treelined, dan bikin lo lupa kalau lagi di tengah kota. Ini bukan cafe yang fancy atau mahal, tapi justru itu yang bikin enak — unpretentious dan genuine. Menu-nya simple tapi solid, dan suasana sore di sini tuh golden hour vibes yang lo gak dapet di cafe indoor. Cocok buat hangout casual, ngobrol santai, atau sekadar duduk sambil people-watching. Blok M starter pack yang wajib lo cobain.',
    highlights: ['Outdoor seating', 'Sore vibes terbaik', 'Harga ramah kantong', 'Blok M area'],
    priceRange: 'Rp 50k - 150k',
    openHours: '10:00 - 23:00',
    coords: { lat: -6.2445, lng: 106.7983 },
    tips: [
      'Dateng jam 4-5 sore buat golden hour yang perfect',
      'Outdoor seating > indoor, always',
      'Gampang akses dari MRT Blok M',
    ],
  },
  {
    id: 11,
    slug: 'salty-salty-pik',
    name: 'Salty Salty PIK',
    category: 'Cafe',
    location: 'PIK',
    address: 'PIK Avenue, Pantai Indah Kapuk, Jakarta Utara',
    image: '/Destination/Cafe, Bar, and Eatery/Salty Salty.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Salty Salty 2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Salty Salty.jpg',
      '/Destination/Cafe, Bar, and Eatery/Salty Salty 2.jpg',
      '/Destination/Cafe, Bar, and Eatery/Salty Salty 3.jpg',
      '/Destination/Cafe, Bar, and Eatery/Salty Salty 4.jpg',
      '/Destination/Cafe, Bar, and Eatery/Salty Salty 5.jpg',
    ],
    description:
      'Brunch yang instagramable parah tapi rasanya beneran enak, bukan cuma cantik doang',
    longDescription:
      'Salty Salty itu tempat yang bikin lo percaya bahwa makanan cantik juga bisa enak. Brunch set-nya instagramable parah — warna-warnanya pop, plating-nya rapi, dan rasanya genuinely delicious. Interior-nya bright dan airy, perfect buat lo yang nyari tempat brunch yang gak dark dan moody. Lokasinya di PIK, jadi vibes-nya emang lebih clean dan modern. Ini tipe tempat yang lo bawa ke sini buat impress date atau sekadar treat yourself pas weekend. Worth the drive ke PIK, trust.',
    highlights: ['Brunch spot terbaik', 'Instagramable abis', 'Bright & airy interior', 'Menu variatif'],
    priceRange: 'Rp 50k - 150k',
    openHours: '08:00 - 22:00',
    coords: { lat: -6.1058, lng: 106.7369 },
    tips: [
      'Weekend brunch set-nya wajib dicoba',
      'Dateng pas baru buka buat cahaya natural terbaik',
      'Parkir di PIK Avenue, tinggal jalan',
    ],
  },
  {
    id: 12,
    slug: 'sarang-semut',
    name: 'Sarang Semut',
    category: 'Cafe',
    location: 'Cikini',
    address: 'Jl. Cikini Raya, Menteng, Jakarta Pusat',
    image: '/Destination/Cafe, Bar, and Eatery/sarang-semut.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/sarang-semut2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/sarang-semut.jpg',
      '/Destination/Cafe, Bar, and Eatery/sarang-semut2.jpg',
    ],
    description:
      'Interior gua batu yang literally unik parah, setiap sudut foto lo bakal auto keren',
    longDescription:
      'Sarang Semut itu tempat yang bikin lo ngerasa lagi di gua batu natural, padahal lo lagi di Cikini. Tekstur dinding-nya unik banget — organik, cave-like, dan bikin setiap sudut jadi photo spot yang sick. Ini bukan cuma gimmick, suasananya beneran bikin lo ngerasa di tempat yang completely different dari Jakarta. Kopi dan makanannya decent, tapi let\'s be real — lo dateng ke sini buat experience-nya. Perfect buat creative date atau hangout yang pengen beda dari kebiasaan ke mall. Tempat yang bikin stories lo naik level.',
    highlights: ['Interior gua batu', 'Setiap sudut photogenic', 'Experience unik', 'Area Cikini'],
    priceRange: 'Rp 50k - 100k',
    openHours: '10:00 - 22:00',
    coords: { lat: -6.1888, lng: 106.8426 },
    tips: [
      'Charge hp sebelum dateng, lo bakal foto banyak banget',
      'Sore hari lighting-nya paling dramatic',
      'Cobain duduk di spot paling dalam buat vibes gua yang max',
    ],
  },

  // ==================== BAR ====================
  {
    id: 13,
    slug: 'the-platform-bar',
    name: 'The Platform Bar',
    category: 'Bar',
    location: 'Jakarta',
    address: 'Bundaran HI area, Jakarta Pusat',
    image: '/Destination/Cafe, Bar, and Eatery/The Platform Jakarta.webp',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/The Platform Jakarta.webp',
    ],
    description:
      'Cocktail sambil ngeliatin Bundaran HI dari atas? Serius, ini nyata dan lo bisa',
    longDescription:
      'The Platform Bar ngasih lo pengalaman yang literally elevated — duduk di rooftop sambil nyeruput cocktail dengan view Bundaran HI di bawah. Ini bukan tempat buat lo yang cuma pengen mabuk murah. Ini tempat buat momen: celebration, date malam, atau sekadar nge-treat diri sendiri karena lo deserve it. Cocktail-nya crafted dengan serius, bartender-nya tau apa yang mereka bikin, dan ambience-nya premium tanpa bikin lo ngerasa out of place. Jakarta dari atas tuh hits different, dan The Platform bisa kasih itu ke lo.',
    highlights: ['Rooftop bar', 'View Bundaran HI', 'Craft cocktails', 'Premium ambience'],
    priceRange: 'Rp 100k - 300k',
    openHours: '17:00 - 01:00',
    coords: { lat: -6.1950, lng: 106.8227 },
    tips: [
      'Dateng sebelum sunset buat dapet golden hour views',
      'Smart casual dress code, jangan sandal jepit ya',
      'Mending reserve dulu, terutama weekend',
    ],
  },
  {
    id: 14,
    slug: 'st-regis-bar',
    name: 'St. Regis Bar',
    category: 'Bar',
    location: 'Kuningan',
    address: 'The St. Regis Jakarta, Jl. HR Rasuna Said, Kuningan, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/St Regis Jakarta Bar.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/St Regis Jakarta Bar.jpg',
    ],
    description:
      'Jazz live, cocktail premium, WiFi kenceng. New York vibe tapi koordinatnya Kuningan',
    longDescription:
      'St. Regis Bar itu kayak teleportasi ke New York lounge tanpa harus 20 jam di pesawat. Jazz live-nya smooth, cocktail-nya world-class, dan interiornya timeless elegant. Ini tempat yang bikin lo ngerasa kayak main character di film — semua orang keliatan stylish, lighting-nya perfect, dan setiap sip cocktail ngerasa curated. Buat lo yang pengen night out yang sophisticated tanpa kejauhan, St. Regis di Kuningan bisa deliver itu. Special occasion territory, tapi juga fine buat random Tuesday kalau lo lagi pengen feel fancy.',
    highlights: ['Live jazz', 'World-class cocktails', 'Elegant interior', 'Hotel bar premium'],
    priceRange: 'Rp 200k++',
    openHours: '17:00 - 00:00',
    coords: { lat: -6.2180, lng: 106.8344 },
    tips: [
      'Dateng pas ada live jazz, cek schedule dulu',
      'Dress up, ini beneran upscale spot',
      'Signature cocktail mereka harus dicoba',
    ],
  },
  {
    id: 15,
    slug: 'costess-bar',
    name: 'Costess Bar',
    category: 'Bar',
    location: 'Kuningan',
    address: 'Kuningan area, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Costess Cafe Jakarta.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Costess Cafe Jakarta.jpg',
    ],
    description:
      'View gedung kaca Kuningan dari atas sambil pegang cocktail. Gak ada yang lebih Jakarta dari ini',
    longDescription:
      'Costess Bar itu quintessential Jakarta nightlife. Lo duduk di rooftop, dikelilingi gedung-gedung kaca Kuningan yang glowing, cocktail di tangan, dan vibes yang bilang "gue made it." Ini bukan bar yang berisik dan penuh — ini lebih ke tempat buat enjoy the view sambil ngobrol meaningful (atau gak meaningful, terserah lo). Cocktail menu-nya curated, ada classic dan ada yang experimental. Kalau lo pengen ngerasain Jakarta kayak scene di film, Costess bisa kasih itu. Urban sophistication at its finest.',
    highlights: ['Rooftop views', 'Skyline Kuningan', 'Curated cocktails', 'Intimate vibes'],
    priceRange: 'Rp 150k - 300k',
    openHours: '17:00 - 01:00',
    coords: { lat: -6.2221, lng: 106.8321 },
    tips: [
      'Outdoor seating buat view terbaik',
      'Sunset time adalah prime time',
      'Kalau rame, bar seat juga asik kok',
    ],
  },
  {
    id: 16,
    slug: 'billys-block',
    name: "Billy's Block",
    category: 'Bar',
    location: 'Jakarta',
    address: 'Kemang area, Jakarta Selatan',
    image: "/Destination/Cafe, Bar, and Eatery/Billy's Block.jpeg",
    hoverImage: "/Destination/Cafe, Bar, and Eatery/Billy's Block 2.jpeg",
    gallery: [
      "/Destination/Cafe, Bar, and Eatery/Billy's Block.jpeg",
      "/Destination/Cafe, Bar, and Eatery/Billy's Block 2.jpeg",
      "/Destination/Cafe, Bar, and Eatery/Billy's Block 3.jpeg",
      "/Destination/Cafe, Bar, and Eatery/Billy's Block 4.jpeg",
      "/Destination/Cafe, Bar, and Eatery/Billy's Block 5.jpeg",
      "/Destination/Cafe, Bar, and Eatery/Billy's Block 6.jpeg",
      "/Destination/Cafe, Bar, and Eatery/Billy's Block 7.jpeg",
    ],
    description:
      'Live music, crowd asik, vibes naik terus tiap malam. Weekend lo harus di sini',
    longDescription:
      'Billy\'s Block itu tempat yang energi-nya literally contagious. Dari lo masuk, live music-nya langsung hit, crowd-nya asik, dan vibes-nya naik terus sampai tutup. Ini bukan bar yang lo datangin buat duduk diam — ini tempat lo datangin buat bener-bener have fun. Bir-nya dingin, musik-nya on point, dan setiap malem punya vibe yang beda. Friday night di sini itu Jakarta experience yang wajib lo punya. Kalau lo tipe orang yang suka tempat rame tapi gak chaotic, Billy\'s Block nailed that balance.',
    highlights: ['Live music setiap malam', 'Crowd yang asik', 'Craft beer selection', 'Weekend vibes'],
    priceRange: 'Rp 50k - 150k',
    openHours: '16:00 - 02:00',
    coords: { lat: -6.2610, lng: 106.8130 },
    tips: [
      'Friday & Saturday night paling rame dan paling seru',
      'Dateng agak awal buat dapet tempat duduk',
      'Cobain craft beer lokal mereka',
    ],
  },
  {
    id: 17,
    slug: 'bossanova',
    name: 'Bossanova',
    category: 'Bar',
    location: 'Jakarta',
    address: 'Gunawarman area, Kebayoran Baru, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Bossanova.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Bossanova 2.jpeg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Bossanova.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Bossanova 2.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Bossanova 3.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Bossanova 4.jpeg',
      '/Destination/Cafe, Bar, and Eatery/Bossanova 5.jpeg',
    ],
    description:
      'Retro yang gak dipaksain, malah bikin lo pengen duduk lama-lama dan gak mau pulang',
    longDescription:
      'Bossanova itu retro done right. Interior-nya vintage tanpa ngerasa norak, musik-nya easy listening yang bikin lo mellow, dan cocktail-nya solid. Ini tipe bar yang lo datangin bukan buat party hard, tapi buat enjoy the night slowly. Duduk, ngobrol, sip cocktail, repeat. Suasananya intimate dan warm, perfect buat date atau catch-up sama temen lama. Gak rame overwhelmingly, gak sepi awkwardly — just right. Kalau lo capek sama bar yang terlalu loud, Bossanova tuh oasis-nya. Lo bakal betah sampai last call.',
    highlights: ['Retro vibes authentic', 'Intimate atmosphere', 'Classic cocktails', 'Easy listening music'],
    priceRange: 'Rp 50k - 150k',
    openHours: '17:00 - 01:00',
    coords: { lat: -6.2413, lng: 106.7895 },
    tips: [
      'Perfect buat date night yang gak mau rame',
      'Classic cocktails mereka on point',
      'Weekday night lebih intimate dan enak',
    ],
  },
  {
    id: 18,
    slug: 'tsuki-at-the-alley',
    name: 'Tsuki at the Alley',
    category: 'Bar',
    location: 'Kemang',
    address: 'Gang kecil, Kemang area, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley 2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley.jpg',
      '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley 2.jpg',
      '/Destination/Cafe, Bar, and Eatery/Tsuki at the Alley 3.jpg',
    ],
    description:
      'Gang tersembunyi dengan nuansa malam Tokyo. Lo harus nemu sendiri buat ngerasainnya',
    longDescription:
      'Tsuki at the Alley itu hidden bar yang literally hidden — lo harus nyari gang kecilnya di area Kemang. Tapi begitu lo nemu dan masuk, bro, lo kayak teleportasi ke izakaya di Tokyo. Lighting-nya dim tapi warm, interiornya compact dan cozy, dan vibes-nya intimate banget. Ini tipe tempat yang lo share cuma ke inner circle lo. Cocktail-nya Japanese-inspired, ada sake selection yang solid, dan makanan kecilnya perfect buat accompaniment. Kalau lo suka speakeasy vibes tapi dengan twist Jepang, ini jawabannya.',
    highlights: ['Hidden bar concept', 'Japanese vibes', 'Speakeasy-style', 'Sake selection'],
    priceRange: 'Rp 50k - 100k',
    openHours: '18:00 - 01:00',
    coords: { lat: -6.2613, lng: 106.8108 },
    tips: [
      'Agak susah nemunya, tapi that\'s the point',
      'Sake cocktail mereka wajib dicoba',
      'Tempat kecil, dateng early buat seat',
    ],
  },

  // ==================== RESTO ====================
  {
    id: 19,
    slug: 'waroeng-roekoen',
    name: 'Waroeng Roekoen',
    category: 'Resto',
    location: 'Jakarta',
    address: 'Jl. Tebet Raya, Tebet, Jakarta Selatan',
    image: '/Destination/Cafe, Bar, and Eatery/waroeng roekoen.jpg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/waroeng roekoen 2.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/waroeng roekoen.jpg',
      '/Destination/Cafe, Bar, and Eatery/waroeng roekoen 2.jpg',
      '/Destination/Cafe, Bar, and Eatery/waroeng roekoen 3.jpg',
      '/Destination/Cafe, Bar, and Eatery/waroeng roekoen 4.jpg',
    ],
    description:
      'Masakan rumahan yang bikin lo makan banyak tanpa drama dan tanpa kantong jebol',
    longDescription:
      'Waroeng Roekoen itu comfort food dalam bentuk restoran. Masakan rumahan Indonesia yang rasanya kayak masakan nyokap — tapi versi yang udah refined. Nasi, lauk, sambal, sayur — semua staples yang lo butuhin setelah hari yang panjang. Tempatnya homey, outdoor seating yang adem, dan harganya gak bikin lo nangis. Ini bukan tempat buat fine dining atau showing off — ini tempat lo datangin karena lo lapar dan pengen makan yang beneran bikin kenyang dan happy. Simple pleasures, done perfectly.',
    highlights: ['Masakan rumahan', 'Outdoor seating', 'Harga bersahabat', 'Porsi kenyang'],
    priceRange: 'Rp 50k - 150k',
    openHours: '11:00 - 22:00',
    coords: { lat: -6.2273, lng: 106.8529 },
    tips: [
      'Jam makan siang agak rame, dateng lebih awal',
      'Sambal-nya harus diminta extra',
      'Es tehnya gratis refill — legend',
    ],
  },
  {
    id: 20,
    slug: 'the-cafe-hotel-mulia',
    name: 'The Cafe Hotel Mulia',
    category: 'Resto',
    location: 'Senayan',
    address: 'Hotel Mulia Senayan, Jl. Asia Afrika, Jakarta Pusat',
    image: '/Destination/Cafe, Bar, and Eatery/The Cafe Hotel Mulia.jpg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/The Cafe Hotel Mulia.jpg',
    ],
    description:
      'Fine dining level dewa di jantung Senayan. Kalau mau impress seseorang, ini tempatnya',
    longDescription:
      'The Cafe di Hotel Mulia itu playfield-nya fine dining Jakarta. Buffet-nya legendary — dari sushi fresh sampai dessert yang bikin lo pengen nangis bahagia, semua ada dan semua premium. Interior-nya grand tanpa berlebihan, service-nya impeccable, dan experience-nya bikin lo ngerasa kayak royalty. Ini tempat buat special occasions: anniversary, birthday, atau momen "gue mau treat diri sendiri dengan level tertinggi." Harganya? Premium. But you get what you pay for, dan di sini lo dapet everything. Worth it sekali-sekali.',
    highlights: ['Legendary buffet', 'Premium fine dining', 'Impeccable service', 'Grand interior'],
    priceRange: 'Rp 500k++',
    openHours: '06:00 - 23:00',
    coords: { lat: -6.2155, lng: 106.8019 },
    tips: [
      'Sunday brunch buffet-nya paling legendary, harus coba',
      'Dress code smart casual minimum',
      'Book jauh-jauh hari buat weekend',
    ],
  },
  {
    id: 21,
    slug: 'rm-fariz',
    name: 'RM. Fariz',
    category: 'Resto',
    location: 'Jakarta',
    address: 'Jakarta Selatan area',
    image: '/Destination/Cafe, Bar, and Eatery/RM Fariz.jpeg',
    hoverImage: '/Destination/Cafe, Bar, and Eatery/RM Fariz 2.jpeg',
    gallery: [
      '/Destination/Cafe, Bar, and Eatery/RM Fariz.jpeg',
      '/Destination/Cafe, Bar, and Eatery/RM Fariz 2.jpeg',
      '/Destination/Cafe, Bar, and Eatery/RM Fariz 3.jpeg',
      '/Destination/Cafe, Bar, and Eatery/RM Fariz 4.jpeg',
    ],
    description:
      'Cita rasa nusantara yang jujur dan familiar, harga yang gak bikin lo overthinking',
    longDescription:
      'RM. Fariz itu rumah makan yang gak perlu gimmick buat sukses — cukup rasa yang jujur. Menu-nya Indonesian comfort food yang bikin lo ngerasa di rumah: nasi padang-style, ayam goreng yang crispy perfect, dan sambal yang bikin lo keringetan tapi gak bisa berhenti. Tempatnya gak fancy, gak pretentious — just honest good food at honest prices. Ini tipe tempat yang lo datengin tiap minggu tanpa bosen. Kalau lo lagi nyari makan siang yang reliable dan gak perlu overthinking, RM. Fariz selalu deliver.',
    highlights: ['Indonesian comfort food', 'Konsisten enak', 'Harga jujur', 'Sambal killer'],
    priceRange: 'Rp 30k - 80k',
    openHours: '10:00 - 21:00',
    coords: { lat: -6.2614, lng: 106.8099 },
    tips: [
      'Ayam goreng + sambal + nasi = holy trinity',
      'Jam 12-1 siang paling rame, mending jam 11 or jam 2',
      'Bungkus buat makan di rumah juga oke banget',
    ],
  },

  // ==================== BUDAYA ====================
  {
    id: 22,
    slug: 'chandra-naya',
    name: 'Chandra Naya',
    category: 'Budaya',
    location: 'Glodok',
    address: 'Jl. Gajah Mada No. 188, Glodok, Jakarta Barat',
    image: '/Destination/Chandra Naya.jpg',
    hoverImage: '/Destination/Chandra Naya 2.jpg',
    gallery: [
      '/Destination/Chandra Naya.jpg',
      '/Destination/Chandra Naya 2.jpg',
    ],
    description:
      'Bangunan bersejarah dengan arsitektur Tionghoa yang otentik di jantung Glodok',
    longDescription:
      'Chandra Naya itu piece of history yang masih berdiri kokoh di tengah modernisasi Jakarta. Bangunan Tionghoa dari abad ke-19 ini punya arsitektur yang bikin lo terpana — detail ukiran, courtyard yang tenang, dan aura yang ngebawa lo ke era yang completely different. Di Glodok yang rame dan chaotic, Chandra Naya jadi oasis yang remind lo kalau Jakarta punya lapisan sejarah yang deep. Ini bukan cuma bangunan tua — ini cerita tentang komunitas, budaya, dan identitas yang survive melewati zaman. Must visit buat lo yang appreciate heritage.',
    highlights: ['Arsitektur abad 19', 'Heritage Tionghoa', 'Landmark Glodok', 'Spot fotografi'],
    priceRange: 'Gratis',
    openHours: 'Kunjungan perlu izin',
    coords: { lat: -6.1512, lng: 106.8128 },
    tips: [
      'Cek dulu apakah bisa masuk, kadang perlu izin khusus',
      'Combine visit dengan eksplor Glodok dan kuliner sekitarnya',
      'Bawa kamera, arsitekturnya detail banget',
    ],
  },
];

export default destinations;

export function getDestinationBySlug(slug: string): DestinationDetail | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getAllSlugs(): string[] {
  return destinations.map((d) => d.slug);
}
