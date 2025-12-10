import * as z from 'zod';

export const VendorSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    middle_name: z.string().nullable().optional(),
    city: z.string(),
    region: z.string(),
    email: z.string().nullable().optional(),
    phone: z.string(),
    referral_link: z.string().nullable().optional(),
    address: z.string(),
    work_hours: z.string(),
    photo_url: z.string().nullable().optional(),
    coords: z.tuple([z.number(), z.number()]).nullable().optional(),
});

export type Vendor = z.infer<typeof VendorSchema>;
