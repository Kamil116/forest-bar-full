export interface RecipeFeature {
    label: string;
    imageSrc: string;
}

export interface Recipe {
    mainTitle: string;
    subTitle: string;
    description: string;
    features?: RecipeFeature[]; // Опциональные features (не для мёда)
}

export const recipes: Recipe[] = [
    {
        mainTitle: 'Производство нашей продукции',
        subTitle: 'Варенье',
        description:
            'МЫ ИСПОЛЬЗУЕМ ТОЛЬКО ОТБОРНЫЕ СВЕЖИЕ ЯГОДЫ, СОБРАННЫЕ В ЭКОЛОГИЧЕСКИ ЧИСТЫХ РАЙОНАХ. КАЖДАЯ ЯГОДА ПРОХОДИТ ТЩАТЕЛЬНУЮ ПРОВЕРКУ КАЧЕСТВА. МЫ НЕ ИСПОЛЬЗУЕМ ИСКУССТВЕННЫЕ КОНСЕРВАНТЫ ИЛИ ДОБАВКИ, ВСЕ ПРОДУКТЫ СОЗДАНЫ ИЗ НАТУРАЛЬНЫХ ИНГРЕДИЕНТОВ.',
        features: [
            { label: 'Натуральность', imageSrc: `/images/Group 81.png` },
            { label: 'Качество', imageSrc: `/images/Group 91.png` },
            { label: 'Насыщенность', imageSrc: `/images/Group 82.png` },
        ],
    },
    {
        mainTitle: 'Натуральные ингредиенты',
        subTitle: 'Ягоды',
        description:
            'МЫ ИСПОЛЬЗУЕМ ТОЛЬКО ОТБОРНЫЕ СВЕЖИЕ ЯГОДЫ, СОБРАННЫЕ В ЭКОЛОГИЧЕСКИ ЧИСТЫХ РАЙОНАХ. КАЖДАЯ ЯГОДА ПРОХОДИТ ТЩАТЕЛЬНУЮ ПРОВЕРКУ КАЧЕСТВА. МЫ НЕ ИСПОЛЬЗУЕМ ИСКУССТВЕННЫЕ КОНСЕРВАНТЫ ИЛИ ДОБАВКИ, ВСЕ ПРОДУКТЫ СОЗДАНЫ ИЗ НАТУРАЛЬНЫХ ИНГРЕДИЕНТОВ.',
        features: [
            { label: 'Свежесть', imageSrc: `/images/Group 81.png` },
            { label: 'Экологичность', imageSrc: `/images/Group 82.png` },
            { label: 'Витамины', imageSrc: `/images/Group 91.png` },
        ],
    },
    {
        mainTitle: 'Традиционные рецепты',
        subTitle: 'Классика',
        description:
            'НАШИ РЕЦЕПТЫ ПЕРЕДАЮТСЯ ИЗ ПОКОЛЕНИЯ В ПОКОЛЕНИЕ. МЫ СОХРАНЯЕМ ТРАДИЦИИ ДОМАШНЕГО ВАРЕНЬЯ, КОТОРЫЕ ПРОВЕРЕНЫ ВРЕМЕНЕМ. КАЖДАЯ БАНКА - ЭТО КУСОЧЕК ИСТОРИИ И ЗАБОТЫ, КОТОРЫЙ МЫ ДЕЛИМСЯ С ВАМИ.',
        features: [
            { label: 'Традиции', imageSrc: `/images/Group 91.png` },
            { label: 'Натуральность', imageSrc: `/images/Group 81.png` },
            { label: 'Вкус', imageSrc: `/images/Group 82.png` },
        ],
    },
    {
        mainTitle: 'Бортовой мёд',
        subTitle: 'Бортовой мёд',
        description:
            'НАШ БОРТОВОЙ МЁД СОБИРАЕТСЯ ИЗ ДРЕВНИХ БОРТЕЙ В ЛЕСАХ. ЭТО НАТУРАЛЬНЫЙ ПРОДУКТ БЕЗ ОБРАБОТКИ, СОХРАНЯЮЩИЙ ВСЕ ПОЛЕЗНЫЕ СВОЙСТВА. КАЖДАЯ КАПЛЯ МЁДА - ЭТО РЕЗУЛЬТАТ ТРУДА ПЧЁЛ И ЗАБОТЫ ПРИРОДЫ.',
        // Нет features - для мёда показывается только фон
    },
];

