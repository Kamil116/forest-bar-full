import * as z from 'zod';

const Advantage = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
})

export type Advantage = z.infer<typeof Advantage>