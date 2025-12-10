import * as z from 'zod';

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    images: z.array(z.string()).nullable().optional(), // Список URL изображений
    price: z.number(),
    product_type: z.string(), // Тип (мёд, чай, ягода, ягодный сбор и тд)
    long_description: z.string(),
    seller_id: z.number(),
    video_url: z.string().nullable().optional(), // URL видео
    // Пищевая ценность
    vitamins: z.array(z.string()).nullable().optional(), // Список витаминов
    minerals: z.array(z.string()).nullable().optional(), // Список минералов
    antioxidants: z.array(z.string()).nullable().optional(), // Список антиоксидантов
    energy_value: z.string().nullable().optional(),
    shelf_life: z.string().nullable().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
