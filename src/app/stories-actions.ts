"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStories() {
    return await prisma.story.findMany({
        include: {
            user: true
        }
    })
}

export async function createStory(data: {
    title: string,
    description: string
}, userId: string) {
    await prisma.story.create({
        data: {
            title: data.title,
            description: data.description,
            userId: userId
        }
    })
    revalidatePath("/stories")
}

export async function getStory(id: string) {
    return await prisma.story.findUnique({
        where: {
            id: id
        }
    })
}

export async function deleteStory(storyId: string) {
    await prisma.story.delete({
        where: {
            id: storyId
        }
    })
    revalidatePath("/stories")
}