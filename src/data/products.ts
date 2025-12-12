export type ProductVariant = {
  weight: string;
  price: number;
  packaging?: string; // Тубус, Крафт (К/У), Ж/Б, Дерево, Картон
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'black' | 'green' | 'red' | 'yellow' | 'gaba' | 'white' | 'mix';
  
  // Характеристики для отображения в "Важных характеристиках"
  teaType: string;  // Тип – байховый (мелколистовой)
  teaKind: string;  // Вид чая – черный
  teaGrade: string; // Категория – экстра
  
  tags: string[];
  description: string;
  images: string[];
  variants: ProductVariant[];
  characteristics: { name: string; value: number }[]; // шкала 0-100
  brewing: {
    temp: string;
    time: string;
    amount: string;
    volume: string;
  };
  harvest: string;
  place: string;
  moodColor: string; // Цвет фонового градиента
};

export const products: Product[] = [
  // ==========================================
  // ЧЕРНЫЙ ЧАЙ
  // ==========================================
  {
    id: 'black-extra',
    slug: 'organic-extra-black',
    title: 'Чай ORGANIC EXTRA Краснодарский мелколистовой чёрный',
    subtitle: 'Ручной сбор • Экстра',
    category: 'black',
    teaType: 'байховый (мелколистовой)',
    teaKind: 'черный',
    teaGrade: 'экстра',
    tags: ['Бодрящий', 'Утренний', 'Хит', 'Экстра'],
    description: 'Погрузитесь в мир легкости и изысканности с черным чаем от Hosta Tea. Насладитесь нежными ароматами и неповторимым вкусом этого редкого чайного сорта. В свежезаваренном черном чае определяются древесные нотки, а также нотки грецкого ореха.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3855-scaled.jpg', // 250g
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3856-scaled.jpg', // 50g
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3857-scaled.jpg'  // 600g
    ],
    variants: [
      { weight: '50 г', price: 220 },
      { weight: '250 г', price: 1100 },
      { weight: '600 г', price: 2600 },
    ],
    characteristics: [
      { name: 'Терпкость', value: 85 },
      { name: 'Аромат', value: 90 },
      { name: 'Цвет', value: 95 },
    ],
    brewing: { temp: '95°C', time: '3-5 мин', amount: '1-2 ч.л.', volume: '200 мл' },
    harvest: 'Май 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-orange-950/40'
  },
  {
    id: 'black-large',
    slug: 'organic-large-leaf-black',
    title: 'Чай ORGANIC Краснодарский крупнолистовой чёрный',
    subtitle: 'Классический • Ручной сбор',
    category: 'black',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'черный',
    teaGrade: 'высший',
    tags: ['Классика', 'Подарок', 'Насыщенный'],
    description: 'Классический крупнолистовой черный чай ручного сбора. Обладает глубоким цветом настоя и насыщенным вкусом с приятной терпкостью. Доступен в различных вариантах упаковки: от крафта до подарочных тубусов и жестяных банок.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/5-1-1.webp', // 100g
      'https://hosta-tea.ru/wp-content/uploads/2022/10/13-1.webp', // Ж/Б
      'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg', // Тубус
      'https://hosta-tea.ru/wp-content/uploads/2022/10/3-1-1.webp'  // 250g
    ],
    variants: [
      { weight: '50 г', price: 290, packaging: 'К/У' },
      { weight: '50 г', price: 550, packaging: 'Тубус' },
      { weight: '100 г', price: 580, packaging: 'К/У' },
      { weight: '100 г', price: 650, packaging: 'Ж/Б' },
      { weight: '100 г', price: 850, packaging: 'Тубус' },
      { weight: '250 г', price: 1440, packaging: 'К/У' },
    ],
    characteristics: [
      { name: 'Терпкость', value: 70 },
      { name: 'Аромат', value: 80 },
      { name: 'Насыщенность', value: 75 },
    ],
    brewing: { temp: '95°C', time: '4-5 мин', amount: '5-7 г', volume: '500 мл' },
    harvest: 'Лето 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-amber-950/40'
  },
  {
    id: 'black-small-80',
    slug: 'organic-small-80-black',
    title: 'Чай ORGANIC Краснодарский мелкий чёрный',
    subtitle: 'Крепкий настой',
    category: 'black',
    teaType: 'байховый (мелкий)',
    teaKind: 'черный',
    teaGrade: 'первый',
    tags: ['Завтрак', 'Крепкий', 'Эконом'],
    description: 'Чай мелкой фракции, дающий быстрый, очень крепкий и темный настой. Отлично подходит для утреннего пробуждения.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/2-1-1.webp'
    ],
    variants: [
      { weight: '80 г', price: 220, packaging: 'К/У' }
    ],
    characteristics: [
      { name: 'Крепость', value: 95 },
      { name: 'Терпкость', value: 90 },
      { name: 'Аромат', value: 50 },
    ],
    brewing: { temp: '100°C', time: '2-3 мин', amount: '1 ч.л.', volume: '200 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-neutral-900/60'
  },
  {
    id: 'black-fine-100',
    slug: 'organic-fine-100-black',
    title: 'Чай ORGANIC Краснодарский мелколистовой чёрный',
    subtitle: 'Насыщенный вкус',
    category: 'black',
    teaType: 'байховый (мелколистовой)',
    teaKind: 'черный',
    teaGrade: 'высший',
    tags: ['Классика', 'На каждый день'],
    description: 'Отличный мелколистовой чай для тех, кто любит напиток покрепче, но с сохранением богатого аромата.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/1-1-1.webp'
    ],
    variants: [
      { weight: '100 г', price: 420, packaging: 'К/У' }
    ],
    characteristics: [
      { name: 'Крепость', value: 80 },
      { name: 'Терпкость', value: 75 },
      { name: 'Аромат', value: 65 },
    ],
    brewing: { temp: '95°C', time: '3-4 мин', amount: '1 ч.л.', volume: '200 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-stone-900/50'
  },

  // ==========================================
  // КРАСНЫЙ ЧАЙ
  // ==========================================
  {
    id: 'red-extra',
    slug: 'organic-extra-red',
    title: 'Чай ORGANIC EXTRA Краснодарский мелколистовой красный',
    subtitle: 'Ручной сбор • Ягодные ноты',
    category: 'red',
    teaType: 'байховый (мелколистовой)',
    teaKind: 'красный',
    teaGrade: 'экстра',
    tags: ['Ягодный', 'Ароматный', 'Экстра', 'Гурманам'],
    description: 'Красный чай является среднеферментированным и не относится ни к чёрным, ни к зелёным сортам. В свежезаваренном красном чае присутствуют лёгкие ягодные нотки ежевики и шиповника. Насладитесь нежными ароматами и неповторимым вкусом этого редкого сорта.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3861-scaled.jpg', // 250g
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3862-scaled.jpg', // 50g
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3863-scaled.jpg'  // 600g
    ],
    variants: [
      { weight: '50 г', price: 220 },
      { weight: '250 г', price: 1100 },
      { weight: '600 г', price: 2600 },
    ],
    characteristics: [
      { name: 'Ягодность', value: 90 },
      { name: 'Сладость', value: 80 },
      { name: 'Терпкость', value: 40 },
    ],
    brewing: { temp: '90-95°C', time: '3-5 мин', amount: '1-2 ч.л.', volume: '200 мл' },
    harvest: 'Май 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-red-950/40'
  },
  {
    id: 'red-large',
    slug: 'organic-large-leaf-red',
    title: 'Чай ORGANIC Краснодарский крупнолистовой красный',
    subtitle: 'Среднеферментированный • Ручной сбор',
    category: 'red',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'красный',
    teaGrade: 'высший',
    tags: ['Ягодный', 'Подарок', 'Мягкий', 'Вечерний'],
    description: 'Красный чай находится между черным и зеленым по степени ферментации. В процессе производства чай не на долго помещается в специальную ферментационную камеру (всего 3 часа). Это позволяет сохранить в листе уникальные ноты ежевики, шиповника и легкую кислинку.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/21-1.webp', // 100g
      'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg', // Тубус
      'https://hosta-tea.ru/wp-content/uploads/2022/10/24-1.webp', // 250g
      'https://hosta-tea.ru/wp-content/uploads/2022/10/23-1.webp'  // 20g
    ],
    variants: [
      { weight: '20 г', price: 160 },
      { weight: '50 г', price: 350 },
      { weight: '50 г', price: 600, packaging: 'Тубус' },
      { weight: '100 г', price: 700 },
      { weight: '100 г', price: 950, packaging: 'Тубус' },
      { weight: '250 г', price: 1660 },
    ],
    characteristics: [
      { name: 'Аромат', value: 95 },
      { name: 'Мягкость', value: 85 },
      { name: 'Послевкусие', value: 80 },
    ],
    brewing: { temp: '90°C', time: '4-5 мин', amount: '5-7 г', volume: '500 мл' },
    harvest: 'Лето 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-rose-950/40'
  },

  // ==========================================
  // ЗЕЛЕНЫЙ ЧАЙ
  // ==========================================
  {
    id: 'green-extra',
    slug: 'organic-extra-green',
    title: 'Чай ORGANIC EXTRA Краснодарский мелколистовой зелёный',
    subtitle: 'Ручной сбор • Обжарка',
    category: 'green',
    teaType: 'байховый (мелколистовой)',
    teaKind: 'зеленый',
    teaGrade: 'экстра',
    tags: ['Свежий', 'Тонизирующий', 'Экстра', 'Утренний'],
    description: 'Процесс фиксации зелёного чайного листа на фабрике АО “Хоста-чай” осуществляется способом обжарки в специальном барабане при температуре 270-300°C. Это позволяет сохранить максимум пользы. В свежезаваренном чае присутствуют цветочные ароматы и нотки свежескошенной травы.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3858-scaled.jpg', // 250g
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3859-scaled.jpg', // 50g
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3860-scaled.jpg'  // 600g
    ],
    variants: [
      { weight: '50 г', price: 220 },
      { weight: '250 г', price: 1100 },
      { weight: '600 г', price: 2600 },
    ],
    characteristics: [
      { name: 'Свежесть', value: 95 },
      { name: 'Аромат', value: 85 },
      { name: 'Терпкость', value: 60 },
    ],
    brewing: { temp: '80-85°C', time: '2-3 мин', amount: '1 ч.л.', volume: '200 мл' },
    harvest: 'Весна 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-emerald-900/40'
  },
  {
    id: 'green-large',
    slug: 'organic-large-leaf-green',
    title: 'Чай ORGANIC Краснодарский крупнолистовой зелёный',
    subtitle: 'Классический • Высший сорт',
    category: 'green',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'зеленый',
    teaGrade: 'высший',
    tags: ['Классика', 'Здоровье', 'Подарок'],
    description: 'Классический крупнолистовой зеленый чай. Обладает нежным вкусом, светлым настоем и выраженным ароматом луговых трав. Идеален для тех, кто ценит мягкость и пользу зеленого чая. Доступен в подарочной упаковке.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/10-1.webp', // 100g
      'https://hosta-tea.ru/wp-content/uploads/2022/10/13-1.webp', // Ж/Б
      'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016-300x300.jpg', // Tube
      'https://hosta-tea.ru/wp-content/uploads/2022/10/12-1.webp'  // 250g
    ],
    variants: [
      { weight: '50 г', price: 315, packaging: 'К/У' },
      { weight: '50 г', price: 580, packaging: 'Тубус' },
      { weight: '100 г', price: 625, packaging: 'К/У' },
      { weight: '100 г', price: 720, packaging: 'Ж/Б' },
      { weight: '100 г', price: 900, packaging: 'Тубус' },
      { weight: '250 г', price: 1490 },
    ],
    characteristics: [
      { name: 'Мягкость', value: 90 },
      { name: 'Аромат', value: 80 },
      { name: 'Цвет', value: 70 },
    ],
    brewing: { temp: '80°C', time: '3-4 мин', amount: '4-5 г', volume: '500 мл' },
    harvest: 'Весна 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-green-950/40'
  },

  // ==========================================
  // ЖЕЛТЫЙ ЧАЙ
  // ==========================================
  {
    id: 'yellow-extra',
    slug: 'organic-extra-yellow',
    title: 'Чай ORGANIC EXTRA Краснодарский мелколистовой жёлтый',
    subtitle: 'Ручной сбор • Слабоферментированный',
    category: 'yellow',
    teaType: 'байховый (мелколистовой)',
    teaKind: 'желтый',
    teaGrade: 'экстра',
    tags: ['Редкость', 'Цветочный', 'Экстра', 'Гурманам'],
    description: 'Жёлтый чай является слабоферментированным и не относится ни к чёрным, ни к зелёным сортам. По китайской классификации он находится между ними. В свежезаваренном чае присутствуют лёгкие цветочные и цитрусовые нотки. Сорт "Экстра" представляет собой более мелкую фракцию.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3864-scaled.jpg', // 250g
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3865-scaled.jpg', // 50g
      'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3866-scaled.jpg'  // 600g
    ],
    variants: [
      { weight: '50 г', price: 220 },
      { weight: '250 г', price: 1100 },
      { weight: '600 г', price: 2600 },
    ],
    characteristics: [
      { name: 'Аромат', value: 95 },
      { name: 'Мягкость', value: 85 },
      { name: 'Свежесть', value: 80 },
    ],
    brewing: { temp: '85°C', time: '3-4 мин', amount: '1 ч.л.', volume: '200 мл' },
    harvest: 'Май 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-yellow-900/40'
  },
  {
    id: 'yellow-large',
    slug: 'organic-large-leaf-yellow',
    title: 'Чай ORGANIC Краснодарский крупнолистовой жёлтый',
    subtitle: 'Томленый чай • Ручной сбор',
    category: 'yellow',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'желтый',
    teaGrade: 'высший',
    tags: ['Редкость', 'Подарок', 'Цитрусовый'],
    description: 'Уникальный желтый чай, который проходит процедуру "томления" в пергаменте. Это придает ему особый мягкий вкус без горечи и травянистости, свойственной зеленым чаям. Аромат копчения и цветов.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/31-1.webp', // 100g
      'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg', // Tube
      'https://hosta-tea.ru/wp-content/uploads/2022/10/32-1.webp', // 20g
      'https://hosta-tea.ru/wp-content/uploads/2022/10/33-1.webp', // 50g
      'https://hosta-tea.ru/wp-content/uploads/2022/10/34-1.webp'  // 250g
    ],
    variants: [
      { weight: '20 г', price: 160 },
      { weight: '50 г', price: 350 },
      { weight: '50 г', price: 600, packaging: 'Тубус' },
      { weight: '100 г', price: 700 },
      { weight: '100 г', price: 950, packaging: 'Тубус' },
      { weight: '250 г', price: 1660 },
    ],
    characteristics: [
      { name: 'Сложность', value: 90 },
      { name: 'Мягкость', value: 95 },
      { name: 'Послевкусие', value: 85 },
    ],
    brewing: { temp: '85°C', time: '3-5 мин', amount: '4-5 г', volume: '200 мл' },
    harvest: 'Лето 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-yellow-700/40'
  },

  // ==========================================
  // ГАБА - ЧАЙ
  // ==========================================
  {
    id: 'gaba-red',
    slug: 'organic-gaba-red',
    title: 'Чай ГАБА ORGANIC Краснодарский крупнолистовой красный',
    subtitle: 'Бескислородная ферментация',
    category: 'gaba',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'красный (ГАБА)',
    teaGrade: 'высший',
    tags: ['Релакс', 'Фокус', 'ГАМК', 'Новинка'],
    description: 'Уникальный красный чай, прошедший процесс анаэробной ферментации (без доступа кислорода). Благодаря этому в листе образуется гамма-аминомасляная кислота (ГАМК). Чай обладает характерной кислинкой во вкусе, нотами сухофруктов и мощным расслабляющим эффектом при сохранении ясности ума.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2024/10/img_8147-scaled.jpg', // 50g
      'https://hosta-tea.ru/wp-content/uploads/2024/10/img_8148-scaled.jpg', // 100g
      'https://hosta-tea.ru/wp-content/uploads/2024/10/img_8149-scaled.jpg'  // 250g
    ],
    variants: [
      { weight: '50 г', price: 450 },
      { weight: '100 г', price: 900 },
      { weight: '250 г', price: 2250 },
    ],
    characteristics: [
      { name: 'Кислинка', value: 75 },
      { name: 'Аромат', value: 90 },
      { name: 'Релакс', value: 95 },
    ],
    brewing: { temp: '90-95°C', time: '4-5 мин', amount: '5-7 г', volume: '200 мл' },
    harvest: 'Осень 2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-purple-900/40'
  },

  // ==========================================
  // ЧАЙНОЕ АССОРТИ (НОВОЕ, 4 ОТДЕЛЬНЫХ ТОВАРА)
  // ==========================================
  {
    id: 'mix-2-wood',
    slug: 'assorti-2-wood-100',
    title: 'Чай ORGANIC Краснодарский крупнолистовой Ассорти 2 вида 100 г.',
    subtitle: 'Черный + Зеленый • Деревянная шкатулка',
    category: 'mix',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'черный+зеленый',
    teaGrade: 'высший',
    tags: ['Подарок', 'Ассорти', 'Дерево', 'Ручной сбор'],
    description: 'Эксклюзивный подарочный набор в деревянной шкатулке. Включает в себя два классических вкуса: черный и зеленый краснодарский чай. Вес: 50г + 50г.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/42-2.webp',
      'https://hosta-tea.ru/wp-content/uploads/2022/10/42-1.webp'
    ],
    variants: [
      { weight: '100 г', price: 1200, packaging: 'Дерево' }
    ],
    characteristics: [
      { name: 'Разнообразие', value: 50 },
      { name: 'Подарочность', value: 100 },
    ],
    brewing: { temp: '90-95°C', time: '3-5 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-amber-800/40'
  },
  {
    id: 'mix-2-cardboard',
    slug: 'assorti-2-cardboard-200',
    title: 'Чай ORGANIC Краснодарский крупнолистовой Ассорти 2 вида 200 г.',
    subtitle: 'Черный + Зеленый • Картон',
    category: 'mix',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'черный+зеленый',
    teaGrade: 'высший',
    tags: ['Ассорти', 'Картон', 'Ручной сбор'],
    description: 'Набор из двух видов чая (черный и зеленый) в стильной картонной упаковке. Общий вес 200 г.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/44-1.webp'
    ],
    variants: [
      { weight: '200 г', price: 1300, packaging: 'Картон' }
    ],
    characteristics: [
      { name: 'Разнообразие', value: 50 },
      { name: 'Объем', value: 80 },
    ],
    brewing: { temp: '90-95°C', time: '3-5 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-stone-700/40'
  },
  {
    id: 'mix-4-wood',
    slug: 'assorti-4-wood-200',
    title: 'Чай ORGANIC Краснодарский крупнолистовой Ассорти 4 вида 200 г.',
    subtitle: 'Ч+З+Ж+К • Деревянная шкатулка',
    category: 'mix',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'черный+зеленый+желтый+красный',
    teaGrade: 'высший',
    tags: ['VIP', 'Подарок', 'Ассорти', 'Дерево'],
    description: 'Премиальный набор для истинных ценителей. Четыре вида чая: черный, зеленый, желтый и красный. Упакован в изысканную деревянную коробку.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/41-3.webp',
      'https://hosta-tea.ru/wp-content/uploads/2022/10/41-1.webp'
    ],
    variants: [
      { weight: '200 г', price: 3300, packaging: 'Дерево' }
    ],
    characteristics: [
      { name: 'Разнообразие', value: 100 },
      { name: 'Подарочность', value: 100 },
      { name: 'Эксклюзив', value: 100 },
    ],
    brewing: { temp: 'Зависит от сорта', time: '3-5 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-purple-900/40'
  },
  {
    id: 'mix-4-cardboard',
    slug: 'assorti-4-cardboard-200',
    title: 'Чай ORGANIC Краснодарский крупнолистовой Ассорти 4 вида 200 г.',
    subtitle: 'Ч+З+Ж+К • Картон',
    category: 'mix',
    teaType: 'байховый (крупнолистовой)',
    teaKind: 'черный+зеленый+желтый+красный',
    teaGrade: 'высший',
    tags: ['Ассорти', 'Картон', 'Выбор'],
    description: 'Четыре вида краснодарского чая в одной упаковке: черный, зеленый, желтый и красный. Отличный способ познакомиться со всей палитрой вкусов.',
    images: [
      'https://hosta-tea.ru/wp-content/uploads/2022/10/43-1.webp',
      'https://hosta-tea.ru/wp-content/uploads/2022/10/43-2.webp'
    ],
    variants: [
      { weight: '200 г', price: 1560, packaging: 'Картон' }
    ],
    characteristics: [
      { name: 'Разнообразие', value: 100 },
      { name: 'Практичность', value: 90 },
    ],
    brewing: { temp: 'Зависит от сорта', time: '3-5 мин', amount: '5 г', volume: '500 мл' },
    harvest: '2024',
    place: 'с. Калиновое Озеро',
    moodColor: 'from-amber-900/40'
  }
];