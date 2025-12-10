import * as z from 'zod';

export const VacancySchema = z.object({
    id: z.number(),
    title: z.string(),
    city: z.string(),
    schedule: z.string(), // График работы
    salary: z.string(), // Зарплата
    additional_conditions: z.array(z.string()).nullable().optional(), // Список дополнительных условий
    long_description: z.string(),
});

export type Vacancy = z.infer<typeof VacancySchema>;