import { VacancySchema, type Vacancy } from '@/schemas/vacancy';
import z from 'zod';
import { API_BASE_URL } from '@/config/api';

export async function fetchVacancy(): Promise<Vacancy[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/vacancies`);
        if (!response.ok) {
            throw new Error('Не удалось получить вакансии');
        }
        const data = await response.json();
        z.array(VacancySchema).parse(data);
        return data;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(`Ошибка валидации данных`);
        }
        throw new Error('Не удалось получить вакансии');
    }
}
