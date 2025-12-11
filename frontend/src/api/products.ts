import { Product } from '@/types/product';
import * as z from 'zod';
import { ProductSchema } from '@/schemas/product';
import { API_BASE_URL } from '@/config/api';

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Не удалось получить товары');
        }
        const data = await response.json();
        // Parse array of products
        const ProductsArraySchema = z.array(ProductSchema);
        return ProductsArraySchema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Ошибка валидации данных`);
        }
        throw new Error('Не удалось получить товары');
    }
}
