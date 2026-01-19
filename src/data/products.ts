export type ProductVariant = {
  weight: string;
  price: number;
  packaging?: string; // Тубус, Крафт, Пакет, Дерево, Картон
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'black' | 'green' | 'red' | 'yellow' | 'gaba' | 'gifts';

  teaType: string;  // Крупнолистовой / Мелколистовой
  teaKind: string;
  teaGrade: string;

  description: string;
  images: string[];
  variants: ProductVariant[];
  characteristics: { name: string; value: number }[];
  brewing: {
    temp: string;
    time: string;
    amount: string;
    volume: string;
  };
  harvest: string;
  place: string;
  moodColor: string;
};

export const products: Product[] = [
  // ==========================================
  // ЧЕРНЫЙ ЧАЙ
  // ==========================================
  {
    id: 'black-small',
    slug: 'organic-small-leaf-black',
    title: 'Чай Краснодарский мелколистовой чёрный',
    subtitle: 'Первый российский органический чай',
    category: 'black',
    teaType: 'Мелколистовой',
    teaKind: 'черный',
    teaGrade: 'экстра',
    description: 'Органический мелколистовой черный чай. Обладает глубоким ароматом и чистым вкусом. В настое определяются древесные нотки и классический чайный характер.',
    images: [
      '/images/catalog/black_small_leaf.png',
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3855-scaled.jpg',
    ],
    variants: [
      { weight: '50 г', price: 220, packaging: 'Пакет' },
      { weight: '250 г', price: 1100, packaging: 'Пакет' },
      { weight: '600 г', price: 2600, packaging: 'Пакет' },
    ],
    characteristics: [
      { name: 'Крепость', value: 85 },
      { name: 'Аромат', value: 90 },
      { name: 'Цвет', value: 95 },
    ],
    brewing: { temp: '95°C', time: '3-5 мин', amount: '1-2 ч.л.', volume: '200 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-orange-950/40'
  },
  {
    id: 'black-large',
    slug: 'organic-large-leaf-black',
    title: 'Чай Краснодарский крупнолистовой чёрный',
    subtitle: 'Ручной сбор • Классика',
    category: 'black',
    teaType: 'Крупнолистовой',
    teaKind: 'черный',
    teaGrade: 'высший',
    description: 'Классический крупнолистовой черный чай ручного сбора. Обладает глубоким цветом настоя и насыщенным вкусом с приятной терпкостью.',
    images: [
      '/images/catalog/black_large_leaf.png',
      'https://hosta-tea.ru/wp-content/uploads/2022/10/5-1-1.webp',
      'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg',
    ],
    variants: [
      { weight: '50 г', price: 290, packaging: 'Крафт' },
      { weight: '50 г', price: 550, packaging: 'Тубус' },
      { weight: '100 г', price: 580, packaging: 'Крафт' },
      { weight: '250 г', price: 1440, packaging: 'Крафт' },
    ],
    characteristics: [
      { name: 'Терпкость', value: 70 },
      { name: 'Аромат', value: 80 },
      { name: 'Насыщенность', value: 75 },
    ],
    brewing: { temp: '95°C', time: '4-5 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-amber-950/40'
  },

  // ==========================================
  // ЗЕЛЕНЫЙ ЧАЙ
  // ==========================================
  {
    id: 'green-small',
    slug: 'organic-small-leaf-green',
    title: 'Чай Краснодарский мелколистовой зелёный',
    subtitle: 'Тонизирующий • Органический',
    category: 'green',
    teaType: 'Мелколистовой',
    teaKind: 'зеленый',
    teaGrade: 'экстра',
    description: 'Свежий мелколистовой зеленый чай. В свежезаваренном чае присутствуют цветочные ароматы и нотки свежей травы.',
    images: [
      '/images/catalog/black_small_leaf.png', // Placeholder (Need Small Green, using Black Small)
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3859-scaled.jpg',
    ],
    variants: [
      { weight: '50 г', price: 220, packaging: 'Пакет' },
      { weight: '250 г', price: 1100, packaging: 'Пакет' },
    ],
    characteristics: [
      { name: 'Свежесть', value: 95 },
      { name: 'Аромат', value: 85 },
      { name: 'Терпкость', value: 60 },
    ],
    brewing: { temp: '80°C', time: '2-3 мин', amount: '1 ч.л.', volume: '200 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-emerald-900/40'
  },
  {
    id: 'green-large',
    slug: 'organic-large-leaf-green',
    title: 'Чай Краснодарский крупнолистовой зелёный',
    subtitle: 'Высший сорт • Ручной сбор',
    category: 'green',
    teaType: 'Крупнолистовой',
    teaKind: 'зеленый',
    teaGrade: 'высший',
    description: 'Классический крупнолистовой зеленый чай. Обладает нежным вкусом, светлым настоем и выраженным ароматом луговых трав.',
    images: [
      '/images/catalog/green_large_leaf.png',
      'https://hosta-tea.ru/wp-content/uploads/2022/10/10-1.webp',
      'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016-300x300.jpg',
    ],
    variants: [
      { weight: '50 г', price: 315, packaging: 'Крафт' },
      { weight: '50 г', price: 580, packaging: 'Тубус' },
      { weight: '100 г', price: 625, packaging: 'Крафт' },
      { weight: '250 г', price: 1490, packaging: 'Крафт' },
    ],
    characteristics: [
      { name: 'Мягкость', value: 90 },
      { name: 'Аромат', value: 80 },
      { name: 'Цвет', value: 70 },
    ],
    brewing: { temp: '80°C', time: '3-4 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-green-950/40'
  },

  // ==========================================
  // КРАСНЫЙ ЧАЙ
  // ==========================================
  {
    id: 'red-small',
    slug: 'organic-small-leaf-red',
    title: 'Чай Краснодарский мелколистовой красный',
    subtitle: 'Органический • Ароматный',
    category: 'red',
    teaType: 'Мелколистовой',
    teaKind: 'красный',
    teaGrade: 'экстра',
    description: 'Органический мелколистовой красный чай. Среднеферментированный сорт с фруктовыми оттенками и глубоким вкусом.',
    images: [
      '/images/catalog/black_small_leaf.png', // Placeholder
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3862-scaled.jpg',
    ],
    variants: [
      { weight: '50 г', price: 220, packaging: 'Пакет' },
      { weight: '250 г', price: 1100, packaging: 'Пакет' },
    ],
    characteristics: [
      { name: 'Сладость', value: 80 },
      { name: 'Аромат', value: 90 },
      { name: 'Цвет', value: 85 },
    ],
    brewing: { temp: '90°C', time: '3-5 мин', amount: '1-2 ч.л.', volume: '200 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-red-950/40'
  },
  {
    id: 'red-large',
    slug: 'organic-large-leaf-red',
    title: 'Чай Краснодарский крупнолистовой красный',
    subtitle: 'Фруктовый профиль • Ручной сбор',
    category: 'red',
    teaType: 'Крупнолистовой',
    teaKind: 'красный',
    teaGrade: 'высший',
    description: 'Крупнолистовой красный чай ручного сбора. Проходит частичную ферментацию, сохраняя уникальные фруктовые ноты.',
    images: [
      '/images/catalog/black_large_leaf.png', // Placeholder
      'https://hosta-tea.ru/wp-content/uploads/2022/10/24-1.webp',
      'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg',
    ],
    variants: [
      { weight: '50 г', price: 350, packaging: 'Крафт' },
      { weight: '50 г', price: 600, packaging: 'Тубус' },
      { weight: '100 г', price: 700, packaging: 'Крафт' },
      { weight: '250 г', price: 1660, packaging: 'Крафт' },
    ],
    characteristics: [
      { name: 'Аромат', value: 95 },
      { name: 'Мягкость', value: 85 },
      { name: 'Послевкусие', value: 80 },
    ],
    brewing: { temp: '90°C', time: '4-5 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-rose-950/40'
  },

  // ==========================================
  // ЖЕЛТЫЙ ЧАЙ
  // ==========================================
  {
    id: 'yellow-small',
    slug: 'organic-small-leaf-yellow',
    title: 'Чай Краснодарский мелколистовой жёлтый',
    subtitle: 'Редкий сорт • Органический',
    category: 'yellow',
    teaType: 'Мелколистовой',
    teaKind: 'желтый',
    teaGrade: 'экстра',
    description: 'Органический мелколистовой жёлтый чай. Тонкий, слабоферментированный сорт с цветочные нотками.',
    images: [
      '/images/catalog/black_small_leaf.png', // Placeholder
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3865-scaled.jpg',
    ],
    variants: [
      { weight: '50 г', price: 220, packaging: 'Пакет' },
      { weight: '250 г', price: 1100, packaging: 'Пакет' },
    ],
    characteristics: [
      { name: 'Аромат', value: 95 },
      { name: 'Мягкость', value: 85 },
      { name: 'Свежесть', value: 80 },
    ],
    brewing: { temp: '85°C', time: '3-4 мин', amount: '1 ч.л.', volume: '200 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-yellow-900/40'
  },
  {
    id: 'yellow-large',
    slug: 'organic-large-leaf-yellow',
    title: 'Чай Краснодарский крупнолистовой жёлтый',
    subtitle: 'Томленый чай • Редкость',
    category: 'yellow',
    teaType: 'Крупнолистовой',
    teaKind: 'желтый',
    teaGrade: 'высший',
    description: 'Уникальный желтый чай, который проходит процедуру "томления" в пергаменте. Дает мягкий вкус без травянистости.',
    images: [
      '/images/catalog/black_large_leaf.png', // Placeholder
      'https://hosta-tea.ru/wp-content/uploads/2022/10/33-1.webp',
      'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg',
    ],
    variants: [
      { weight: '50 г', price: 350, packaging: 'Крафт' },
      { weight: '50 г', price: 600, packaging: 'Тубус' },
      { weight: '100 г', price: 700, packaging: 'Крафт' },
    ],
    characteristics: [
      { name: 'Сложность', value: 90 },
      { name: 'Мягкость', value: 95 },
      { name: 'Послевкусие', value: 85 },
    ],
    brewing: { temp: '85°C', time: '3-5 мин', amount: '5 г', volume: '200 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-yellow-700/40'
  },

  // ==========================================
  // ГАБА - ЧАЙ
  // ==========================================
  {
    id: 'gaba-red',
    slug: 'organic-gaba-red',
    title: 'Чай ГАБА крупнолистовой красный',
    subtitle: 'Бескислородная ферментация',
    category: 'gaba',
    teaType: 'Крупнолистовой',
    teaKind: 'красный (ГАБА)',
    teaGrade: 'высший',
    description: 'Уникальный красный чай, прошедший процесс анаэробной ферментации. Обработка без кислорода повышает содержание ГАМК. Обладает мягким расслабляющим эффектом.',
    images: [
      '/images/catalog/black_large_leaf.png', // Placeholder
      'https://hosta-tea.ru/wp-content/uploads/2024/10/img_8147-scaled.jpg',
    ],
    variants: [
      { weight: '50 г', price: 450, packaging: 'Крафт' },
      { weight: '100 г', price: 900, packaging: 'Крафт' },
      { weight: '250 г', price: 2250, packaging: 'Крафт' },
    ],
    characteristics: [
      { name: 'Кислинка', value: 75 },
      { name: 'Аромат', value: 90 },
      { name: 'Релакс', value: 95 },
    ],
    brewing: { temp: '90°C', time: '4-5 мин', amount: '5 г', volume: '200 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-purple-900/40'
  },

  // ==========================================
  // ГИФТЫ / НАБОРЫ
  // ==========================================
  {
    id: 'gift-wood-4',
    slug: 'gift-set-4-wood',
    title: 'Подарочный набор Ассорти (4 вида)',
    subtitle: 'В деревянной шкатулке',
    category: 'gifts',
    teaType: 'Крупнолистовой',
    teaKind: 'ассорти',
    teaGrade: 'высший',
    description: 'Эксклюзивный подарочный набор в деревянной шкатулке. Включает 4 вида чая: черный, зеленый, желтый и красный. Вес каждого вида: 50г.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/41-3.webp',
      'https://hosta-tea.ru/wp-content/uploads/2022/10/41-1.webp'
    ],
    variants: [
      { weight: '200 г', price: 3300, packaging: 'Дерево' }
    ],
    characteristics: [
      { name: 'Подарочность', value: 100 },
      { name: 'Разнообразие', value: 100 },
    ],
    brewing: { temp: 'Разная', time: '3-5 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-amber-800/40'
  },
  {
    id: 'gift-cardboard-2',
    slug: 'gift-set-2-cardboard',
    title: 'Набор Ассорти (2 вида)',
    subtitle: 'Черный + Зеленый',
    category: 'gifts',
    teaType: 'Крупнолистовой',
    teaKind: 'ассорти',
    teaGrade: 'высший',
    description: 'Набор из двух видов чая (черный и зеленый) в стильной картонной упаковке. Общий вес 200 г.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/44-1.webp'
    ],
    variants: [
      { weight: '200 г', price: 1300, packaging: 'Картон' }
    ],
    characteristics: [
      { name: 'Практичность', value: 90 },
      { name: 'Баланс', value: 80 },
    ],
    brewing: { temp: '95°C', time: '3-5 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-stone-700/40'
  }
];