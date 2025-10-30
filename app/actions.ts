// app/actions.ts
"use server";

import prisma from "@/lib/prisma";
import { postFormSchema } from "@/schema/posts";
import { redirect } from "next/navigation";
import { z } from "zod";
import { Post } from "../generated/prisma/client";

export async function createPost(data: z.infer<typeof postFormSchema>) {
    await prisma.post.create({
        data: {
            content: data.content,
        },
    });
    redirect("/posts")
}

export async function getPosts(): Promise<Post[]> {
    return await prisma.post.findMany()
}