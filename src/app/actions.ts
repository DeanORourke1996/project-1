'use server'

import { db } from '@/db';
import { items } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const itemSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),

});

export async function addItem(formData: FormData) {
    const validatedFields = itemSchema.parse({
        name: formData.get('name'),
        category: formData.get('category'),
    });

    await db.insert(items).values({
        name: validatedFields.name,
        category: validatedFields.category,
    });

    revalidatePath('/');
}

export async function deleteItem(id: number) {
    await db.delete(items).where(eq(items.id, id));
    revalidatePath('/');
}