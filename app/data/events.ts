export interface EventDetail {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  dateStart: string; // ISO date for sorting
  dateEnd?: string;
  time: string;
  location: string;
  venue: string;
  address: string;
  image: string;
  gallery: string[];
  description: string;
  longDescription: string;
  highlights: string[];
  lineup?: string[];
  ticketPrice: string;
  ticketLink?: string;
  coords: { lat: number; lng: number };
  tips: string[];
  isFeatured?: boolean;
}

const events: EventDetail[] = [
  // ==================== FESTIVAL ====================
  {
    id: 1,
    slug: 'jakarta-fair-prj',
    title: 'Jakarta Fair (PRJ)',
    category: 'Festival',
    date: 'Juni - Juli 2026',
    dateStart: '2026-06-10',
    dateEnd: '2026-07-12',
    time: '16:00 - 23:00',
    location: 'Kemayoran',
    venue: 'JIExpo Kemayoran',
    address: 'Jl. Benyamin Suaeb, Kemayoran, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Tiap tahun hadir, tiap tahun lo balik lagi. Wahana, konser, dan ribuan booth yang bikin kantong jebol tapi happy.',
    longDescription:
      'Jakarta Fair alias PRJ ini legit udah jadi tradisi tahunan warga Jakarta. Bukan cuma pameran dagang, ini tuh festival hidup yang ngasih lo semuanya sekaligus — dari wahana yang bikin jantung copot, konser artis top tier, sampai booth makanan yang bikin lo nggak mau pulang. Setiap sudut JIExpo berubah jadi dunia sendiri. Ada area buat keluarga, ada buat anak muda yang cari vibes, dan pastinya ada buat lo yang doyan belanja barang diskon gila-gilaan. Seriusan, kalau lo belum pernah ke PRJ, lo belum resmi jadi anak Jakarta.',
    highlights: ['Konser artis top', 'Wahana & rides', 'Pameran dagang', 'Food festival', 'Diskon booth'],
    lineup: ['Konser musik tiap malam', 'Pameran otomotif', 'Bazaar fashion', 'Area kuliner nusantara'],
    ticketPrice: 'Rp 30k - 50k (weekday/weekend)',
    coords: { lat: -6.1452, lng: 106.8451 },
    tips: [
      'Dateng weekday biar gak desak-desakan, trust me',
      'Bawa cash — beberapa booth masih old-school',
      'Pakai sepatu nyaman, lo bakal jalan berjam-jam',
      'Malem lebih seru karena ada konser + lampunya epic',
    ],
    isFeatured: true,
  },
  {
    id: 2,
    slug: 'festival-palang-pintu',
    title: 'Festival Palang Pintu',
    category: 'Budaya',
    date: 'Juni 2026',
    dateStart: '2026-06-14',
    dateEnd: '2026-06-15',
    time: '09:00 - 21:00',
    location: 'Kemang',
    venue: 'Jl. Kemang Raya',
    address: 'Jl. Kemang Raya, Bangka, Mampang Prapatan, Jakarta Selatan',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1504257365157-1496a50d48f2?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Pencak silat, ondel-ondel, dan tradisi Betawi yang masih hidup. Ini bagian dari kota lo, ketauin dulu.',
    longDescription:
      'Festival Palang Pintu itu salah satu acara budaya paling otentik yang masih eksis di Jakarta. Konsepnya diangkat dari tradisi pernikahan adat Betawi, di mana calon mempelai pria harus "ngepalang" pintu alias menunjukkan kemampuan pencak silat dan pengetahuan agama sebelum boleh masuk. Di festival ini, lo bakal ngeliat pertunjukan silat live, parade ondel-ondel yang bikin merinding (in a good way), tarian Betawi, sampai lomba-lomba tradisional. Plus kuliner Betawi yang rarely lo temuin di tempat lain. Ini bukan sekadar nostalgia — ini identitas kota lo yang harus lo kenal.',
    highlights: ['Pencak silat live', 'Parade ondel-ondel', 'Kuliner Betawi', 'Tarian tradisional', 'Lomba-lomba rakyat'],
    ticketPrice: 'Gratis',
    coords: { lat: -6.2615, lng: 106.8106 },
    tips: [
      'Dateng pagi buat nonton pencak silat opening',
      'Cobain bir pletok dan kerak telor di sana',
      'Bawa kamera — momentnya fotogenik banget',
      'Parkiran terbatas, mending naik ojol',
    ],
  },

  // ==================== MUSIK ====================
  {
    id: 3,
    slug: 'java-jazz-festival',
    title: 'Java Jazz Festival',
    category: 'Musik',
    date: 'Maret 2026',
    dateStart: '2026-03-06',
    dateEnd: '2026-03-08',
    time: '14:00 - 00:00',
    location: 'Kemayoran',
    venue: 'JIExpo Kemayoran',
    address: 'Jl. Benyamin Suaeb, Kemayoran, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Tiga hari, ratusan artis, satu kota. Ngaku suka jazz tapi belum pernah ke sini? Pertanyain dirimu.',
    longDescription:
      'Java Jazz Festival itu bukan sekadar festival musik — ini tuh perayaan sound yang udah world-class. Tiap tahun, JIExpo Kemayoran berubah jadi playground buat pecinta musik dari seluruh dunia. Lo bakal nemu artis internasional, local legends, dan hidden gems yang perform di multiple stages secara bersamaan. Bukan cuma jazz in the traditional sense — ada R&B, soul, funk, dan genre-genre yang lo gak expect. Atmosfernya? Electric. Dari sore sampai lewat tengah malem, lo bakal dikelilingi orang-orang yang genuinely love music. Kalau lo belum pernah ke JJF, 2026 is your year.',
    highlights: ['Artis internasional', 'Multiple stages', 'Jazz, R&B, Soul, Funk', 'Food & drink area', 'Merch exclusive'],
    lineup: ['International headliners TBA', 'Local jazz legends', 'Emerging artists showcase', 'Late night jam sessions'],
    ticketPrice: 'Rp 600k - 2.5jt (daily/3-day pass)',
    ticketLink: 'https://www.javajazzfestival.com',
    coords: { lat: -6.1452, lng: 106.8451 },
    tips: [
      'Beli tiket 3-day pass, jauh lebih worth it',
      'Download jadwalnya biar gak miss artis favorit',
      'Area outdoor sore hari vibes-nya paling enak',
      'Sepatu nyaman wajib — lo bakal jalan + berdiri banyak',
    ],
    isFeatured: true,
  },
  {
    id: 4,
    slug: 'djakarta-warehouse-project',
    title: 'Djakarta Warehouse Project',
    category: 'Musik',
    date: 'Desember 2026',
    dateStart: '2026-12-11',
    dateEnd: '2026-12-13',
    time: '18:00 - 04:00',
    location: 'Kemayoran',
    venue: 'JIExpo Kemayoran',
    address: 'Jl. Benyamin Suaeb, Kemayoran, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'EDM festival terbesar di Asia Tenggara ada di Jakarta. Drop bassnya bikin dada getar, literally.',
    longDescription:
      'DWP alias Djakarta Warehouse Project udah bukan sekadar "festival EDM" — ini salah satu event musik elektronik terbesar di seluruh Asia Tenggara, dan proud-nya, adanya di Jakarta. Setiap Desember, ribuan ravers dari berbagai negara nyerbu JIExpo buat ngerasain lineup yang gak main-main. Kita ngomongin nama-nama besar kayak top 10 DJ dunia yang manggung di sini. Production-nya? Hollywood level. Sound system yang bikin tulang lo getar, visual yang mind-blowing, dan energy crowd yang gak bakal lo dapet di tempat lain. Ini bukan buat yang lemah hati — tapi kalau lo siap, DWP bakal jadi salah satu malam terbaik dalam hidup lo.',
    highlights: ['Top global DJs', 'World-class production', 'Multiple stages', 'International crowd', 'Afterparty culture'],
    lineup: ['International DJs TBA', 'Regional headliners', 'Local electronic acts', 'Sunrise sets'],
    ticketPrice: 'Rp 1.5jt - 5jt (early bird - VIP)',
    coords: { lat: -6.1452, lng: 106.8451 },
    tips: [
      'Beli early bird — harga bisa naik 2-3x menjelang hari H',
      'Dateng hydrated dan pace yourself, ini marathon bukan sprint',
      'Loker wajib, jangan bawa barang banyak ke venue',
      'Afterparty-nya sering lebih legendary dari main event',
    ],
    isFeatured: true,
  },
  {
    id: 5,
    slug: 'we-the-fest',
    title: 'We The Fest',
    category: 'Musik',
    date: 'Juli 2026',
    dateStart: '2026-07-24',
    dateEnd: '2026-07-26',
    time: '13:00 - 23:00',
    location: 'Kemayoran',
    venue: 'JIExpo Kemayoran',
    address: 'Jl. Benyamin Suaeb, Kemayoran, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Festival musik, fashion, food, dan art dalam satu tempat. Basically, surga anak muda Jakarta.',
    longDescription:
      'We The Fest (WTF) itu festival yang paling ngerti taste anak muda Jakarta. Bukan cuma soal musik — walaupun lineup-nya selalu on point dari pop, indie, hip-hop, sampai electronic — tapi juga soal lifestyle. Di sini lo bakal nemu art installations yang Instagrammable banget, fashion market yang curated, food village dengan ratusan pilihan, dan workshops yang actually interesting. Vibe-nya tuh upbeat, colorful, dan inclusive. Mau dateng sama squad atau solo, lo pasti nemu tribe lo di sini. WTF itu bukan sekadar festival — ini annual reunion buat generasi yang celebrate creativity.',
    highlights: ['Multi-genre lineup', 'Art installations', 'Fashion market', 'Food village', 'Workshops & talks'],
    lineup: ['International pop/indie acts', 'Regional hip-hop artists', 'Local indie darlings', 'DJ sets'],
    ticketPrice: 'Rp 800k - 3jt (daily/3-day)',
    coords: { lat: -6.1452, lng: 106.8451 },
    tips: [
      'Outfit game harus on point — ini basically fashion show juga',
      'Explore beyond main stage, banyak hidden gems di stage kecil',
      'Sunscreen wajib, outdoor area-nya luas banget',
      'Art installations paling bagus difoto pas golden hour',
    ],
  },
  {
    id: 6,
    slug: 'head-in-the-clouds',
    title: 'Head In The Clouds',
    category: 'Musik',
    date: 'Desember 2026',
    dateStart: '2026-12-05',
    dateEnd: '2026-12-06',
    time: '14:00 - 23:00',
    location: 'PIK',
    venue: 'Community Park PIK 2',
    address: 'PIK 2, Tangerang',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1920&q=80',
    ],
    description: '88rising punya festival sendiri di Jakarta. Asian excellence in music, art, and culture.',
    longDescription:
      'Head In The Clouds by 88rising ini festival yang literally merayakan Asian excellence. Lo bakal nemu artis-artis Asia yang udah go global — dari Rich Brian yang started dari Jakarta, sampai nama-nama besar lain yang bikin wave di international scene. Festival ini bukan cuma soal musik, tapi juga soal representasi. Ngeliat artis Asia perform di stage gede dengan proud-nya itu feeling yang beda. Production-nya clean, venue-nya spacious di PIK 2, dan crowd-nya satu vibe — young, proud, dan culturally aware.',
    highlights: ['88rising artists', 'Asian representation', 'Outdoor venue', 'Art & culture zone', 'Limited merch drops'],
    lineup: ['88rising roster', 'Guest international acts', 'Indonesian headliners', 'Surprise performances'],
    ticketPrice: 'Rp 900k - 4jt',
    coords: { lat: -6.0868, lng: 106.6652 },
    tips: [
      'Transport ke PIK 2 bisa tricky, plan ahead',
      'Merch booth drop terbatas, dateng awal kalau mau belanja',
      'Bawa power bank — lo pasti bakal banyak foto dan video',
      'After-party biasanya di sekitar area PIK',
    ],
  },

  // ==================== SENI ====================
  {
    id: 7,
    slug: 'art-jakarta',
    title: 'Art Jakarta',
    category: 'Seni',
    date: 'Agustus 2026',
    dateStart: '2026-08-28',
    dateEnd: '2026-08-31',
    time: '11:00 - 21:00',
    location: 'Senayan',
    venue: 'Jakarta Convention Center',
    address: 'Jl. Gatot Subroto, Senayan, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Pameran seni kontemporer terbesar se-Indonesia. Foto aesthetic dijamin, tapi lo bakal genuinely terkesima juga.',
    longDescription:
      'Art Jakarta adalah pameran seni kontemporer terbesar di Indonesia yang menghadirkan galeri-galeri terbaik dari dalam dan luar negeri. Tapi ini bukan pameran seni yang bikin lo bosen — setiap karya yang dipajang punya cerita yang bisa lo relate, dari isu sosial sampai existential crisis yang lo rasain tiap Senin pagi. Lo gak perlu jadi art expert buat enjoy di sini. Cukup dateng dengan mata dan pikiran terbuka, dan lo bakal keluar dengan perspektif baru. Plus, foto-fotonya gak bohong — setiap sudut itu content ready tanpa perlu editing.',
    highlights: ['Galeri internasional', 'Seni kontemporer Indonesia', 'Artist talks', 'Installation art', 'Collector previews'],
    ticketPrice: 'Rp 100k - 250k',
    coords: { lat: -6.2176, lng: 106.8002 },
    tips: [
      'Weekday lebih enak, weekend antri panjang',
      'Ikut artist talk kalau ada — free dan insightful banget',
      'Jangan takut nanya ke gallery assistant, mereka helpful',
      'Budget buat art prints — banyak yang affordable dan keren',
    ],
  },
  {
    id: 8,
    slug: 'artjog-jakarta',
    title: 'ArtJog DOORS - Jakarta',
    category: 'Seni',
    date: 'Oktober 2026',
    dateStart: '2026-10-10',
    dateEnd: '2026-10-20',
    time: '10:00 - 20:00',
    location: 'SCBD',
    venue: 'Museum MACAN',
    address: 'AKR Tower Level MM, Jl. Panjang No.5, Kebon Jeruk, Jakarta Barat',
    image: 'https://images.unsplash.com/photo-1594794312433-05a69139b8d6?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594794312433-05a69139b8d6?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Pameran seni paling hype dari Jogja sekarang touring ke Jakarta. Karya-karya yang bikin lo mikir.',
    longDescription:
      'ArtJog DOORS bawa semangat pameran seni paling ikonik dari Yogyakarta ke Jakarta. Kalau biasanya lo harus ke Jogja buat ngerasain level art exhibition ini, sekarang tinggal gas ke Museum MACAN. Konsep "DOORS" itu literal dan metaforis — setiap ruangan yang lo masuki tuh kayak buka pintu ke dunia baru. Karya-karyanya provocative, beautiful, dan kadang bikin lo berdiri diam 5 menit mikirin "ini maksudnya apa ya". Dan itu exactly the point. Art yang bagus gak harus langsung dimengerti — yang penting lo feel something.',
    highlights: ['ArtJog touring exhibition', 'Museum MACAN venue', 'Interactive installations', 'Curator tours', 'Limited edition catalog'],
    ticketPrice: 'Rp 80k - 150k',
    coords: { lat: -6.1753, lng: 106.7831 },
    tips: [
      'Dateng pas weekday buat experience yang lebih intimate',
      'Join curator tour kalau available — totally worth it',
      'Museum MACAN sendiri udah aesthetic, explore semua lantai',
      'Cafe-nya enak, bisa recharge setelah deep art experience',
    ],
  },

  // ==================== FOOD & DRINK ====================
  {
    id: 9,
    slug: 'jakarta-culinary-feastival',
    title: 'Jakarta Culinary Feastival',
    category: 'Food & Drink',
    date: 'April 2026',
    dateStart: '2026-04-17',
    dateEnd: '2026-04-19',
    time: '10:00 - 22:00',
    location: 'Senayan',
    venue: 'Senayan City',
    address: 'Jl. Asia Afrika No.19, Senayan, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Food festival yang ngumpulin chef-chef terbaik Jakarta dalam satu atap. Perut lo bakal berterima kasih.',
    longDescription:
      'Jakarta Culinary Feastival ini surganya foodies. Bayangin chef-chef terbaik Jakarta dan beberapa nama internasional ngumpul dalam satu tempat, serving menu-menu special yang lo gak bakal dapet di resto mereka sehari-hari. Dari street food elevated sampai fine dining yang di-demokrasi-kan, semua ada. Lo juga bisa ikut cooking class, nonton live cooking demo, dan nyicipin pairing-pairing flavor yang unexpected. Ini bukan sekadar makan — ini culinary experience yang bakal nambah referensi taste lo secara drastis.',
    highlights: ['Top chefs showcase', 'Cooking demos', 'Wine & cocktail pairing', 'Street food corner', 'Cooking workshops'],
    ticketPrice: 'Rp 75k - 150k (belum termasuk makanan)',
    coords: { lat: -6.2271, lng: 106.7983 },
    tips: [
      'Dateng lapar tapi jangan skip sarapan — pace yourself',
      'Bawa cash dan ewallet, beberapa booth prefer satu jenis',
      'Cooking class biasanya sudah penuh cepat, book online dulu',
      'Sore-malem vibe-nya lebih rame dan festive',
    ],
  },
  {
    id: 10,
    slug: 'beer-crafts-festival',
    title: 'Jakarta Beer & Crafts',
    category: 'Food & Drink',
    date: 'September 2026',
    dateStart: '2026-09-12',
    dateEnd: '2026-09-13',
    time: '17:00 - 23:00',
    location: 'PIK',
    venue: 'Pantjoran PIK',
    address: 'Pantjoran PIK, Penjaringan, Jakarta Utara',
    image: 'https://images.unsplash.com/photo-1575037614876-c38a4c44f5b8?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1575037614876-c38a4c44f5b8?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Craft beer Jakarta di satu tempat. Pairing sama live music dan good vibes.',
    longDescription:
      'Jakarta Beer & Crafts Festival ini gathering-nya craft beer enthusiasts Jakarta. Local breweries pada showcase specialty mereka, dan lo bisa nyoba beers yang literally gak dijual di mana-mana. Dari IPA yang hoppy abis sampai stout yang deep dan complex, semua ada. Tapi ini bukan cuma soal beer — ada live music yang curated, food trucks yang nyediain pairing yang on point, dan vibe yang chill banget. Perfect buat lo yang pengen weekend yang relaxed tapi memorable. Warning: lo mungkin bakal pulang dengan beer taste yang jauh lebih refined.',
    highlights: ['Local craft breweries', 'Beer tasting flights', 'Live acoustic music', 'Food truck pairing', 'Brewing workshops'],
    ticketPrice: 'Rp 150k (termasuk tasting tokens)',
    coords: { lat: -6.1013, lng: 106.7450 },
    tips: [
      'Bawa ID, wajib 21+ buat masuk',
      'Makan dulu sebelum tasting, biar lebih enjoy',
      'Tanya sama brewers langsung — mereka suka cerita tentang beer mereka',
      'Naik ojol — don\'t drink and drive, period',
    ],
  },

  // ==================== OLAHRAGA ====================
  {
    id: 11,
    slug: 'jakarta-marathon',
    title: 'Jakarta Marathon',
    category: 'Olahraga',
    date: 'Oktober 2026',
    dateStart: '2026-10-25',
    time: '05:00 - 12:00',
    location: 'Monas',
    venue: 'Monumen Nasional & rute kota',
    address: 'Start/Finish: Silang Monas, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Lari keliling Jakarta pas car-free. 42K full marathon melewati landmark ikonik kota.',
    longDescription:
      'Jakarta Marathon ini bukan sekadar lomba lari — ini celebration of the city. Bayangin lo lari melewati Monas, Kota Tua, Sudirman, dan landmark Jakarta lainnya di jalan yang car-free. Mau lo pelari serius yang ngejar PB atau casual runner yang mau fun run 5K, ada kategori buat semua level. Vibe pagi-pagi di starting line itu goosebumps — ribuan orang dari berbagai negara sharing one mission. Dan finishing line moment? Chef\'s kiss. It doesn\'t matter you\'re first or last — crossing that line hits different.',
    highlights: ['42K / 21K / 10K / 5K', 'Rute melewati landmark Jakarta', 'International participants', 'Expo & race kit', 'Finisher medal'],
    ticketPrice: 'Rp 250k - 850k (tergantung kategori)',
    coords: { lat: -6.1754, lng: 106.8272 },
    tips: [
      'Training plan minimal 3 bulan sebelumnya',
      'Ambil race kit H-2, jangan H-1 karena rame banget',
      'Pakai sepatu yang udah di-break in, jangan pakai baru',
      'Sunscreen + cap wajib, Jakarta panas even pagi-pagi',
    ],
  },
  {
    id: 12,
    slug: 'jakarta-night-ride',
    title: 'Jakarta Night Ride',
    category: 'Olahraga',
    date: 'Setiap Sabtu Malam',
    dateStart: '2026-01-03',
    time: '22:00 - 02:00',
    location: 'Bundaran HI',
    venue: 'Start dari Bundaran HI',
    address: 'Bundaran HI, Menteng, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Gowes bareng malam hari keliling Jakarta tanpa macet. Community vibes yang gak ada tandingannya.',
    longDescription:
      'Jakarta Night Ride itu salah satu community event paling vibe di Jakarta. Tiap Sabtu malam, ratusan (kadang ribuan) pesepeda berkumpul di Bundaran HI dan bareng-bareng menjelajahi jalanan Jakarta yang udah lengang. Rasanya beda banget — kota yang biasanya penuh macet dan polusi, di malam hari berubah jadi playground yang peaceful. Lo gowes melewati gedung-gedung megah yang lampunya still on, ngelewatin jalanan yang di siang hari impossible buat dilalui sepeda. It\'s therapeutic, social, dan fun at the same time. Gak perlu sepeda mahal — yang penting niat dan helm.',
    highlights: ['Community ride', 'Rute variatif tiap minggu', 'Free untuk semua', 'Social cycling vibes', 'Night city exploration'],
    ticketPrice: 'Gratis',
    coords: { lat: -6.1950, lng: 106.8228 },
    tips: [
      'Lampu depan + belakang WAJIB, safety first',
      'Dateng 30 menit sebelum start buat parkir & warm up',
      'Bawa air minum, gak selalu ada pit stop',
      'Follow komunitas di IG buat update rute mingguan',
    ],
  },

  // ==================== EXPO & KOMUNITAS ====================
  {
    id: 13,
    slug: 'comic-frontier',
    title: 'Comic Frontier (Comifuro)',
    category: 'Komunitas',
    date: 'Februari & Agustus 2026',
    dateStart: '2026-02-14',
    dateEnd: '2026-02-15',
    time: '10:00 - 17:00',
    location: 'BSD',
    venue: 'ICE BSD',
    address: 'Indonesia Convention Exhibition, BSD City, Tangerang',
    image: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Convention terbesar buat fans anime, manga, dan game di Indonesia. Cosplayer everywhere.',
    longDescription:
      'Comic Frontier alias Comifuro ini convention paling ditunggu-tunggu sama komunitas weeb, geek, dan creative se-Indonesia. Ini bukan sekadar event beli merchandise — ini tuh gathering dari orang-orang yang passionate banget sama anime, manga, game, dan pop culture. Lo bakal nemu artist alley yang penuh sama talented local artists jualan fan-art dan original works, cosplayer yang level-nya udah gila, panels dan talks dari industry insiders, dan atmosphere yang purely joyful. Mau lo hardcore otaku atau casual anime watcher, lo bakal feel at home di sini.',
    highlights: ['Artist alley', 'Cosplay competition', 'Merchandise booth', 'Industry panels', 'Fan gatherings'],
    ticketPrice: 'Rp 50k - 75k (presale/OTS)',
    coords: { lat: -6.3028, lng: 106.6529 },
    tips: [
      'Beli tiket presale — OTS bisa antri sampai jam, literally',
      'Bawa cash buat artist alley, kebanyakan masih cash only',
      'Cosplay itu encouraged tapi plan ahead soal changing room',
      'Dateng pas buka buat dapet limited merch sebelum sold out',
    ],
  },
  {
    id: 14,
    slug: 'ideafest',
    title: 'IdeaFest',
    category: 'Komunitas',
    date: 'November 2026',
    dateStart: '2026-11-06',
    dateEnd: '2026-11-08',
    time: '10:00 - 21:00',
    location: 'SCBD',
    venue: 'JCC Senayan',
    address: 'Jakarta Convention Center, Senayan, Jakarta Pusat',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1920&q=80',
    ],
    description: 'Festival ide dan kreativitas. Talks dari founders, workshops, dan exhibition dari brand lokal keren.',
    longDescription:
      'IdeaFest itu tempat di mana ide-ide gila bertemu eksekusi nyata. Festival ini ngumpulin founders, kreator, desainer, tech enthusiasts, dan siapa aja yang curious about innovation. Lo bakal nonton talks yang genuinely inspiring (bukan yang generic motivational), ikut workshops yang hands-on, dan explore exhibition dari brand-brand lokal yang pushing boundaries. Ini bukan corporate conference yang boring — vibe-nya young, energetic, dan full of possibility. Kalau lo lagi di titik hidup yang butuh spark of inspiration, IdeaFest might just be it.',
    highlights: ['Keynote speakers', 'Hands-on workshops', 'Brand exhibition', 'Networking sessions', 'Creative marketplace'],
    ticketPrice: 'Rp 100k - 500k',
    coords: { lat: -6.2176, lng: 106.8002 },
    tips: [
      'Pilih workshop yang mau lo ikutin dari awal, seat terbatas',
      'Networking di area exhibition flow-nya lebih natural',
      'Bawa kartu nama atau LinkedIn ready di HP',
      'After-event biasanya ada gathering informal yang worth datanging',
    ],
  },
];

export default events;

export function getEventBySlug(slug: string): EventDetail | undefined {
  return events.find((e) => e.slug === slug);
}

export function getAllEventSlugs(): string[] {
  return events.map((e) => e.slug);
}

export function getFeaturedEvents(): EventDetail[] {
  return events.filter((e) => e.isFeatured);
}

export function getEventsByCategory(category: string): EventDetail[] {
  if (category === 'Semua') return events;
  return events.filter((e) => e.category === category);
}

export function getUpcomingEvents(): EventDetail[] {
  return [...events].sort((a, b) => a.dateStart.localeCompare(b.dateStart));
}
