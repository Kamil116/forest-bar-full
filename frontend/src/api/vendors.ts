import z from 'zod';
import { Vendor } from '../types/vendor';
import { VendorSchema } from '@/schemas/vendor';
import { API_BASE_URL } from '@/config/api';

export async function fetchVendors(): Promise<Vendor[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/vendors`);

        if (!response.ok) {
            throw new Error('Не удалось получить продавцов');
        }
        const data = await response.json();
        z.array(VendorSchema).parse(data);
        return data;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Ошибка валидации данных`);
        }
        throw new Error('Не удалось получить продавцов');
    }
}
