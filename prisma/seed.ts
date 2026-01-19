import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || "file:./dev.db"
});

async function main() {
    console.log('Start seeding ...');

    // ==========================================
    // BLOG POSTS
    // ==========================================
    const posts = [
        {
            slug: 'health-antioxidants',
            category: 'Здоровье',
            date: '15 Янв 2026',
            title: 'Сила антиоксидантов в чашке: почему северный чай полезнее',
            excerpt: 'Исследуем, как полифенолы и катехины самого северного чая в мире помогают укреплять иммунитет.',
            keywords: JSON.stringify(['антиоксиданты в чае', 'польза чая', 'катехины', 'органический чай Сочи']),
            image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?q=80&w=2689&auto=format&fit=crop',
            content: `
      Чай — это не просто напиток, это природная аптека. Но знаете ли вы, что чем севернее растет чайный куст, тем выше в нем концентрация полезных веществ? Чай в Сочи растет на 43-й параллели, в зоне, которая считается экстремальной для этой культуры.

      ### Почему мороз полезен для чая?
      Зимние морозы в горах Сочи заставляют чайный куст "закаляться". В ответ на стресс растение вырабатывает больше защитных соединений — тех самых антиоксидантов, за которыми мы охотимся.

      ### Полифенолы и иммунитет
      Наш органический чай богат полифенолами, которые:
      - Нейтрализуют свободные радикалы.
      - Помогают клеткам восстанавливаться.
      - Укрепляют стенки сосудов.

      Регулярное употребление чистого краснодарского чая без пестицидов и удобрений — это ваш вклад в долголетие.
    `
        },
        {
            slug: 'sochi-terroir',
            category: 'Плантации',
            date: '10 Янв 2026',
            title: 'Уникальный терруар Сочи: 43-я параллель и её секреты',
            excerpt: 'Почему наш чай невозможно повторить в других регионах. Сочетание морского воздуха и горного климата.',
            keywords: JSON.stringify(['терруар Сочи', 'чайные плантации', 'самый северный чай', 'выращивание чая в России']),
            image: 'https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04709-1.jpg',
            content: `
      Терруар — это совокупность климата, почвы и рельефа. В Сочи сложились условия, которые эксперты называют "золотым стандартом" для северного чаеводства.

      ### Морской бриз и горный туман
      Плантации "Хоста-чай" расположены вблизи Кавказского заповедника. Утром кусты укутывает влажный горный туман, а днем их согревает южное солнце. Это создает идеальный баланс между ростом листа и накоплением в нем эфирных масел.

      ### Чистота почв
      Мы сознательно отказались от использования гербицидов. Зимний снег естественным образом уничтожает вредителей, что позволяет нам сохранять почву девственно чистой. Это основа нашего знака "Органик".
    `
        },
        {
            slug: 'expo-news',
            category: 'События',
            date: '05 Янв 2026',
            title: 'Триумф в Москве: золото Hosta Tea на выставке Продэкспо',
            excerpt: 'Как наш органический чай завоевал признание международных экспертов и стал эталоном качества.',
            keywords: JSON.stringify(['выставка Продэкспо', 'награды чая', 'качество Хоста чай', 'лучший российский чай']),
            image: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=2670&auto=format&fit=crop',
            content: `
      Признание профессионалов — это важный маркер качества. В этом году на крупнейшей международной выставке "Продэкспо" наш классический черный крупнолистовой чай был удостоен золотой медали.

      ### Критерии оценки
      Экспертное жюри оценивало чай по десяткам параметров: от аромата сухого листа до цвета настоя и богатства послевкусия. Наш чай выделился своей "чистотой профиля" — отсутствием посторонних привкусов, что характерно только для честной органики.

      Мы гордимся тем, что представляем Россию в сегменте премиальных чаев.
    `
        },
        {
            slug: 'organic-certification',
            category: 'Стандарты',
            date: '28 Дек 2025',
            title: 'Что скрывает «Зеленый листок»? Вся правда об органической сертификации',
            excerpt: 'Разбираемся в маркировках. Чем органический чай отличается от обычного "натурального".',
            keywords: JSON.stringify(['органический сертификат', 'маркировка органик', 'контроль качества чая', 'зеленый листок']),
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2564&auto=format&fit=crop',
            content: `
      Слово "натуральный" на упаковке часто ничего не значит. Настоящий контроль начинается там, где появляется государственный знак "Органик" (тот самый зеленый листок).

      ### Путь контроля
      Чтобы получить этот знак, фермер должен доказать, что:
      - В почве нет тяжелых металлов и остатков пестицидов.
      - При переработке не используются искусственные ароматизаторы.
      - Каждая партия чая проходит лабораторный анализ.

      Мы в "Хоста-чай" проходим эту проверку ежегодно, гарантируя вам безопасность каждой чашки.
    `
        },
        {
            slug: 'brewing-guide',
            category: 'Гид',
            date: '20 Дек 2025',
            title: 'Искусство заваривания: как не испортить хороший лист',
            excerpt: '5 критических ошибок при заваривании чая, которые убивают вкус и пользу.',
            keywords: JSON.stringify(['как заваривать чай', 'температура воды для чая', 'тайминг заваривания', 'советы титестера']),
            image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?q=80&w=2689&auto=format&fit=crop',
            content: `
      Вы купили премиальный чай, но вкус кажется плоским? Ошибка может быть в способе приготовления.

      ### Ошибка №1: Крутой кипяток
      Температура 100°C подходит только для некоторых черных чаев. Зеленый, желтый и габа-чай требуют 80-85°C. Кипяток буквально "сжигает" нежный лист.

      ### Ошибка №2: Качество воды
      Используйте только мягкую фильтрованную воду. Жесткая вода с минералами "блокирует" выход полезных веществ из листа.

      ### Ошибка №3: Время
      Не оставляйте заварку в чайнике надолго. Горчинка, которая появляется через 10 минут — это избыточные дубильные вещества. Оптимальное время — 3-5 минут.
    `
        },
        {
            slug: 'harvest-traditions',
            category: 'Традиции',
            date: '15 Дек 2025',
            title: 'Ручной сбор vs Машинный: почему мы выбираем труд человека',
            excerpt: 'История плантации с 1947 года и секреты сохранения целостности чайного листа.',
            keywords: JSON.stringify(['ручной сбор чая', 'история Хоста чай', 'производство чая', 'чайные традиции']),
            image: 'https://hosta-tea.ru/wp-content/uploads/2023/02/dsc04832.jpg',
            content: `
      С 1947 года на наших плантациях в Сочи живет традиция бережного отношения к урожаю. В то время как крупные фабрики переходят на комбайны, мы сохраняем ручной сбор для наших лучших сортов.

      ### Целостность листа
      Машина не видит разницы между старым листом и нежной почкой. Она сечет все подряд. Ручной сбор позволяет выбирать только "флеши" — два верхних листика и почку. 

      ### Энергия рук
      Мы верим, что чай чувствует отношение. Труд наших чаеводов — это гарантия того, что в вашу пачку попадет только отборный, целый лист, сохранивший всю природную силу.
    `
        }
    ];

    for (const post of posts) {
        await prisma.post.upsert({
            where: { slug: post.slug },
            update: {},
            create: post,
        });
    }

    // ==========================================
    // PRODUCTS
    // ==========================================
    const products = [
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
            images: JSON.stringify([
                '/images/catalog/black_small_leaf.png',
                'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3855-scaled.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 220, packaging: 'Пакет' },
                { weight: '250 г', price: 1100, packaging: 'Пакет' },
                { weight: '600 г', price: 2600, packaging: 'Пакет' },
            ],
            characteristics: JSON.stringify([
                { name: 'Крепость', value: 85 },
                { name: 'Аромат', value: 90 },
                { name: 'Цвет', value: 95 },
            ]),
            brewing: JSON.stringify({ temp: '95°C', time: '3-5 мин', amount: '1-2 ч.л.', volume: '200 мл' }),
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
            images: JSON.stringify([
                '/images/catalog/black_large_leaf.png',
                'https://hosta-tea.ru/wp-content/uploads/2022/10/5-1-1.webp',
                'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 290, packaging: 'Крафт' },
                { weight: '50 г', price: 550, packaging: 'Тубус' },
                { weight: '100 г', price: 580, packaging: 'Крафт' },
                { weight: '250 г', price: 1440, packaging: 'Крафт' },
            ],
            characteristics: JSON.stringify([
                { name: 'Терпкость', value: 70 },
                { name: 'Аромат', value: 80 },
                { name: 'Насыщенность', value: 75 },
            ]),
            brewing: JSON.stringify({ temp: '95°C', time: '4-5 мин', amount: '5 г', volume: '500 мл' }),
            harvest: '2024',
            place: 'с. Калиновое Озеро',
            moodColor: 'from-amber-950/40'
        },
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
            images: JSON.stringify([
                '/images/catalog/black_small_leaf.png', // Placeholder (Need Small Green, using Black Small)
                'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3859-scaled.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 220, packaging: 'Пакет' },
                { weight: '250 г', price: 1100, packaging: 'Пакет' },
            ],
            characteristics: JSON.stringify([
                { name: 'Свежесть', value: 95 },
                { name: 'Аромат', value: 85 },
                { name: 'Терпкость', value: 60 },
            ]),
            brewing: JSON.stringify({ temp: '80°C', time: '2-3 мин', amount: '1 ч.л.', volume: '200 мл' }),
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
            images: JSON.stringify([
                '/images/catalog/green_large_leaf.png',
                'https://hosta-tea.ru/wp-content/uploads/2022/10/10-1.webp',
                'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016-300x300.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 315, packaging: 'Крафт' },
                { weight: '50 г', price: 580, packaging: 'Тубус' },
                { weight: '100 г', price: 625, packaging: 'Крафт' },
                { weight: '250 г', price: 1490, packaging: 'Крафт' },
            ],
            characteristics: JSON.stringify([
                { name: 'Мягкость', value: 90 },
                { name: 'Аромат', value: 80 },
                { name: 'Цвет', value: 70 },
            ]),
            brewing: JSON.stringify({ temp: '80°C', time: '3-4 мин', amount: '5 г', volume: '500 мл' }),
            harvest: '2024',
            place: 'с. Калиновое Озеро',
            moodColor: 'from-green-950/40'
        },
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
            images: JSON.stringify([
                '/images/catalog/black_small_leaf.png', // Placeholder
                'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3862-scaled.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 220, packaging: 'Пакет' },
                { weight: '250 г', price: 1100, packaging: 'Пакет' },
            ],
            characteristics: JSON.stringify([
                { name: 'Сладость', value: 80 },
                { name: 'Аромат', value: 90 },
                { name: 'Цвет', value: 85 },
            ]),
            brewing: JSON.stringify({ temp: '90°C', time: '3-5 мин', amount: '1-2 ч.л.', volume: '200 мл' }),
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
            images: JSON.stringify([
                '/images/catalog/black_large_leaf.png', // Placeholder
                'https://hosta-tea.ru/wp-content/uploads/2022/10/24-1.webp',
                'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 350, packaging: 'Крафт' },
                { weight: '50 г', price: 600, packaging: 'Тубус' },
                { weight: '100 г', price: 700, packaging: 'Крафт' },
                { weight: '250 г', price: 1660, packaging: 'Крафт' },
            ],
            characteristics: JSON.stringify([
                { name: 'Аромат', value: 95 },
                { name: 'Мягкость', value: 85 },
                { name: 'Послевкусие', value: 80 },
            ]),
            brewing: JSON.stringify({ temp: '90°C', time: '4-5 мин', amount: '5 г', volume: '500 мл' }),
            harvest: '2024',
            place: 'с. Калиновое Озеро',
            moodColor: 'from-rose-950/40'
        },
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
            images: JSON.stringify([
                '/images/catalog/black_small_leaf.png', // Placeholder
                'https://hosta-tea.ru/wp-content/uploads/2022/11/img_3865-scaled.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 220, packaging: 'Пакет' },
                { weight: '250 г', price: 1100, packaging: 'Пакет' },
            ],
            characteristics: JSON.stringify([
                { name: 'Аромат', value: 95 },
                { name: 'Мягкость', value: 85 },
                { name: 'Свежесть', value: 80 },
            ]),
            brewing: JSON.stringify({ temp: '85°C', time: '3-4 мин', amount: '1 ч.л.', volume: '200 мл' }),
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
            images: JSON.stringify([
                '/images/catalog/black_large_leaf.png', // Placeholder
                'https://hosta-tea.ru/wp-content/uploads/2022/10/33-1.webp',
                'https://hosta-tea.ru/wp-content/uploads/2025/09/img-20250714-wa0016.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 350, packaging: 'Крафт' },
                { weight: '50 г', price: 600, packaging: 'Тубус' },
                { weight: '100 г', price: 700, packaging: 'Крафт' },
            ],
            characteristics: JSON.stringify([
                { name: 'Сложность', value: 90 },
                { name: 'Мягкость', value: 95 },
                { name: 'Послевкусие', value: 85 },
            ]),
            brewing: JSON.stringify({ temp: '85°C', time: '3-5 мин', amount: '5 г', volume: '200 мл' }),
            harvest: '2024',
            place: 'с. Калиновое Озеро',
            moodColor: 'from-yellow-700/40'
        },
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
            images: JSON.stringify([
                '/images/catalog/black_large_leaf.png', // Placeholder
                'https://hosta-tea.ru/wp-content/uploads/2024/10/img_8147-scaled.jpg',
            ]),
            variants: [
                { weight: '50 г', price: 450, packaging: 'Крафт' },
                { weight: '100 г', price: 900, packaging: 'Крафт' },
                { weight: '250 г', price: 2250, packaging: 'Крафт' },
            ],
            characteristics: JSON.stringify([
                { name: 'Кислинка', value: 75 },
                { name: 'Аромат', value: 90 },
                { name: 'Релакс', value: 95 },
            ]),
            brewing: JSON.stringify({ temp: '90°C', time: '4-5 мин', amount: '5 г', volume: '200 мл' }),
            harvest: '2024',
            place: 'с. Калиновое Озеро',
            moodColor: 'from-purple-900/40'
        },
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
            images: JSON.stringify([
                'https://hosta-tea.ru/wp-content/uploads/2022/10/41-3.webp',
                'https://hosta-tea.ru/wp-content/uploads/2022/10/41-1.webp'
            ]),
            variants: [
                { weight: '200 г', price: 3300, packaging: 'Дерево' }
            ],
            characteristics: JSON.stringify([
                { name: 'Подарочность', value: 100 },
                { name: 'Разнообразие', value: 100 },
            ]),
            brewing: JSON.stringify({ temp: 'Разная', time: '3-5 мин', amount: '5 г', volume: '500 мл' }),
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
            images: JSON.stringify([
                'https://hosta-tea.ru/wp-content/uploads/2022/10/44-1.webp'
            ]),
            variants: [
                { weight: '200 г', price: 1300, packaging: 'Картон' }
            ],
            characteristics: JSON.stringify([
                { name: 'Практичность', value: 90 },
                { name: 'Баланс', value: 80 },
            ]),
            brewing: JSON.stringify({ temp: '95°C', time: '3-5 мин', amount: '5 г', volume: '500 мл' }),
            harvest: '2024',
            place: 'с. Калиновое Озеро',
            moodColor: 'from-stone-700/40'
        }
    ];

    for (const product of products) {
        const { variants, ...productData } = product;

        // Create or update Product
        await prisma.product.upsert({
            where: { id: product.id },
            update: {},
            create: productData,
        });

        // Create variants for the product (deleting old ones locally is tricky with upsert, 
        // but for seeding we assume fresh start or append. For safety we can delete old variants first)
        await prisma.productVariant.deleteMany({ where: { productId: product.id } });

        for (const variant of variants) {
            await prisma.productVariant.create({
                data: {
                    productId: product.id,
                    weight: variant.weight,
                    price: variant.price,
                    packaging: variant.packaging,
                },
            });
        }
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
