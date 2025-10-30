import { z } from "zod"

export const postFormSchema = z.object({
    content: z.string().min(1, "Required")
})