import { z } from "zod"

export const postFormSchema = z.object({
    content: z.string().min(1, "Required")
})

export const commentFormSchema = z.object({
    content: z.string().min(1, "Required")
})