import * as z from 'zod';

export const todoSchema = z.object({
    title: z.string().min(1,{message:'you need to fill at least one letter'}),
})

export type TodoSchema = z.infer<typeof todoSchema>